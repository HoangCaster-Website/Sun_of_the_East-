(function () {
  "use strict";

  const compactPrefix = "#b=";
  const legacyPrefix = "#bon1=";
  const maxBytes = 64 * 1024;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const catalogue = window.SUN_ORDER_LINK_CATALOG || [];
  const catalogueCodes = new Map(catalogue.map(([num, name, variant], index) => [
    JSON.stringify([num, name, variant]), index + 1
  ]));
  const pickup = "Abholung im Restaurant (Markt 29)";
  const table = "Vorbestellung für den Tisch";
  const tableOrder = 1;
  const customOrder = 2;
  const packedPhone = 4;
  const clockTime = 8;
  const customTime = 16;
  const hasNote = 32;

  function encodeToken(bytes) {
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 8192) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeToken(token) {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
  }

  function isText(value, max, required = false) {
    return typeof value === "string" && value.length <= max && (!required || value.trim().length > 0);
  }

  function readSnapshot(data) {
    if (!Array.isArray(data) || data.length !== 7) return null;
    const [reference, type, name, phone, time, note, rows] = data;
    if (typeof reference !== "string" || !/^[A-F0-9]{12}$/.test(reference)
        || !isText(type, 120, true) || !isText(name, 120, true) || !isText(phone, 50, true)
        || !isText(time, 120) || !isText(note, 2000)
        || !Array.isArray(rows) || !rows.length) return null;

    const items = [];
    let totalCents = 0;
    for (const row of rows) {
      if (!Array.isArray(row) || row.length !== 5) return null;
      const [num, name, variant, qty, unitCents] = row;
      if (!isText(num, 40, true) || !isText(name, 200, true) || !isText(variant, 200)
          || !Number.isInteger(qty) || qty < 1 || qty > 999
          || !Number.isSafeInteger(unitCents) || unitCents < 0) return null;
      totalCents += qty * unitCents;
      if (!Number.isSafeInteger(totalCents)) return null;
      items.push({ num, name, variant, qty, unitCents });
    }

    return { reference, type, name, phone, time, note, items, totalCents };
  }

  function writeNumber(bytes, number) {
    while (number >= 128) {
      bytes.push(number % 128 + 128);
      number = Math.floor(number / 128);
    }
    bytes.push(number);
  }

  function writeText(bytes, text) {
    const encoded = encoder.encode(text);
    writeNumber(bytes, encoded.length);
    bytes.push(...encoded);
  }

  class ReceiptReader {
    constructor(bytes) {
      this.bytes = bytes;
      this.offset = 0;
    }

    byte() {
      if (this.offset >= this.bytes.length) throw new Error("Truncated receipt");
      return this.bytes[this.offset++];
    }

    number() {
      let result = 0;
      let multiplier = 1;
      for (let index = 0; index < 8; index++) {
        const byte = this.byte();
        result += (byte & 127) * multiplier;
        if (byte < 128 && Number.isSafeInteger(result)) return result;
        multiplier *= 128;
      }
      throw new Error("Invalid receipt number");
    }

    text() {
      const length = this.number();
      const end = this.offset + length;
      if (end > this.bytes.length) throw new Error("Truncated receipt text");
      const text = decoder.decode(this.bytes.subarray(this.offset, end));
      this.offset = end;
      return text;
    }
  }

  function checksum(bytes) {
    let hash = 0x811c9dc5;
    for (const byte of bytes) hash = Math.imul(hash ^ byte, 0x01000193);
    return hash >>> 0;
  }

  function writePhone(bytes, phone) {
    const digits = phone.replace(/^\+/, "");
    writeNumber(bytes, digits.length * 2 + Number(phone.startsWith("+")));
    for (let index = 0; index < digits.length; index += 2) {
      bytes.push(Number(digits.slice(index, index + 2).padEnd(2, "0")));
    }
  }

  function readPhone(reader) {
    const code = reader.number();
    const length = Math.floor(code / 2);
    if (length < 6 || length > 25) throw new Error("Invalid receipt phone");
    let digits = "";
    for (let index = 0; index < length; index += 2) {
      const value = reader.byte();
      if (value > 99) throw new Error("Invalid receipt phone");
      digits += String(value).padStart(2, "0");
    }
    return (code % 2 ? "+" : "") + digits.slice(0, length);
  }

  function pack(order) {
    const clock = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(order.time);
    const phoneIsNumeric = /^\+?\d{6,25}$/.test(order.phone);
    const flags = (order.type === table ? tableOrder : order.type === pickup ? 0 : customOrder)
      | (phoneIsNumeric ? packedPhone : 0)
      | (clock ? clockTime : order.time ? customTime : 0)
      | (order.note ? hasNote : 0);
    const bytes = [flags];

    for (let offset = 0; offset < order.reference.length; offset += 2) {
      bytes.push(parseInt(order.reference.slice(offset, offset + 2), 16));
    }
    if (flags & customOrder) writeText(bytes, order.type);
    writeText(bytes, order.name);
    if (phoneIsNumeric) writePhone(bytes, order.phone);
    else writeText(bytes, order.phone);
    if (clock) writeNumber(bytes, Number(clock[1]) * 60 + Number(clock[2]));
    else if (order.time) writeText(bytes, order.time);
    if (order.note) writeText(bytes, order.note);

    writeNumber(bytes, order.items.length);
    for (const { num, name, variant, qty, unitCents } of order.items) {
      const code = catalogueCodes.get(JSON.stringify([num, name, variant])) ?? 0;
      const defaultPrice = catalogue[code - 1]?.[3];
      const hasQuantity = qty !== 1;
      const hasPrice = unitCents !== defaultPrice;
      // The two low bits signal fields that differ from quantity 1 and the frozen price.
      writeNumber(bytes, code * 4 + Number(hasQuantity) + Number(hasPrice) * 2);
      if (!code) {
        writeText(bytes, num);
        writeText(bytes, name);
        writeText(bytes, variant);
      }
      if (hasQuantity) writeNumber(bytes, qty);
      if (hasPrice) writeNumber(bytes, unitCents);
    }

    const result = new Uint8Array(bytes.length + 4);
    result.set(bytes);
    new DataView(result.buffer).setUint32(bytes.length, checksum(bytes));
    return result;
  }

  function unpack(bytes) {
    if (bytes.length < 12) return null;
    const body = bytes.subarray(0, -4);
    const receivedChecksum = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(body.length);
    if (checksum(body) !== receivedChecksum) return null;

    const reader = new ReceiptReader(body);
    const flags = reader.byte();
    if (flags & ~63 || (flags & clockTime && flags & customTime) || (flags & tableOrder && flags & customOrder)) {
      return null;
    }
    const reference = Array.from({ length: 6 }, () => reader.byte().toString(16).padStart(2, "0")).join("").toUpperCase();
    const type = flags & customOrder ? reader.text() : flags & tableOrder ? table : pickup;
    const name = reader.text();
    const phone = flags & packedPhone ? readPhone(reader) : reader.text();
    let time = "";
    if (flags & clockTime) {
      const minutes = reader.number();
      if (minutes >= 1440) return null;
      time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
    } else if (flags & customTime) {
      time = reader.text();
    }
    const note = flags & hasNote ? reader.text() : "";

    const rowCount = reader.number();
    if (!rowCount || rowCount > body.length - reader.offset) return null;
    const rows = [];
    for (let index = 0; index < rowCount; index++) {
      const itemFlags = reader.number();
      const code = Math.floor(itemFlags / 4);
      const entry = code ? catalogue[code - 1] : [reader.text(), reader.text(), reader.text()];
      if (!entry) return null;
      const qty = itemFlags & 1 ? reader.number() : 1;
      const unitCents = itemFlags & 2 ? reader.number() : entry[3];
      rows.push([entry[0], entry[1], entry[2], qty, unitCents]);
    }
    if (reader.offset !== body.length) return null;
    return readSnapshot([reference, type, name, phone, time, note, rows]);
  }

  async function create(order, printPage) {
    const { reference, type, name, phone, time, note, items } = order;
    const rows = items.map(({ num, name, variant, qty, unitCents }) => [num, name, variant, qty, unitCents]);
    const snapshot = readSnapshot([reference, type, name, phone, time, note, rows]);
    if (!snapshot) throw new Error("Ungültige Bestelldaten.");
    const bytes = pack(snapshot);
    if (bytes.length > maxBytes) throw new Error("Bestellbon ist zu groß.");

    let payload = bytes;
    let format = "r";
    if (typeof CompressionStream === "function") {
      try {
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate"));
        const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
        if (compressed.length < bytes.length) {
          payload = compressed;
          format = "d";
        }
      } catch {
        // Use the compact bytes when stream compression is unavailable.
      }
    }
    const url = new URL(printPage);
    url.search = "";
    url.hash = `b=${format}${encodeToken(payload)}`;
    return url.href;
  }

  async function decompress(bytes, format) {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
    const reader = stream.getReader();
    const output = new Uint8Array(maxBytes);
    let offset = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) return output.subarray(0, offset);
      if (offset + value.length > output.length) {
        await reader.cancel();
        throw new Error("Bestellbon ist zu groß.");
      }
      output.set(value, offset);
      offset += value.length;
    }
  }

  async function read(hash) {
    const compact = hash.startsWith(compactPrefix);
    const prefix = compact ? compactPrefix : legacyPrefix;
    if (!hash.startsWith(prefix) || hash.length > prefix.length + 1 + Math.ceil(maxBytes * 4 / 3)) {
      return null;
    }
    const format = hash[prefix.length];
    const token = hash.slice(prefix.length + 1);
    const formats = compact ? ["r", "d"] : ["j", "g"];
    if (!formats.includes(format) || !/^[A-Za-z0-9_-]+$/.test(token)) return null;
    try {
      const encoded = decodeToken(token);
      const compression = format === "d" ? "deflate" : format === "g" ? "gzip" : null;
      const bytes = compression ? await decompress(encoded, compression) : encoded;
      if (bytes.length > maxBytes) return null;
      return compact ? unpack(bytes) : readSnapshot(JSON.parse(decoder.decode(bytes)));
    } catch {
      return null;
    }
  }

  window.SUN_ORDER_LINK = { create, read };
})();
