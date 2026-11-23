const { createHash, randomBytes } = require("node:crypto");
const { mkdirSync, readFileSync } = require("node:fs");
const { isIPv4 } = require("node:net");
const { dirname, join, resolve } = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const express = require("express");
const { rateLimit } = require("express-rate-limit");
const menu = require("./js/menu-data.js");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const lanPreviewHost = process.env.ORDER_LAN_PREVIEW_HOST?.trim();
if (lanPreviewHost && (!isIPv4(lanPreviewHost) || !/^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(lanPreviewHost))) {
  throw new Error("ORDER_LAN_PREVIEW_HOST must be a private IPv4 address on this machine.");
}
const publicUrl = new URL(process.env.PUBLIC_SITE_URL || `http://${lanPreviewHost || "localhost"}:${port}/`);
const previewHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
const isLocalOrderServer = publicUrl.protocol === "http:" && previewHosts.has(publicUrl.hostname);
if (lanPreviewHost) {
  previewHosts.add(lanPreviewHost);
  if (publicUrl.protocol === "http:") previewHosts.add(publicUrl.hostname);
}
const localPreviewOrigins = new Set();
if (isLocalOrderServer || lanPreviewHost) {
  for (const host of previewHosts) {
    for (const previewPort of [port, 5500, 5501]) {
      localPreviewOrigins.add(new URL(`http://${host}:${previewPort}/`).origin);
    }
  }
}
const orderWhatsAppNumber = process.env.ORDER_WHATSAPP_NUMBER?.trim() || "4916092978457";
if (!/^[1-9]\d{6,14}$/.test(orderWhatsAppNumber)) {
  throw new Error("ORDER_WHATSAPP_NUMBER must be an international phone number with digits only.");
}
const receiptTokenPattern = /^(?:[A-Za-z0-9_-]{22}|[A-Za-z0-9_-]{43})$/;

const dbPath = resolve(process.env.ORDER_DB_PATH || join(root, ".data", "orders.sqlite"));
mkdirSync(dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
  CREATE TABLE IF NOT EXISTS orders (
    request_id TEXT PRIMARY KEY,
    request_hash TEXT NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    token TEXT NOT NULL UNIQUE,
    receipt TEXT NOT NULL
  );
`);
const findRequest = db.prepare("SELECT * FROM orders WHERE request_id = ?");
const findReceipt = db.prepare("SELECT receipt FROM orders WHERE token = ?");
const insertOrder = db.prepare(`
  INSERT INTO orders (request_id, request_hash, reference, token, receipt)
  VALUES (?, ?, ?, ?, ?) ON CONFLICT(request_id) DO NOTHING
`);

const catalog = new Map();
function addCatalogItem(num, name, variant, price) {
  const amount = price?.match(/(\d+)[,.](\d{2})/);
  if (!amount) return;
  const unitCents = Number(amount[1]) * 100 + Number(amount[2]);
  const id = variant ? `${num}::${name}::${variant}` : `${num}::${name}`;
  catalog.set(id, { num, name, variant, unitCents });
}

for (const { groups } of menu.categories) {
  for (const { items } of groups) {
    for (const item of items) {
      if (item.variants?.length) {
        for (const variant of item.variants) addCatalogItem(item.num, item.name, variant.label, variant.price);
      } else {
        addCatalogItem(item.num, item.name, "", item.price);
      }
    }
  }
}
const indexHtml = readFileSync(join(root, "index.html"), "utf8");
for (const [, value] of indexHtml.matchAll(/\bdata-quick-add="([^"]+)"/g)) {
  const [num, name, price] = value.split("|");
  addCatalogItem(num, name, "", price);
}

const orderTypes = new Set(["Abholung im Restaurant (Markt 29)", "Vorbestellung für den Tisch"]);
class OrderError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function readText(value, max, required = false) {
  const text = typeof value === "string" ? value.trim() : "";
  if ((required && !text) || text.length > max) {
    throw new OrderError(400, "Bitte prüfen Sie Ihre Bestelldaten.");
  }
  return text;
}

function readOrder(body) {
  if (!body || typeof body.requestId !== "string" || !/^[a-f0-9]{32}$/.test(body.requestId)
      || !Array.isArray(body.items) || !body.items.length || body.items.length > catalog.size
      || !Number.isSafeInteger(body.expectedTotalCents) || !orderTypes.has(body.type)) {
    throw new OrderError(400, "Bitte prüfen Sie Ihren Warenkorb und die Bestelldaten.");
  }
  const ids = new Set();
  const items = body.items.map((item) => {
    if (typeof item?.id !== "string" || !item.id.length || item.id.length > 400 || ids.has(item.id)
        || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 999) {
      throw new OrderError(400, "Bitte prüfen Sie die Artikel und Mengen in Ihrem Warenkorb.");
    }
    ids.add(item.id);
    return { id: item.id, qty: item.qty };
  });
  return {
    items, expectedTotalCents: body.expectedTotalCents, type: body.type,
    name: readText(body.name, 120, true), phone: readText(body.phone, 50, true),
    time: readText(body.time, 120), note: readText(body.note, 2000)
  };
}

function createReceipt(order) {
  const items = order.items.map(({ id, qty }) => {
    const item = catalog.get(id);
    if (!item) throw new OrderError(409, "Ein Artikel ist nicht mehr verfügbar. Bitte wählen Sie ihn erneut aus der Speisekarte.");
    return { ...item, qty };
  });
  const totalCents = items.reduce((total, item) => total + item.qty * item.unitCents, 0);
  if (totalCents !== order.expectedTotalCents) {
    throw new OrderError(409, "Die Preise haben sich geändert. Bitte legen Sie die Artikel erneut in den Warenkorb.");
  }
  return {
    reference: randomBytes(6).toString("hex").toUpperCase(),
    items, totalCents, type: order.type, name: order.name, phone: order.phone,
    time: order.time, note: order.note
  };
}

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS || 0));
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

function allowOrderOrigin(req, res, next) {
  const origin = req.get("Origin");
  res.vary("Origin");
  if (!origin || origin === publicUrl.origin) {
    return next();
  }
  if (localPreviewOrigins.has(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    return next();
  }
  next(new OrderError(403, "Diese Bestellung konnte nicht übermittelt werden."));
}

app.options("/api/orders", allowOrderOrigin, (req, res) => {
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

app.post("/api/orders", allowOrderOrigin, rateLimit({
  windowMs: 60_000, limit: 20, standardHeaders: "draft-8", legacyHeaders: false,
  message: { error: "Bitte warten Sie kurz und versuchen Sie es erneut." }
}), express.json({ limit: "64kb" }), (req, res) => {
  const order = readOrder(req.body);
  const requestId = req.body.requestId;
  const hash = createHash("sha256").update(JSON.stringify(order)).digest("hex");
  let row = findRequest.get(requestId);
  if (!row) {
    const receipt = createReceipt(order);
    insertOrder.run(requestId, hash, receipt.reference, randomBytes(16).toString("base64url"), JSON.stringify(receipt));
    row = findRequest.get(requestId);
  }
  if (row.request_hash !== hash) throw new OrderError(409, "Diese Bestellanfrage wurde bereits verwendet. Bitte prüfen Sie Ihre Bestelldaten.");
  const receiptUrl = new URL(`b/${row.token}`, publicUrl).href;
  res.status(201).json({ reference: row.reference, receiptUrl, whatsappNumber: orderWhatsAppNumber });
});

app.get("/api/order-receipt", (req, res) => {
  const token = req.get("Authorization")?.match(/^Bearer ([A-Za-z0-9_-]+)$/)?.[1];
  const row = token && receiptTokenPattern.test(token) && findReceipt.get(token);
  if (!row) throw new OrderError(404, "Dieser Bestellbon wurde nicht gefunden.");
  res.type("application/json").send(row.receipt);
});

app.get(["/", "/index.html"], (req, res) => res.sendFile(join(root, "index.html")));
const receiptHeaders = { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex" };
app.get("/b/:token", (req, res) => {
  res.set(receiptHeaders);
  if (!receiptTokenPattern.test(req.params.token)) return res.status(404).send("Dieser Bestellbon wurde nicht gefunden.");
  const receiptPath = new URL("bon-drucken.html", publicUrl).pathname;
  res.redirect(`${receiptPath.replace(/^\/+/, "/")}#${req.params.token}`);
});
app.get("/bon-drucken.html", (req, res) => {
  res.set(receiptHeaders);
  res.sendFile(join(root, "bon-drucken.html"));
});
for (const directory of ["css", "js", "images", "menu", "videos"]) {
  app.use(`/${directory}`, express.static(join(root, directory)));
}

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof OrderError) return res.status(error.status).json({ error: error.message });
  if (error.status === 400 || error.status === 413) {
    return res.status(error.status).json({ error: "Die Bestelldaten konnten nicht verarbeitet werden." });
  }
  console.error("Order service error", error.code || error.name);
  res.status(500).json({ error: "Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es erneut." });
});

const listenHosts = lanPreviewHost ? ["127.0.0.1", lanPreviewHost] : [process.env.HOST || "0.0.0.0"];
for (const host of listenHosts) {
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log(`Order server listening on ${host}:${port}`);
  });
}
