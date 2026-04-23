export const products = [
  {
    id: "frambuesa",
    nombre: "Kuchen de Frambuesa",
    precio_base: 14900,
    descripcion: "Delicioso kuchen con frambuesas frescas y un crumble dorado.",
    porciones: [
      { cantidad: 12, precio: 14900 },
      { cantidad: 18, precio: 18900 },
      { cantidad: 24, precio: 25000 }
    ],
    imagenes: [
      "/assets/frambuesa/1.jpg",
      "/assets/frambuesa/2.jpg",
      "/assets/frambuesa/3.jpg",
      "/assets/frambuesa/4.jpg",
      "/assets/frambuesa/5.jpg"
    ]
  },
  {
    id: "arandano",
    nombre: "Kuchen de Arándanos",
    precio_base: 14900,
    descripcion: "Suave, jugoso y lleno de arándanos naturales del sur.",
    porciones: [
      { cantidad: 12, precio: 14900 },
      { cantidad: 18, precio: 18900 },
      { cantidad: 24, precio: 25000 }
    ],
    imagenes: [
      "/assets/arandanos/1.jpg",
      "/assets/arandanos/2.jpg",
      "/assets/arandanos/3.jpg",
      "/assets/arandanos/4.jpg",
      "/assets/arandanos/5.jpg"
    ]
  },
  {
    id: "durazno",
    nombre: "Kuchen de Durazno",
    precio_base: 14900,
    descripcion: "Trozos de durazno jugoso con un crujiente crumble artesanal.",
    porciones: [
      { cantidad: 12, precio: 14900 },
      { cantidad: 18, precio: 18900 },
      { cantidad: 24, precio: 25000 }
    ],
    imagenes: [
      "/assets/durazno/1.png",
      "/assets/durazno/2.png",
      "/assets/durazno/3.jpg",
      "/assets/durazno/4.jpg",
      "/assets/durazno/5.jpg"
    ]
  }
];

export const sizes = [
  { personas: 12, diametro: "26 cm", precio: 14900 },
  { personas: 18, diametro: "28 cm", precio: 18900 },
  { personas: 24, diametro: "32 cm", precio: 25000 }
];

export const heroImages = [
  "/assets/hero1.jpg",
  "/assets/hero2.jpg",
  "/assets/hero3.jpg",
  "/assets/hero4.jpg"
];

export const WHATSAPP_NUMBER = "56989584196";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Me gustaría encargar un kuchen 🎂")}`;
