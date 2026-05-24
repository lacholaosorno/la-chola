const renderCart = () => {
    const itemsContainer = document.querySelector("[data-cart-items]");
    const summary = document.querySelector("[data-cart-summary]");
    if (!itemsContainer || !summary) return;

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!cart.length) {
        itemsContainer.innerHTML = `<div class="empty-state">Tu carrito esta vacio. Elige un producto para comenzar.</div>`;
        summary.innerHTML = `
            <h2>Resumen</h2>
            <p>No hay productos agregados.</p>
            <a class="btn btn-primary" href="productos.html">Ver productos</a>
        `;
        return;
    }

    itemsContainer.innerHTML = cart.map((item) => `
        <article class="cart-item reveal">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>${item.sizePeople} personas · ${formatPrice(item.price)} c/u</p>
            </div>
            <div class="cart-actions">
                <div class="quantity">
                    <button type="button" data-change="${item.key}" data-delta="-1" aria-label="Restar">−</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-change="${item.key}" data-delta="1" aria-label="Sumar">+</button>
                </div>
                <button class="remove-item" type="button" data-remove="${item.key}">Quitar</button>
            </div>
        </article>
    `).join("");

    const message = encodeURIComponent(
        `Hola La Chola, quiero hacer este pedido:\n${cart
            .map((item) => `- ${item.quantity} x ${item.name} (${item.sizePeople} personas): ${formatPrice(item.price * item.quantity)}`)
            .join("\n")}\nTotal: ${formatPrice(subtotal)}`
    );

    summary.innerHTML = `
        <h2>Resumen</h2>
        <div class="summary-row"><span>Productos</span><strong>${cart.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
        <div class="summary-row"><span>Preparacion</span><strong>12 horas</strong></div>
        <div class="summary-row summary-total"><span>Total</span><span>${formatPrice(subtotal)}</span></div>
        <a class="btn btn-primary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${message}" target="_blank" rel="noopener">Enviar pedido</a>
        <button class="btn btn-soft" type="button" data-clear-cart>Vaciar carrito</button>
    `;

    window.dispatchEvent(new Event("la-chola:content-ready"));
};

document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    document.addEventListener("click", (event) => {
        const changeButton = event.target.closest("[data-change]");
        const removeButton = event.target.closest("[data-remove]");
        const clearButton = event.target.closest("[data-clear-cart]");
        let cart = getCart();

        if (changeButton) {
            cart = cart
                .map((item) => item.key === changeButton.dataset.change
                    ? { ...item, quantity: item.quantity + Number(changeButton.dataset.delta) }
                    : item)
                .filter((item) => item.quantity > 0);
            saveCart(cart);
            renderCart();
        }

        if (removeButton) {
            saveCart(cart.filter((item) => item.key !== removeButton.dataset.remove));
            renderCart();
        }

        if (clearButton) {
            saveCart([]);
            renderCart();
        }
    });
});
