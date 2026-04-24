const base = import.meta.env.BASE_URL;

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
      `${base}assets/frambuesa/1.png`,
      `${base}assets/frambuesa/2.png`,
      `${base}assets/frambuesa/3.png`,
      `${base}assets/frambuesa/4.png`,
      `${base}assets/frambuesa/5.png`
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
      `${base}assets/arandanos/1.png`,
      `${base}assets/arandanos/2.png`,
      `${base}assets/arandanos/3.png`,
      `${base}assets/arandanos/4.png`,
      `${base}assets/arandanos/5.png`
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
      `${base}assets/durazno/1.png`,
      `${base}assets/durazno/2.png`,
      `${base}assets/durazno/3.png`,
      `${base}assets/durazno/4.png`,
      `${base}assets/durazno/5.png`
    ]
  }
];

export const sizes = [
  { personas: 12, diametro: "26 cm", precio: 14900 },
  { personas: 18, diametro: "28 cm", precio: 18900 },
  { personas: 24, diametro: "32 cm", precio: 25000 }
];

export const heroImages = [
  `${base}assets/hero1.jpg`,
  `${base}assets/hero2.jpg`,
  `${base}assets/hero3.jpg`,
  `${base}assets/hero4.jpg`
];

export const WHATSAPP_NUMBER = "56989584196";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola! Me gustaría encargar un kuchen 🎂")}`;
