/**
 * Sun of the East — Interaktive Funktionen & Rich Motion Design
 * Scroll Progress · Parallax · 3D Tilt Cards
 * Fine-Dining Menu Book + Inline Quantity Steppers · Flying +1 Cart Burst
 * WhatsApp Bestellung & Tischreservierung · Lightbox · Allergene
 */

(function () {
  "use strict";

  const RESERVATION_WHATSAPP_NUMBER = "4916092978457";
  const LOCAL_ORDER_SERVER = "http://localhost:3000/";
  const isLocalPreview = /^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):550[01]$/.test(location.origin);
  const CART_STORAGE_KEY = "sun_of_the_east_cart_v1";
  const ORDER_RETRY_KEY = "sun_of_the_east_order_retry";
  const euroFormatter = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
  const data = window.SUN_MENU_DATA;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function parsePrice(priceStr) {
    if (!priceStr) return null;
    const match = String(priceStr).match(/(\d+[,.]\d+)/);
    return match ? parseFloat(match[1].replace(",", ".")) : null;
  }

  function formatPrice(num) {
    return euroFormatter.format(num);
  }

  let toastTimer = null;
  const toastEl = document.getElementById("toast");
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 2500);
  }

  function spawnFlyPlus(sourceEl) {
    if (prefersReduced || !sourceEl) return;
    const rect = sourceEl.getBoundingClientRect();
    const pill = document.createElement("span");
    pill.className = "fly-plus";
    pill.textContent = "+1";
    pill.style.left = rect.left + rect.width / 2 + "px";
    pill.style.top = rect.top + "px";
    document.body.appendChild(pill);
    setTimeout(() => pill.remove(), 780);
  }

  /* ------------------------------------------------------------------------
     0. CINEMATIC OPENING CURTAIN PRELOADER
     ------------------------------------------------------------------------ */
  const pageLoader = document.getElementById("pageLoader");
  if (pageLoader) {
    if (prefersReduced) {
      pageLoader.classList.add("is-done");
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => pageLoader.classList.add("is-done"), 520);
      });
      setTimeout(() => pageLoader.classList.add("is-done"), 1100);
    }
  }

  /* ------------------------------------------------------------------------
     1. SCROLL PROGRESS, HEADER & SUBTLE PARALLAX
     ------------------------------------------------------------------------ */
  const scrollProgress = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  const desktopNav = document.querySelector(".nav-desktop");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-link, .mobile-drawer .nav-link");
  const navIds = new Set(Array.from(navLinks, (link) => link.hash.slice(1)));
  const sections = Array.from(document.querySelectorAll("section[id]")).filter((section) => navIds.has(section.id));
  let currentNavId;

  function positionNavIndicator() {
    const link = desktopNav?.querySelector(".is-active");
    if (!link || !desktopNav.clientWidth) return;
    desktopNav.style.setProperty("--nav-left", `${link.offsetLeft}px`);
    desktopNav.style.setProperty("--nav-width", `${link.offsetWidth}px`);
    desktopNav.classList.add("has-indicator");
  }

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;
      scrollProgress.style.width = pct + "%";
    }

    const scrolled = scrollY > 36;
    if (header) header.classList.toggle("is-scrolled", scrolled);

    if (!prefersReduced && parallaxEls.length) {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > -80 && rect.top < vh + 80) {
          const speed = parseFloat(el.dataset.parallax) || 0.05;
          const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });
    }

    const scrollPos = scrollY + 150;
    let currentId = "startseite";
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    }
    if (currentId !== currentNavId) {
      currentNavId = currentId;
      navLinks.forEach((link) => {
        const active = link.hash === `#${currentId}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      positionNavIndicator();
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  if (header && "ResizeObserver" in window) {
    const headerObserver = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--site-header-height", `${header.offsetHeight}px`);
      positionNavIndicator();
    });
    headerObserver.observe(header, { box: "border-box" });
    if (desktopNav) headerObserver.observe(desktopNav);
  }
  onScroll();

  /* ------------------------------------------------------------------------
     2. 3D TILT CARDS
     ------------------------------------------------------------------------ */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 5.5).toFixed(2)}deg) rotateY(${(x * 5.5).toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. MOBILE DRAWER
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");

  function setDrawerOpen(open, restoreFocus = false) {
    if (!hamburgerBtn || !mobileDrawer || open === (hamburgerBtn.getAttribute("aria-expanded") === "true")) return;
    hamburgerBtn.classList.toggle("is-open", open);
    hamburgerBtn.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    hamburgerBtn.setAttribute("aria-expanded", String(open));
    header?.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("mobile-nav-open", open);
    mobileDrawer.inert = !open;
    if (open) {
      mobileDrawer.scrollTop = 0;
      mobileDrawer.querySelector("a").focus({ preventScroll: true });
    } else if (restoreFocus) hamburgerBtn.focus({ preventScroll: true });
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener("click", () => setDrawerOpen(mobileDrawer.inert, true));
    mobileNavBackdrop?.addEventListener("click", () => setDrawerOpen(false, true));
    mobileDrawer.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      setDrawerOpen(false);
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }
    });
    document.addEventListener("focusin", (event) => {
      if (event.target !== hamburgerBtn && !mobileDrawer.contains(event.target)) setDrawerOpen(false);
    });
    window.matchMedia("(width > 1200px)").addEventListener("change", (event) => {
      if (event.matches) setDrawerOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     4. WARENKORB STATE + INLINE MENU STEPPERS + BESTELLUNG
     ------------------------------------------------------------------------ */
  let cart = [];
  let preparingOrder = false;
  let orderDraft = null;
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    orderDraft = null;
    try {
      sessionStorage.removeItem(ORDER_RETRY_KEY);
    } catch {}
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  }

  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  }

  function getItemQty(id) {
    const found = cart.find((it) => it.id === id);
    return found ? found.qty : 0;
  }

  function cartIsLocked() {
    if (preparingOrder) showToast("Ihre Bestellung wird gerade vorbereitet.");
    return preparingOrder;
  }

  function addToCart({ id, num, name, variant, priceStr }, triggerEl) {
    if (cartIsLocked()) return;
    const unitPrice = parsePrice(priceStr);
    if (unitPrice === null) {
      showToast("Dieses Getränk ist auf Anfrage erhältlich.");
      return;
    }

    const existing = cart.find((it) => it.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, num, name, variant: variant || "", unitPrice, priceStr, qty: 1 });

    saveCart();
    spawnFlyPlus(triggerEl);
    updateCartUI(true);
    const label = variant ? `${name} (${variant})` : name;
    showToast(`„${label}“ wurde zum Warenkorb hinzugefügt.`);
  }

  function changeCartQty(id, delta) {
    if (cartIsLocked()) return;
    const idx = cart.findIndex((it) => it.id === id);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    updateCartUI(false);
  }

  function clearCart() {
    if (cartIsLocked()) return;
    cart = [];
    saveCart();
    updateCartUI(false);
    showToast("Ihr Warenkorb wurde geleert.");
  }

  const headerCartBadge = document.getElementById("headerCartBadge");
  const floatingCartBtn = document.getElementById("floatingCartBtn");
  const floatingCartCount = document.getElementById("floatingCartCount");
  const floatingCartTotal = document.getElementById("floatingCartTotal");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTotalPrice = document.getElementById("cartTotalPrice");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const menuCartCount = document.getElementById("menuCartCount");
  let cartOpener = null;

  function openCartDrawer(event) {
    if (!cartBackdrop) return;
    cartOpener = event.currentTarget;
    setDrawerOpen(false);
    cartBackdrop.inert = false;
    cartBackdrop.classList.add("is-open");
    document.body.classList.add("no-scroll");
    cartCloseBtn?.focus({ preventScroll: true });
  }

  function closeCartDrawer() {
    if (!cartBackdrop?.classList.contains("is-open")) return;
    cartBackdrop.classList.remove("is-open");
    cartBackdrop.inert = true;
    document.body.classList.remove("no-scroll");
    const focusTarget = cartOpener?.closest("[hidden], .is-hidden") ? headerCartBtn : cartOpener;
    focusTarget?.focus({ preventScroll: true });
    cartOpener = null;
  }

  function updateCartUI(animate) {
    const count = getCartCount();
    const total = getCartTotal();

    if (headerCartBadge) {
      headerCartBadge.textContent = String(count);
      headerCartBadge.classList.toggle("is-empty", count === 0);
      if (animate) {
        headerCartBadge.classList.remove("is-pop");
        void headerCartBadge.offsetWidth;
        headerCartBadge.classList.add("is-pop");
        setTimeout(() => headerCartBadge.classList.remove("is-pop"), 280);
      }
    }

    if (floatingCartBtn && floatingCartCount && floatingCartTotal) {
      floatingCartBtn.classList.toggle("is-hidden", count === 0);
      floatingCartCount.textContent = String(count);
      floatingCartTotal.textContent = formatPrice(total);
      if (animate) {
        floatingCartBtn.classList.remove("is-bounce");
        void floatingCartBtn.offsetWidth;
        floatingCartBtn.classList.add("is-bounce");
      }
    }

    if (cartTotalPrice) cartTotalPrice.textContent = formatPrice(total);
    if (cartOrderStatus?.dataset.state === "ready") {
      cartOrderStatus.textContent = "";
      delete cartOrderStatus.dataset.state;
    }
    if (menuCartCount && menuCartCount.textContent !== String(count)) {
      menuCartCount.textContent = String(count);
      pulseMenuControl(menuCartCount);
    }

    if (cartItemsContainer) {
      if (!cart.length) {
        cartItemsContainer.innerHTML = `
          <div class="cart-empty">
            <p><strong>Ihr Warenkorb ist noch leer.</strong></p>
            <p style="margin-top:0.35rem; font-size:0.86rem;">Entdecken Sie unsere Gerichte und Getränke auf der Speisekarte.</p>
          </div>
        `;
      } else {
        cartItemsContainer.innerHTML = `
          <div class="cart-items">
            ${cart
              .map(
                (item) => `
              <div class="cart-item">
                <div class="cart-item-info">
                  <div class="cart-item-title">${escapeHtml(item.num)} · ${escapeHtml(item.name)}</div>
                  <div class="cart-item-sub">
                    ${item.variant ? escapeHtml(item.variant) + " · " : ""}${formatPrice(item.unitPrice)} × ${item.qty} = <strong>${formatPrice(item.unitPrice * item.qty)}</strong>
                  </div>
                </div>
                <div class="cart-item-controls">
                  <button type="button" class="qty-btn" data-cart-dec="${escapeHtml(item.id)}" aria-label="Menge verringern">−</button>
                  <span class="qty-val">${item.qty}</span>
                  <button type="button" class="qty-btn" data-cart-inc="${escapeHtml(item.id)}" aria-label="Menge erhöhen">+</button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
          <button type="button" class="cart-clear-btn" id="cartClearBtn">Warenkorb leeren</button>
        `;

        cartItemsContainer.querySelectorAll("[data-cart-dec]").forEach((btn) => {
          btn.addEventListener("click", () => changeCartQty(btn.getAttribute("data-cart-dec"), -1));
        });
        cartItemsContainer.querySelectorAll("[data-cart-inc]").forEach((btn) => {
          btn.addEventListener("click", () => changeCartQty(btn.getAttribute("data-cart-inc"), 1));
        });
        const clearBtn = document.getElementById("cartClearBtn");
        if (clearBtn) clearBtn.addEventListener("click", clearCart);
      }
    }

    const menuLiveOrder = document.getElementById("menuLiveOrder");
    const menuLiveOrderText = document.getElementById("menuLiveOrderText");
    if (menuLiveOrder && menuLiveOrderText) {
      menuLiveOrder.hidden = count === 0;
      if (count > 0) {
        menuLiveOrderText.innerHTML = `<strong>${count} Artikel</strong> im Warenkorb · Gesamtbetrag: <strong>${formatPrice(total)}</strong>`;
      }
    }

    syncMenuCartControls();
  }

  const headerCartBtn = document.getElementById("headerCartBtn");
  const openCartFromHint = document.getElementById("openCartFromHint");
  const menuLiveOrderBtn = document.getElementById("menuLiveOrderBtn");
  if (headerCartBtn) headerCartBtn.addEventListener("click", openCartDrawer);
  if (floatingCartBtn) floatingCartBtn.addEventListener("click", openCartDrawer);
  if (openCartFromHint) openCartFromHint.addEventListener("click", openCartDrawer);
  if (menuLiveOrderBtn) menuLiveOrderBtn.addEventListener("click", openCartDrawer);
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", (e) => { if (e.target === cartBackdrop) closeCartDrawer(); });

  document.querySelectorAll("[data-quick-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [num, name, priceStr] = btn.getAttribute("data-quick-add").split("|");
      addToCart({ id: `${num}::${name}`, num, name, variant: "", priceStr }, btn);
    });
  });

  const orderName = document.getElementById("orderName");
  const orderPhone = document.getElementById("orderPhone");
  const cartOrderForm = document.getElementById("cartOrderForm");
  const cartOrderStatus = document.getElementById("cartOrderStatus");
  const sendWhatsAppOrderBtn = document.getElementById("sendWhatsAppOrderBtn");

  function getOrderDetails() {
    if (!cart.length) {
      showToast("Bitte legen Sie zuerst etwas in den Warenkorb.");
      return null;
    }
    const missingField = [orderName, orderPhone].find((field) => !field.value.trim());
    if (missingField) {
      showToast("Bitte geben Sie Ihren Namen und Ihre Telefonnummer an.");
      missingField.focus();
      return null;
    }
    return {
      type: document.getElementById("orderType").value,
      name: orderName.value.trim(),
      phone: orderPhone.value.trim(),
      time: document.getElementById("orderTime").value.trim(),
      note: document.getElementById("orderNote").value.trim()
    };
  }

  function getOrderItemLabel(item) {
    const variant = item.variant ? ` (${item.variant})` : "";
    return `${item.qty} × [${item.num}] ${item.name}${variant}`;
  }

  async function getOrderRequestId(content) {
    if (orderDraft?.content === content) return orderDraft.requestId;
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    let requestId = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

    if (crypto.subtle) {
      try {
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(content));
        const fingerprint = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
        const previous = JSON.parse(sessionStorage.getItem(ORDER_RETRY_KEY));
        if (previous?.fingerprint === fingerprint && /^[a-f0-9]{32}$/.test(previous.requestId)) {
          requestId = previous.requestId;
        } else {
          sessionStorage.setItem(ORDER_RETRY_KEY, JSON.stringify({ fingerprint, requestId }));
        }
      } catch {
        // A blocked session store still allows retries while this page is open.
      }
    }

    orderDraft = { content, requestId };
    return requestId;
  }

  function openWhatsAppOrder(details, { reference, receiptUrl, whatsappNumber }) {
    const lines = [
      "Liebes Team von Sun of the East,",
      "ich möchte gerne folgende Bestellung aufgeben:",
      "",
      `Bestellung ${reference}`,
      "Bestellbon öffnen und drucken",
      receiptUrl,
      "",
      ...cart.map((item) => `• ${getOrderItemLabel(item)} – ${formatPrice(item.unitPrice * item.qty)}`),
      "",
      `Gesamtbetrag: ${formatPrice(getCartTotal())}`,
      `Bestellart: ${details.type}`,
      `Name: ${details.name}`,
      `Telefonnummer: ${details.phone}`,
      ...(details.time ? [`Gewünschte Uhrzeit: ${details.time}`] : []),
      ...(details.note ? [`Anmerkung: ${details.note}`] : []),
      "",
      "Vielen Dank!"
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const appLink = document.createElement("a");
    appLink.href = `whatsapp://send?phone=${whatsappNumber}&text=${message}`;
    appLink.textContent = "WhatsApp-App öffnen";
    const browserLink = document.createElement("a");
    browserLink.href = `https://wa.me/${whatsappNumber}?text=${message}`;
    browserLink.textContent = "Im Browser öffnen";
    browserLink.target = "_blank";
    browserLink.rel = "noopener noreferrer";
    cartOrderStatus.dataset.state = "ready";
    cartOrderStatus.textContent = "Bitte senden Sie die vorbereitete Nachricht in WhatsApp ab.";
    cartOrderStatus.append(" ", appLink, " · ", browserLink);
    appLink.click();
  }

  function showUnavailableOrderServer() {
    cartOrderStatus.dataset.state = "error";
    cartOrderStatus.textContent = "Der Bestellserver ist nicht erreichbar.";
    if (location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) {
      const link = document.createElement("a");
      link.href = LOCAL_ORDER_SERVER;
      link.textContent = "Lokalen Bestellserver öffnen";
      cartOrderStatus.append(" ", link);
    }
  }

  if (cartOrderForm && cartOrderStatus && sendWhatsAppOrderBtn) {
    cartOrderForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (preparingOrder) return;
      const details = getOrderDetails();
      if (!details) return;
      if (location.protocol === "file:") {
        showUnavailableOrderServer();
        return;
      }

      const payload = {
        ...details,
        items: cart.map(({ id, qty }) => ({ id, qty })),
        expectedTotalCents: Math.round(getCartTotal() * 100)
      };
      preparingOrder = true;
      sendWhatsAppOrderBtn.disabled = true;
      cartOrderStatus.dataset.state = "pending";
      cartOrderStatus.textContent = "Ihre Bestellung wird vorbereitet …";

      try {
        const requestId = await getOrderRequestId(JSON.stringify(payload));
        const ordersUrl = isLocalPreview ? new URL("api/orders", LOCAL_ORDER_SERVER) : "./api/orders";
        const response = await fetch(ordersUrl, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, requestId })
        });
        const result = await response.json().catch(() => null);
        if ((!result && response.ok) || [404, 405, 501].includes(response.status)) {
          showUnavailableOrderServer();
          return;
        }
        if (!response.ok || typeof result?.reference !== "string" || typeof result.receiptUrl !== "string"
            || typeof result.whatsappNumber !== "string" || !/^[1-9]\d{6,14}$/.test(result.whatsappNumber)) {
          throw new Error(result?.error || "Der Bestellbon konnte gerade nicht erstellt werden. Bitte versuchen Sie es erneut.");
        }

        openWhatsAppOrder(details, result);
      } catch (error) {
        if (error instanceof TypeError && isLocalPreview) {
          showUnavailableOrderServer();
          return;
        }
        cartOrderStatus.dataset.state = "error";
        cartOrderStatus.textContent = error instanceof TypeError
          ? "Die Verbindung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
          : error.message;
      } finally {
        preparingOrder = false;
        sendWhatsAppOrderBtn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. WHATSAPP TISCHRESERVIERUNG & LIVE STATUS
     ------------------------------------------------------------------------ */
  const openStatusText = document.getElementById("openStatusText");
  if (openStatusText) {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const mins = now.getHours() * 60 + now.getMinutes();
    const isOpen = day >= 1 && day <= 6 && mins >= 660 && mins < 1290;
    openStatusText.textContent = isOpen
      ? "Jetzt geöffnet · bis 21:30 Uhr"
      : day === 0
      ? "Sonntag · heute geschlossen"
      : "Mo.–Sa. 11:00–21:30 Uhr";
  }

  const reservationForm = document.getElementById("reservationForm");
  const resDate = document.getElementById("resDate");
  const sundayWarning = document.getElementById("sundayWarning");

  if (resDate) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    resDate.min = todayStr;
    resDate.value = todayStr;

    const checkSunday = () => {
      if (!resDate.value || !sundayWarning) return false;
      const isSun = new Date(resDate.value + "T12:00:00").getDay() === 0;
      sundayWarning.classList.toggle("is-visible", isSun);
      return isSun;
    };

    resDate.addEventListener("change", checkSunday);
    checkSunday();

    if (reservationForm) {
      reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("resName").value.trim();
        const phone = document.getElementById("resPhone").value.trim();
        const dateVal = resDate.value;
        const timeVal = document.getElementById("resTime").value;
        const guests = document.getElementById("resGuests").value;
        const note = document.getElementById("resNote").value.trim();

        if (!name || !phone || !dateVal) {
          showToast("Bitte füllen Sie alle Pflichtfelder aus.");
          return;
        }
        if (checkSunday()) {
          showToast("Sonntags haben wir geschlossen. Bitte wählen Sie einen Tag von Montag bis Samstag.");
          return;
        }

        const [y, m, d] = dateVal.split("-");
        const lines = [
          "Liebes Team von Sun of the East,",
          "ich möchte gerne einen Tisch reservieren:",
          "",
          `• Datum: ${d}.${m}.${y}`,
          `• Uhrzeit: ${timeVal} Uhr`,
          `• Anzahl der Gäste: ${guests}`,
          `• Name: ${name}`,
          `• Telefonnummer: ${phone}`
        ];
        if (note) lines.push(`• Besondere Wünsche: ${note}`);
        lines.push("", "Ich freue mich auf Ihre Bestätigung. Vielen Dank!");

        window.open(`https://wa.me/${RESERVATION_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. SPEISEKARTE
     ------------------------------------------------------------------------ */
  const menuTabsEl = document.getElementById("menuTabs");
  const verticalMenuTabs = window.matchMedia("(min-width: 1040px)");
  const menuContentEl = document.getElementById("menuContent");
  const menuPanelEl = document.getElementById("menuPanel");
  const menuCategoryHeroEl = document.getElementById("menuCategoryHero");
  const menuSubnavEl = document.getElementById("menuSubnav");
  const menuSearchInput = document.getElementById("menuSearchInput");
  const menuSearchStatus = document.getElementById("menuSearchStatus");

  const menuEntryObserver = !prefersReduced && "IntersectionObserver" in window
    ? new IntersectionObserver((entries, observer) => {
        let cardIndex = 0;
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          if (target.classList.contains("menu-card")) {
            target.style.setProperty("--menu-delay", `${Math.min(cardIndex++, 5) * 45}ms`);
          }
          target.classList.add("is-entering");
          observer.unobserve(target);
        });
      }, { threshold: 0.12 })
    : null;

  function pulseMenuControl(element) {
    if (prefersReduced || !element.animate) return;
    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate([
      { scale: 0.9 },
      { scale: 1.15, offset: 0.45 },
      { scale: 1 }
    ], { duration: 300, easing: "ease-out" });
  }

  const CATEGORY_META = {
    "suppen-vorspeisen": {
      img: "./images/pho-bowl-closeup.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11h16a1 1 0 0 1 1 1v.5a7.5 7.5 0 0 1-15 0V12a1 1 0 0 1 1-1Z"/><path d="M7 20h10"/><path d="M9 7c0-1 .8-1.5.8-2.5S9 3 9 3"/><path d="M15 7c0-1 .8-1.5.8-2.5S15 3 15 3"/></svg>`,
      tagline: "Aromatische Suppen, frische Salate und knusprige Häppchen zum Auftakt."
    },
    "pho-bun": {
      img: "./images/pho-bowl-closeup.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8Z"/><path d="M7 21h10"/><path d="M5 4l14 4"/><path d="M7 7l12 2"/></svg>`,
      tagline: "Traditionelle vietnamesische Reisbandnudelsuppen, Bún-Schalen und feine Kräuter."
    },
    "reis-nudeln": {
      img: "./images/knusprige-ente-udon-wide.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h18a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7Z"/><path d="M6 13c1.5-3 4-4.5 6-4.5s4.5 1.5 6 4.5"/><path d="M8 5h8"/></svg>`,
      tagline: "Frisch aus dem Wok – gebratene Udon- und Phở-Nudeln sowie Reisgerichte mit feinen Saucen."
    },
    "wok-spezialitaeten": {
      img: "./images/knusprige-ente-udon-wide.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.5 2.5 3.5 4 3.5 6.8a3.5 3.5 0 1 1-7 0C8.5 7 10.5 5.5 12 3Z"/><path d="M3 15h14a6 6 0 0 1-6 5H9a6 6 0 0 1-6-5Z"/><path d="M17 15l4-2"/></svg>`,
      tagline: "Aromatische Hausspezialitäten, gegrillter Lachs, Meeresfrüchte und Menüs für zwei Personen."
    },
    "sushi-sashimi-nigiri": {
      img: "./images/sushi-nigiri-bambus.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="7" rx="3.5"/><path d="M3 12c2.5-4 6-5.5 9-5.5s6.5 1.5 9 5.5"/><path d="M10 7v11"/><path d="M14 7v11"/></svg>`,
      tagline: "Präzise geschnittenes Sashimi und handgeformtes Nigiri – serviert mit Wasabi und Ingwer."
    },
    "maki-insideout": {
      img: "./images/insideout-lachs-tobiko.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.2"/></svg>`,
      tagline: "Klassische Maki und kreative Inside-Out-Rolls mit Fischrogen oder Sesam."
    },
    "special-rolls-crunchy": {
      img: "./images/sushi-schieferplatte-crunchy.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 14.9 8.3 21.8 9.2 16.7 14 18 20.8 12 17.5 6 20.8 7.3 14 2.2 9.2 9.1 8.3 12 2"/></svg>`,
      tagline: "Knusprige Tempura-Rollen und besondere Sushi-Kreationen des Hauses."
    },
    "sushi-bowls-menues": {
      img: "./images/sushi-platte-gross.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18"/><path d="M12 10v10"/></svg>`,
      tagline: "Frische Sushi-Bowls, vegetarische und klassische Sushi-Menüs sowie Spezialmenüs zum Teilen."
    },
    "desserts": {
      img: "./images/desserts-mochi-mango.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4a6 6 0 0 1 6 6c0 2-1 3.5-2.5 4.5H8.5C7 13.5 6 12 6 10a6 6 0 0 1 6-6Z"/><path d="M5 14.5h14l-1.5 5.5h-11L5 14.5Z"/></svg>`,
      tagline: "Süße fernöstliche Klassiker – von Mango-Klebreis über Mochi bis Panna Cotta."
    },
    "getraenke": {
      img: "./images/drinks-hausgemacht.jpg",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l-5 7v6"/><path d="M9 17h6"/><path d="M15 3l3-1"/></svg>`,
      tagline: "Vietnamesischer Kaffee, feine Tees, hausgemachte Getränke, Cocktails, Bier und Wein."
    }
  };

  let activeCategoryId = data && data.categories.length ? data.categories[0].id : "";
  let activeMenuFilter = "all";

  function matchesQuickFilter(item) {
    if (activeMenuFilter === "all") return true;
    const text = `${item.name} ${item.desc || ""} ${(item.variants || []).map((v) => v.label).join(" ")}`.toLowerCase();
    if (activeMenuFilter === "veggie") {
      return text.includes("vegan") || text.includes("vegetarisch") || text.includes("tofu") || text.includes("veggie") || text.includes("avocado") || text.includes("gurke") || text.includes("rettich") || text.includes("mango");
    }
    if (activeMenuFilter === "spicy") {
      return text.includes("scharf") || text.includes("spicy") || text.includes("chili") || text.includes("hot ");
    }
    if (activeMenuFilter === "under10") {
      const prices = [];
      if (item.price) {
        const p = parsePrice(item.price);
        if (p !== null) prices.push(p);
      }
      if (Array.isArray(item.variants)) {
        item.variants.forEach((v) => {
          const p = parsePrice(v.price);
          if (p !== null) prices.push(p);
        });
      }
      return prices.some((p) => p < 10);
    }
    return true;
  }

  function renderAllergenSup(allergens) {
    if (!allergens) return "";
    return `<sup class="allergen-sup" title="Allergene und Zusatzstoffe: ${escapeHtml(allergens)}">${escapeHtml(allergens)}</sup>`;
  }

  function renderDietPills(desc) {
    if (!desc) return "";
    const low = desc.toLowerCase();
    let html = "";
    if (low.includes("(vegan)")) html += `<span class="diet-pill diet-pill--vegan">Vegan</span>`;
    else if (low.includes("(vegetarisch)")) html += `<span class="diet-pill diet-pill--vegan">Vegetarisch</span>`;
    if (low.includes("(scharf)")) html += `<span class="diet-pill diet-pill--spicy">Scharf</span>`;
    return html;
  }

  function renderActionControl({ id, num, name, variant, priceStr }) {
    if (parsePrice(priceStr) === null) return "";
    const label = variant ? `${name}, ${variant}` : name;
    return `<span class="menu-action-control" data-menu-control="${escapeHtml(id)}" data-num="${escapeHtml(num)}" data-name="${escapeHtml(name)}" data-label="${escapeHtml(label)}" data-variant="${escapeHtml(variant)}" data-price="${escapeHtml(priceStr)}">${renderQuantityControl(label, getItemQty(id))}</span>`;
  }

  function renderQuantityControl(name, qty) {
    if (qty > 0) {
      return `
        <span class="inline-stepper">
          <button type="button" data-menu-action="decrease" aria-label="${escapeHtml(name)}: Menge verringern">−</button>
          <span data-menu-qty>${qty}</span>
          <button type="button" data-menu-action="increase" aria-label="${escapeHtml(name)}: Menge erhöhen">+</button>
        </span>
      `;
    }
    return `<button type="button" class="add-btn" data-menu-action="add" aria-label="${escapeHtml(name)} hinzufügen">+</button>`;
  }

  function syncMenuCartControls() {
    menuContentEl?.querySelectorAll("[data-menu-control]").forEach((control) => {
      const qty = getItemQty(control.dataset.menuControl);
      const currentQty = control.querySelector("[data-menu-qty]");
      if (qty > 0 && currentQty) {
        if (currentQty.textContent !== String(qty)) {
          currentQty.textContent = qty;
          pulseMenuControl(currentQty);
        }
      } else if (Boolean(qty) !== Boolean(currentQty)) {
        const hadFocus = control.contains(document.activeElement);
        control.innerHTML = renderQuantityControl(control.dataset.label, qty);
        pulseMenuControl(control.firstElementChild);
        if (hadFocus) control.querySelector(qty > 0 ? '[data-menu-action="increase"]' : "button").focus({ preventScroll: true });
      }
    });
  }

  function formatVariantLabelHtml(label, allergens) {
    const raw = String(label || "");
    const match = raw.match(/^([A-L]\))\s*(.+)$/);
    if (match) {
      return `<span class="menu-variant-code">${escapeHtml(match[1])}</span><span class="menu-variant-name">${escapeHtml(match[2])}${renderAllergenSup(allergens)}</span>`;
    }
    return `<span class="menu-variant-name">${escapeHtml(raw)}${renderAllergenSup(allergens)}</span>`;
  }

  function renderMenuCard(item, isFullSpan = false) {
    const hasVariants = Array.isArray(item.variants) && item.variants.length > 0;
    const singleId = `${item.num}::${item.name}`;

    const topRightHtml = !hasVariants && item.price
      ? `<span class="menu-item-dots" aria-hidden="true"></span>
         <div class="menu-item-price-action">
           <span class="menu-item-price">${escapeHtml(item.price)}</span>
           ${renderActionControl({ id: singleId, num: item.num, name: item.name, variant: "", priceStr: item.price })}
         </div>`
      : "";

    const descHtml = item.desc ? `<p class="menu-item-desc">${escapeHtml(item.desc)}</p>` : "";

    const variantsHtml = hasVariants
      ? `<ul class="menu-variants${item.variants.length === 2 ? " menu-variants--pair" : ""}">
          ${item.variants
            .map((v) => {
              const varId = `${item.num}::${item.name}::${v.label}`;
              return `
                <li class="menu-variant">
                  <span class="menu-variant-label">${formatVariantLabelHtml(v.label, v.allergens)}</span>
                  <span class="menu-item-price-action">
                    <span class="menu-variant-price">${escapeHtml(v.price)}</span>
                    ${renderActionControl({ id: varId, num: item.num, name: item.name, variant: v.label, priceStr: v.price })}
                  </span>
                </li>`;
            })
            .join("")}
        </ul>`
      : "";

    const classes = [
      "menu-card",
      hasVariants ? "menu-card--has-variants" : "menu-card--single",
      hasVariants || isFullSpan ? "menu-card--full" : ""
    ].filter(Boolean).join(" ");

    return `
      <article class="${classes}" data-menu-enter>
        <div class="menu-card-badge-col">
          <span class="menu-item-num">${escapeHtml(item.num)}</span>
        </div>
        <div class="menu-card-content">
          <div class="menu-card-main">
            <div class="menu-card-top">
              <div class="menu-card-title-wrap">
                <h4 class="menu-item-name">${escapeHtml(item.name)}${renderAllergenSup(item.allergens)}</h4>
                ${renderDietPills(item.desc)}
              </div>
              ${topRightHtml}
            </div>
            ${descHtml}
          </div>
          ${variantsHtml}
        </div>
      </article>
    `;
  }

  function renderGroups(groups) {
    if (!groups.length) {
      return `<div class="menu-empty"><strong>Keine passenden Einträge gefunden.</strong><p>Ändern Sie den Suchbegriff oder wählen Sie einen anderen Filter.</p></div>`;
    }
    return groups
      .map((group, idx) => {
        const grpId = "menu-grp-" + idx;
        const items = group.items;

        // Calculate smart full-span flags so single-price items pair symmetrically in 2 columns
        // and any solo/odd single-price item before a variant dish (or at the end) spans full width cleanly!
        const fullSpanFlags = new Array(items.length).fill(false);
        let runStart = -1;
        for (let i = 0; i <= items.length; i++) {
          const isSingle = i < items.length && !(Array.isArray(items[i].variants) && items[i].variants.length > 0);
          if (isSingle) {
            if (runStart === -1) runStart = i;
          } else if (runStart !== -1) {
            const runLen = i - runStart;
            if (runLen % 2 === 1) {
              fullSpanFlags[i - 1] = true;
            }
            runStart = -1;
          }
        }

        const countLabel = `${items.length} ${items.length === 1 ? "Position" : "Positionen"}`;
        return `
          <div class="menu-group" id="${grpId}" tabindex="-1">
            <div class="menu-group-header">
              <div class="menu-group-title-row">
                <h3 class="menu-group-title">${escapeHtml(group.title)}</h3>
                <span class="menu-group-count">${countLabel}</span>
              </div>
              ${group.note ? `<p class="menu-group-note">${escapeHtml(group.note)}</p>` : ""}
            </div>
            <div class="menu-cards-grid">
              ${items.map((item, i) => renderMenuCard(item, fullSpanFlags[i])).join("")}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function countCategoryItems(cat) {
    return cat.groups.reduce((acc, g) => acc + g.items.length, 0);
  }

  function renderTabs() {
    if (!menuTabsEl || !data) return;
    menuTabsEl.innerHTML = data.categories
      .map(
        (cat) => {
          const iconHtml = CATEGORY_META[cat.id]?.icon || "";
          return `
        <button
          type="button"
          class="menu-tab"
          id="menu-tab-${escapeHtml(cat.id)}"
          role="tab"
          aria-controls="menuPanel"
          data-category-id="${escapeHtml(cat.id)}"
        >
          <span class="menu-tab-label-wrap">
            ${iconHtml ? `<span class="menu-tab-icon" aria-hidden="true">${iconHtml}</span>` : ""}
            <span>${escapeHtml(cat.label)}</span>
          </span>
          <span class="menu-tab-count">${countCategoryItems(cat)}</span>
        </button>
      `;
        }
      )
      .join("");

    updateMenuTabs();
  }

  function updateMenuTabs() {
    menuTabsEl?.querySelectorAll(".menu-tab").forEach((tab) => {
      const active = tab.dataset.categoryId === activeCategoryId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  }

  function selectMenuCategory(tab, revealPanel = false) {
    if (tab.dataset.categoryId !== activeCategoryId || menuSearchInput?.value) {
      const returnToPanel = revealPanel && verticalMenuTabs.matches && menuPanelEl && header &&
        menuPanelEl.getBoundingClientRect().top < header.getBoundingClientRect().bottom;
      activeCategoryId = tab.dataset.categoryId;
      if (menuSearchInput) menuSearchInput.value = "";
      updateMenuTabs();
      renderActiveCategory(true);
      if (returnToPanel) {
        menuPanelEl.scrollIntoView({ behavior: prefersReduced ? "instant" : "smooth" });
      }
    }
    scrollTabIntoView(tab);
  }

  function scrollTabIntoView(tab, behavior = prefersReduced ? "instant" : "smooth") {
    if (verticalMenuTabs.matches) {
      const rail = menuTabsEl.parentElement;
      const top = menuTabsEl.offsetTop + tab.offsetTop;
      const bottom = top + tab.offsetHeight;
      if (top < rail.scrollTop) rail.scrollTo({ top, behavior });
      else if (bottom > rail.scrollTop + rail.clientHeight) {
        rail.scrollTo({ top: bottom - rail.clientHeight, behavior });
      }
    } else if (menuTabsEl.scrollWidth > menuTabsEl.clientWidth) {
      menuTabsEl.scrollTo({
        left: tab.offsetLeft - (menuTabsEl.clientWidth - tab.offsetWidth) / 2,
        behavior
      });
    }
  }

  function renderCategoryHero(category, count, groups = []) {
    if (!menuCategoryHeroEl) return;
    const existingHero = menuCategoryHeroEl.firstElementChild;
    const subnavHtml = groups.length > 1
      ? `<nav class="menu-subnav" aria-label="Unterkategorien">
          ${groups.map((group, index) => `<a href="#menu-grp-${index}" class="menu-subpill">${escapeHtml(group.title)}</a>`).join("")}
        </nav>`
      : "";
    if (existingHero?.dataset.categoryId !== category.id) {
      if (existingHero) menuEntryObserver?.unobserve(existingHero);
      const meta = CATEGORY_META[category.id] || { tagline: "Frisch für Sie zubereitet." };
      menuCategoryHeroEl.innerHTML = `
        <div class="menu-cat-hero${meta.img ? " menu-cat-hero--has-photo" : ""}" data-category-id="${escapeHtml(category.id)}" data-menu-enter>
          <div class="menu-cat-hero-text">
            <p class="menu-cat-kicker"></p>
            <h3>${escapeHtml(category.label)}</h3>
            <p class="menu-cat-tagline">${escapeHtml(meta.tagline)}</p>
            <div class="menu-cat-subnav-slot">${subnavHtml}</div>
          </div>
          ${meta.img ? `<div class="menu-cat-hero-photo"><img src="${meta.img}" alt="${escapeHtml(category.label)}" class="menu-cat-hero-img" decoding="async" loading="lazy"></div>` : ""}
        </div>`;
      const hero = menuCategoryHeroEl.firstElementChild;
      const photo = hero.querySelector("img");
      photo?.addEventListener("error", () => {
        hero.classList.remove("menu-cat-hero--has-photo");
        photo.parentElement.remove();
      }, { once: true });
      menuEntryObserver?.observe(hero);
    } else {
      const slot = menuCategoryHeroEl.querySelector(".menu-cat-subnav-slot");
      if (slot) slot.innerHTML = subnavHtml;
    }
    menuCategoryHeroEl.querySelector(".menu-cat-kicker").textContent = `SUN OF THE EAST · ${count} ${count === 1 ? "SPEZIALITÄT" : "SPEZIALITÄTEN"}`;
    if (menuSubnavEl) menuSubnavEl.innerHTML = "";
  }

  function renderActiveCategory(animateCards = true) {
    if (!menuContentEl || !data) return;
    const query = menuSearchInput ? menuSearchInput.value.trim().toLowerCase() : "";
    menuPanelEl?.setAttribute("aria-labelledby", query ? "menuTitle" : `menu-tab-${activeCategoryId}`);
    if (menuEntryObserver) {
      menuContentEl.querySelectorAll("[data-menu-enter]").forEach((card) => menuEntryObserver.unobserve(card));
    }

    let groups;
    if (query) {
      const hero = menuCategoryHeroEl?.firstElementChild;
      if (hero) {
        menuEntryObserver?.unobserve(hero);
        hero.remove();
      }
      if (menuSubnavEl) menuSubnavEl.innerHTML = "";

      const matchedGroups = [];
      data.categories.forEach((cat) => {
        cat.groups.forEach((grp) => {
          const items = grp.items.filter((it) => {
            if (!matchesQuickFilter(it)) return false;
            const haystack = [it.num, it.name, it.desc || "", (it.variants || []).map((v) => v.label).join(" ")].join(" ").toLowerCase();
            return haystack.includes(query);
          });
          if (items.length) matchedGroups.push({ title: `${cat.label} · ${grp.title}`, note: grp.note, items });
        });
      });
      if (menuSearchStatus) {
        const count = countCategoryItems({ groups: matchedGroups });
        menuSearchStatus.textContent = `${count} Treffer für „${menuSearchInput.value.trim()}“`;
      }
      groups = matchedGroups;
    } else {
      const cat = data.categories.find((c) => c.id === activeCategoryId) || data.categories[0];
      groups = cat.groups
        .map((grp) => ({ ...grp, items: grp.items.filter(matchesQuickFilter) }))
        .filter((grp) => grp.items.length > 0);

      renderCategoryHero(cat, countCategoryItems({ groups }), groups);
      if (menuSearchStatus) menuSearchStatus.textContent = "";
    }
    menuContentEl.innerHTML = renderGroups(groups);
    if (animateCards && menuEntryObserver) {
      menuContentEl.querySelectorAll("[data-menu-enter]").forEach((card) => menuEntryObserver.observe(card));
    }
  }

  // Menu tab scroll chevrons & quick filter chips
  const menuTabsPrev = document.getElementById("menuTabsPrev");
  const menuTabsNext = document.getElementById("menuTabsNext");
  function updateTabArrows() {
    if (!menuTabsEl) return;
    const { scrollLeft, scrollWidth, clientWidth } = menuTabsEl;
    menuTabsPrev?.setAttribute("aria-disabled", String(scrollLeft <= 1));
    menuTabsNext?.setAttribute("aria-disabled", String(scrollLeft + clientWidth >= scrollWidth - 1));
  }

  function scrollMenuTabs(button, direction) {
    if (!menuTabsEl || button.getAttribute("aria-disabled") === "true") return;
    menuTabsEl.scrollBy({ left: direction * menuTabsEl.clientWidth * 0.72, behavior: prefersReduced ? "instant" : "smooth" });
  }

  menuTabsPrev?.addEventListener("click", () => scrollMenuTabs(menuTabsPrev, -1));
  menuTabsNext?.addEventListener("click", () => scrollMenuTabs(menuTabsNext, 1));
  menuTabsEl?.addEventListener("scroll", updateTabArrows, { passive: true });
  window.addEventListener("resize", updateTabArrows);

  function updateTabLayout() {
    menuTabsEl?.setAttribute("aria-orientation", verticalMenuTabs.matches ? "vertical" : "horizontal");
    const selectedTab = menuTabsEl?.querySelector(".is-active");
    if (selectedTab) scrollTabIntoView(selectedTab, "instant");
    updateTabArrows();
  }

  verticalMenuTabs.addEventListener("change", updateTabLayout);

  const menuFilterBar = document.getElementById("menuFilterBar");
  menuFilterBar?.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-menu-filter]");
    if (!chip || chip.dataset.menuFilter === activeMenuFilter) return;
    activeMenuFilter = chip.dataset.menuFilter;
    menuFilterBar.querySelectorAll(".menu-filter-chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    renderActiveCategory();
  });

  menuContentEl?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-menu-action]");
    if (!button) return;
    const { menuControl: id, num, name, variant, price: priceStr } = button.closest("[data-menu-control]").dataset;
    const action = button.dataset.menuAction;
    if (action === "add") addToCart({ id, num, name, variant, priceStr }, button);
    else if (action === "decrease") changeCartQty(id, -1);
    else {
      spawnFlyPlus(button);
      changeCartQty(id, 1);
    }
  });

  menuTabsEl?.addEventListener("click", (event) => {
    const tab = event.target.closest(".menu-tab");
    if (tab) selectMenuCategory(tab, true);
  });

  menuTabsEl?.addEventListener("keydown", (event) => {
    const tabs = Array.from(menuTabsEl.querySelectorAll(".menu-tab"));
    const index = tabs.indexOf(event.target);
    if (index === -1) return;
    let next;
    const forward = verticalMenuTabs.matches ? "ArrowDown" : "ArrowRight";
    const back = verticalMenuTabs.matches ? "ArrowUp" : "ArrowLeft";
    if (event.key === forward) next = (index + 1) % tabs.length;
    else if (event.key === back) next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus({ preventScroll: true });
    selectMenuCategory(tabs[next], true);
  });

  if (menuEntryObserver) {
    document.querySelectorAll("#speisekarte [data-menu-enter]").forEach((element) => menuEntryObserver.observe(element));
  }
  if (data?.categories.length) {
    document.getElementById("menuControls")?.removeAttribute("hidden");
    document.getElementById("menuStage")?.removeAttribute("hidden");
    renderTabs();
    renderActiveCategory();
    updateTabLayout();
    document.fonts?.ready.then(updateTabArrows);
  } else {
    document.getElementById("menuUnavailable")?.removeAttribute("hidden");
  }
  updateCartUI(false);

  menuSearchInput?.addEventListener("input", () => renderActiveCategory(!menuSearchInput.value.trim()));

  document.querySelectorAll("[data-jump-menu]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = document.getElementById(`menu-tab-${btn.dataset.jumpMenu}`);
      if (tab) selectMenuCategory(tab);
      document.getElementById("speisekarte")?.scrollIntoView();
    });
  });

  /* ------------------------------------------------------------------------
     7. ALLERGENE & LEGAL MODALS
     ------------------------------------------------------------------------ */
  const allergenModalBody = document.getElementById("allergenModalBody");
  if (allergenModalBody && data) {
    allergenModalBody.innerHTML = `
      <h4 class="allergen-section-title">Allergene</h4>
      <div class="allergen-grid">
        ${data.allergene.map((a) => `<div class="allergen-row"><span class="allergen-code">${escapeHtml(a.code)}</span><span>${escapeHtml(a.label)}</span></div>`).join("")}
      </div>
      <h4 class="allergen-section-title">Zusatzstoffe</h4>
      <div class="allergen-grid">
        ${data.zusatzstoffe.map((z) => `<div class="allergen-row"><span class="allergen-code">${escapeHtml(z.code)}</span><span>${escapeHtml(z.label)}</span></div>`).join("")}
      </div>
      <h4 class="allergen-section-title">Auswahl bei Gerichten</h4>
      <div class="allergen-grid">
        ${data.auswahl.map((o) => `<div class="allergen-row"><span class="allergen-code">${escapeHtml(o.code)}</span><span>${escapeHtml(o.label)}</span></div>`).join("")}
      </div>
      <p style="margin-top:1.4rem; font-size:0.86rem; color:var(--text-secondary);">
        Die Großbuchstaben in der Übersicht stehen für die Auswahlmöglichkeiten bei Gerichten. Hochgestellte Zahlen stehen für Allergene, hochgestellte Kleinbuchstaben für Zusatzstoffe. Bei Fragen hilft Ihnen unser Personal gern weiter.
      </p>
    `;
  }

  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-backdrop.is-open").forEach((m) => m.classList.remove("is-open"));
    if ((!lightbox || !lightbox.classList.contains("is-open")) && (!cartBackdrop || !cartBackdrop.classList.contains("is-open"))) {
      document.body.classList.remove("no-scroll");
    }
  }

  const openAllergenBtn = document.getElementById("openAllergenBtn");
  const openAllergenBtnFooter = document.getElementById("openAllergenBtnFooter");
  if (openAllergenBtn) openAllergenBtn.addEventListener("click", () => openModal("allergenModal"));
  if (openAllergenBtnFooter) openAllergenBtnFooter.addEventListener("click", () => openModal("allergenModal"));
  document.querySelectorAll("[data-open-modal]").forEach((btn) => btn.addEventListener("click", () => openModal(btn.getAttribute("data-open-modal"))));
  document.querySelectorAll("[data-close-modal]").forEach((btn) => btn.addEventListener("click", closeAllModals));
  document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.addEventListener("click", (e) => { if (e.target === bd) closeAllModals(); }));

  /* ------------------------------------------------------------------------
     8. GALERIE LIGHTBOX
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const galleryButtons = Array.from(document.querySelectorAll("[data-lightbox-src]"));
  let currentGalleryIdx = 0;

  function showLightboxImage(idx) {
    if (!galleryButtons.length || !lightboxImg) return;
    currentGalleryIdx = (idx + galleryButtons.length) % galleryButtons.length;
    const btn = galleryButtons[currentGalleryIdx];
    lightboxImg.src = btn.getAttribute("data-lightbox-src");
    lightboxImg.alt = btn.getAttribute("data-lightbox-caption") || "";
    if (lightboxCaption) lightboxCaption.textContent = btn.getAttribute("data-lightbox-caption") || "";
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIdx + 1} / ${galleryButtons.length}`;
  }

  function openLightbox(idx) {
    if (!lightbox) return;
    showLightboxImage(idx);
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  galleryButtons.forEach((btn, idx) => btn.addEventListener("click", () => openLightbox(idx)));
  const lbClose = document.getElementById("lightboxClose");
  const lbPrev = document.getElementById("lightboxPrev");
  const lbNext = document.getElementById("lightboxNext");
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", () => showLightboxImage(currentGalleryIdx - 1));
  if (lbNext) lbNext.addEventListener("click", () => showLightboxImage(currentGalleryIdx + 1));
  if (lightbox) lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", (e) => {
    if (lightbox && lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightboxImage(currentGalleryIdx - 1);
      if (e.key === "ArrowRight") showLightboxImage(currentGalleryIdx + 1);
      return;
    }
    if (e.key === "Tab" && cartBackdrop?.classList.contains("is-open")) {
      const controls = cartBackdrop.querySelectorAll(":is(button, input, select, textarea):not(:disabled)");
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;
      if (!cartBackdrop.contains(active) || active === (e.shiftKey ? first : last)) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    }
    if (e.key === "Escape") {
      closeCartDrawer();
      closeAllModals();
      setDrawerOpen(false, true);
    }
  });

  /* ------------------------------------------------------------------------
     9. KITCHEN VIDEO & DIRECTIONAL SCROLL REVEAL
     ------------------------------------------------------------------------ */
  const kitchenVideo = document.getElementById("kitchenVideo");
  const kitchenVideoToggle = document.getElementById("kitchenVideoToggle");
  let kitchenUserPaused = false;

  if (kitchenVideo) {
    if (!prefersReduced && "IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !kitchenUserPaused) {
              kitchenVideo.play().catch(() => {});
              if (kitchenVideoToggle) kitchenVideoToggle.textContent = "Pausieren";
            } else {
              kitchenVideo.pause();
            }
          });
        },
        { threshold: 0.35 }
      ).observe(kitchenVideo);
    }
    if (kitchenVideoToggle) {
      kitchenVideoToggle.addEventListener("click", () => {
        if (kitchenVideo.paused) {
          kitchenUserPaused = false;
          kitchenVideo.play().catch(() => {});
          kitchenVideoToggle.textContent = "Pausieren";
        } else {
          kitchenUserPaused = true;
          kitchenVideo.pause();
          kitchenVideoToggle.textContent = "Abspielen";
        }
      });
    }
  }

  /* Spotlight cursor glow + subtle magnetic CTA buttons */
  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".spotlight-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });

    document.querySelectorAll(".reservation-actions .btn--gold").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.14;
        btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${(dy - 2).toFixed(1)}px, 0)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* Animated Stat Counters */
  const statEls = document.querySelectorAll("[data-count-to]");
  if (statEls.length && "IntersectionObserver" in window && !prefersReduced) {
    const statObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.countTo, 10);
          if (isNaN(target)) return;
          const start = performance.now();
          const duration = 1150;
          function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    statEls.forEach((el) => statObs.observe(el));
  }

  const animatedEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .photo-anim");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 60px 0px" }
    );
    animatedEls.forEach((el) => observer.observe(el));
  } else {
    animatedEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
