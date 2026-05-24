const CART_KEY = "la-chola-cart";
const WHATSAPP_NUMBER = "56912345678";

const formatPrice = (value) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(value);

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");

const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
};

const updateCartCount = () => {
    const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((element) => {
        element.textContent = total;
    });
};

const addToCart = (product, size, quantity) => {
    const cart = getCart();
    const key = `${product.id}-${size.people}`;
    const existing = cart.find((item) => item.key === key);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            key,
            id: product.id,
            name: product.name,
            image: product.image,
            sizePeople: size.people,
            price: size.price,
            quantity,
        });
    }

    saveCart(cart);
};

const addDefaultProductToCart = (product) => {
    addToCart(product, product.sizes[0], 1);
};

const loadProducts = async () => {
    try {
        const response = await fetch("data/productos.json");
        if (!response.ok) throw new Error("No se pudo cargar productos.json");
        return await response.json();
    } catch (error) {
        console.warn(error);
        return window.LA_CHOLA_PRODUCTS || [];
    }
};

const productCardTemplate = (product) => `
    <article class="product-card reveal">
        <a href="producto.html?id=${product.id}" aria-label="Ver ${product.name}">
            <img loading="lazy" src="${product.image}" alt="${product.name}">
        </a>
        <div class="product-card-body">
            <h3>${product.name}</h3>
            <p>${product.shortDescription}</p>
            <div class="product-meta">
                <span class="price">${formatPrice(product.sizes[0].price)}</span>
                <div class="card-actions">
                    <button class="quick-add" type="button" data-quick-add="${product.id}" aria-label="Agregar ${product.name} al carrito">+</button>
                    <a class="favorite-link" href="producto.html?id=${product.id}" aria-label="Elegir ${product.name}">♡</a>
                </div>
            </div>
        </div>
    </article>
`;

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const navToggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    navToggle?.addEventListener("click", () => {
        const isOpen = nav?.classList.toggle("open");
        document.body.classList.toggle("menu-open", Boolean(isOpen));
        navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });

    document.querySelectorAll(".main-nav a").forEach((link) => {
        if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
            link.classList.add("active");
        }
    });

    document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const message = encodeURIComponent(
            `Hola La Chola, soy ${data.get("nombre") || ""}.\n${data.get("mensaje") || "Quiero hacer una consulta."}\nEmail: ${data.get("email") || ""}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener");
    });
});
