const renderFeaturedProducts = async () => {
    const container = document.querySelector("[data-featured-products]");
    if (!container) return;

    const products = await loadProducts();
    container.innerHTML = products
        .filter((product) => product.featured)
        .slice(0, 5)
        .map(productCardTemplate)
        .join("");
    
    window.dispatchEvent(new Event("la-chola:content-ready"));
};

const renderCatalog = async () => {
    const grid = document.querySelector("[data-products-grid]");
    if (!grid) return;

    const search = document.querySelector("[data-search]");
    const filters = document.querySelector("[data-filters]");
    const sort = document.querySelector("[data-sort]");
    const products = await loadProducts();
    const categories = ["Todos", ...new Set(products.map((product) => product.category))];
    let activeCategory = "Todos";

    filters.innerHTML = categories
        .map((category) => `<button type="button" class="${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`)
        .join("");

    const paint = () => {
        const term = search.value.trim().toLowerCase();
        const visible = products.filter((product) => {
            const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
            const matchesSearch = [product.name, product.shortDescription, product.category].join(" ").toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            if (sort?.value === "price-asc") return a.sizes[0].price - b.sizes[0].price;
            if (sort?.value === "price-desc") return b.sizes[0].price - a.sizes[0].price;
            return Number(b.featured) - Number(a.featured);
        });

        grid.innerHTML = visible.length
            ? visible.map(productCardTemplate).join("")
            : `<div class="empty-state">No encontramos productos con ese filtro.</div>`;
        window.dispatchEvent(new Event("la-chola:content-ready"));
    };

    filters.addEventListener("click", (event) => {
        const button = event.target.closest("[data-category]");
        if (!button) return;

        activeCategory = button.dataset.category;
        filters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
        paint();
    });

    search.addEventListener("input", paint);
    sort?.addEventListener("change", paint);
    grid.addEventListener("click", (event) => {
        const button = event.target.closest("[data-quick-add]");
        if (!button) return;
        const product = products.find((item) => item.id === button.dataset.quickAdd);
        if (!product) return;
        addDefaultProductToCart(product);
        button.textContent = "OK";
        setTimeout(() => {
            button.textContent = "+";
        }, 1200);
    });
    paint();
};

const renderProductDetail = async () => {
    const container = document.querySelector("[data-product-detail]");
    if (!container) return;

    const products = await loadProducts();
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const product = products.find((item) => String(item.id) === productId) || products[0];
    
    let selectedSize = product.sizes[0];
    let quantity = 1;

    document.title = `${product.name} | La Chola`;

    const paint = () => {
        container.innerHTML = `
            <section class="detail-media reveal">
                <img src="${product.image}" alt="${product.name}">
            </section>
            <section class="detail-info reveal">
                <p class="eyebrow">${product.category}</p>
                <h1>${product.name}</h1>
                <p class="description">${product.description}</p>
                <h3>Ingredientes</h3>
                <ul class="ingredient-list">
                    ${product.ingredients.map((ingredient) => `<li class="pill">${ingredient}</li>`).join("")}
                </ul>
                <h3>Tamanos</h3>
                <div class="size-options">
                    ${product.sizes.map((size) => `
                        <button class="size-option ${size.people === selectedSize.people ? "active" : ""}" type="button" data-people="${size.people}">
                            <strong>${size.people} personas</strong><br>
                            <span>${formatPrice(size.price)}</span>
                        </button>
                    `).join("")}
                </div>
                <p class="detail-price" data-detail-price>${formatPrice(selectedSize.price * quantity)}</p>
                <div class="detail-purchase">
                    <div class="quantity" aria-label="Selector de cantidad">
                        <button type="button" data-qty="-1" aria-label="Restar cantidad">−</button>
                        <span>${quantity}</span>
                        <button type="button" data-qty="1" aria-label="Sumar cantidad">+</button>
                    </div>
                    <button class="btn btn-primary" type="button" data-add-detail>Agregar al carrito</button>
                </div>
            </section>
        `;
        window.dispatchEvent(new Event("la-chola:content-ready"));
    };

    container.addEventListener("click", (event) => {
        const sizeButton = event.target.closest("[data-people]");
        const qtyButton = event.target.closest("[data-qty]");
        const addButton = event.target.closest("[data-add-detail]");

        if (sizeButton) {
            selectedSize = product.sizes.find((size) => size.people === Number(sizeButton.dataset.people));
            paint();
        }

        if (qtyButton) {
            quantity = Math.max(1, quantity + Number(qtyButton.dataset.qty));
            paint();
        }

        if (addButton) {
            window.openPrepModal(() => {
                addToCart(product, selectedSize, quantity);
                window.location.href = "carrito.html";
            });
        }
    });

    paint();
};

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("[data-featured-products]")) renderFeaturedProducts();
    if (document.querySelector("[data-products-grid]")) renderCatalog();
    if (document.querySelector("[data-product-detail]")) renderProductDetail();
});

document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-quick-add]");
    const featuredContainer = document.querySelector("[data-featured-products]");
    if (!button || !featuredContainer?.contains(button)) return;

    const products = await loadProducts();
    const product = products.find((item) => item.id === button.dataset.quickAdd);
    if (!product) return;

    addDefaultProductToCart(product);
    button.textContent = "OK";
    setTimeout(() => {
        button.textContent = "+";
    }, 1200);
});
