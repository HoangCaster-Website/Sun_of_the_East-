(function () {
  "use strict";

  const orderMessage = document.getElementById("orderMessage");
  const printManualOrder = document.getElementById("printManualOrder");
  const clearOrder = document.getElementById("clearOrder");
  const receiptDialog = document.getElementById("receiptDialog");
  const orderReceipt = document.getElementById("orderReceipt");
  const receiptTitle = document.getElementById("receiptTitle");
  const receiptDetails = document.getElementById("receiptDetails");
  const receiptItems = document.getElementById("receiptItems");
  const receiptTotal = document.getElementById("receiptTotal");
  const receiptAmount = document.getElementById("receiptAmount");
  const token = location.hash.slice(1);
  const money = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  let printCopy = null;

  function updateControls() {
    printManualOrder.disabled = !orderMessage.value.trim();
    clearOrder.disabled = !orderMessage.value;
  }

  function parseWhatsAppOrder(message) {
    const order = message.replace(/\n+Bestellbon für das Restaurant: https?:\/\/\S+$/u, "").trim();
    const lines = order.split("\n");
    const firstItem = lines.findIndex((line) => line.startsWith("• "));
    const totalLine = lines.findIndex((line) => line.startsWith("Gesamtbetrag: "));
    const hasWebsiteHeader = lines[0] === "Liebes Team von Sun of the East,"
      && lines[1] === "ich möchte gerne folgende Bestellung aufgeben:";
    const items = hasWebsiteHeader && firstItem >= 0 && totalLine > firstItem
      ? lines.slice(firstItem, totalLine).filter((line) => line.trim())
        .map((line) => line.match(/^• (.+) – (\d[\d.]*,\d{2}\s*€)$/u))
      : [];
    if (!items.length || items.some((item) => !item)) {
      return { details: order, items: [], total: "" };
    }

    return {
      details: lines.slice(totalLine + 1).join("\n").replace(/\n\nVielen Dank!$/u, ""),
      items: items.map(([, label, price]) => ({ label, price })),
      total: lines[totalLine].slice("Gesamtbetrag: ".length)
    };
  }

  function renderReceipt({ details, items, total, reference }) {
    receiptTitle.textContent = reference ? `Bestellbon ${reference}` : "Bestellbon";
    receiptDetails.textContent = details;
    receiptItems.replaceChildren();
    receiptItems.hidden = !items.length;
    receiptTotal.hidden = !total;
    receiptAmount.textContent = total;

    for (const { label, price } of items) {
      const row = document.createElement("li");
      const name = document.createElement("span");
      const amount = document.createElement("span");
      name.textContent = label;
      amount.className = "order-receipt-price";
      amount.textContent = price;
      row.append(name, amount);
      receiptItems.appendChild(row);
    }
  }

  function clearPrintState() {
    printCopy?.remove();
    printCopy = null;
    if (!token) renderReceipt({ details: "", items: [], total: "" });
  }

  function printReceipt() {
    printCopy?.remove();
    printCopy = orderReceipt.cloneNode(true);
    printCopy.removeAttribute("id");
    printCopy.removeAttribute("aria-labelledby");
    printCopy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    printCopy.classList.add("print-receipt");
    printCopy.hidden = false;
    document.body.appendChild(printCopy);
    window.print();
  }

  function setupWhatsAppOrder() {
    document.getElementById("manualOrder").hidden = false;
    orderMessage.addEventListener("input", updateControls);
    clearOrder.addEventListener("click", () => {
      orderMessage.value = "";
      clearPrintState();
      updateControls();
      orderMessage.focus();
    });
    printManualOrder.addEventListener("click", () => {
      const message = orderMessage.value.trim();
      if (!message) return;
      renderReceipt(parseWhatsAppOrder(message));
      printReceipt();
    });
    updateControls();
  }

  async function readLinkedOrder() {
    if (token.startsWith("b=") || token.startsWith("bon1=")) return window.SUN_ORDER_LINK.read(location.hash);
    if (!/^(?:[A-Za-z0-9_-]{22}|[A-Za-z0-9_-]{43})$/.test(token)) return null;
    const response = await fetch("./api/order-receipt", {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Receipt request failed");
    return response.json();
  }

  async function loadLinkedOrder() {
    document.getElementById("linkedOrder").hidden = false;
    const status = document.getElementById("receiptStatus");
    const reopen = document.getElementById("reopenReceipt");
    const skipStatus = document.getElementById("skipStatus");
    const printButton = document.getElementById("printLinkedOrder");
    document.getElementById("skipLinkedOrder").addEventListener("click", () => {
      skipStatus.hidden = false;
      receiptDialog.close();
    });
    reopen.addEventListener("click", () => {
      skipStatus.hidden = true;
      receiptDialog.showModal();
    });
    receiptDialog.addEventListener("close", () => reopen.focus());
    receiptDialog.showModal();

    try {
      const order = await readLinkedOrder();
      if (!order) {
        status.textContent = "Dieser Bestellbon wurde nicht gefunden.";
        return;
      }
      const details = [
        `Bestellart: ${order.type}`, `Name: ${order.name}`, `Telefonnummer: ${order.phone}`,
        ...(order.time ? [`Gewünschte Uhrzeit: ${order.time}`] : []),
        ...(order.note ? [`Anmerkung: ${order.note}`] : [])
      ].join("\n");
      const items = order.items.map(({ qty, num, name, variant, unitCents }) => ({
        label: `${qty} × [${num}] ${name}${variant ? ` (${variant})` : ""}`,
        price: money.format(qty * unitCents / 100)
      }));
      renderReceipt({ details, items, total: money.format(order.totalCents / 100), reference: order.reference });
      orderReceipt.hidden = false;
      document.getElementById("receiptPrintHint").hidden = false;
      printButton.hidden = false;
      status.textContent = "";
    } catch {
      status.textContent = "Die Bestellung konnte nicht geladen werden. Bitte öffnen Sie den Link erneut.";
      return;
    }

    printButton.addEventListener("click", printReceipt);
  }

  window.addEventListener("afterprint", clearPrintState);
  window.addEventListener("hashchange", () => location.reload());
  if (token) loadLinkedOrder();
  else setupWhatsAppOrder();
})();
