export const flavors = [
  {
    id: 'frambuesa',
    name: 'Kuchen de Frambuesa',
    desc: 'Frambuesas frescas del sur sobre una base suave, con crumble dorado.',
    fullDesc: 'Frambuesas frescas del sur sobre una base suave, con crumble dorado hecho a mano. Auténtico kuchen alemán preparado con receta familiar.',
    img: '/kuchen-frambuesa.png',
    images: ['/kuchen-frambuesa.png'],
    startingPrice: '$14.900'
  },
  {
    id: 'arandano',
    name: 'Kuchen de Arándano',
    desc: 'Jugosos arándanos silvestres sobre masa artesanal y cubierta de crumble.',
    fullDesc: 'Jugosos arándanos silvestres sobre masa artesanal y nuestra clásica cubierta de crumble. Horneado diariamente con amor.',
    img: '/kuchen-arandano.png',
    images: [
      '/kuchen-arandano.png',
      '/kuchen-arandano-1.jpg',
      '/kuchen-arandano-2.jpg',
      '/kuchen-arandano-3.jpg',
      '/kuchen-arandano-4.jpg'
    ],
    startingPrice: '$14.900'
  },
  {
    id: 'manzana',
    name: 'Kuchen de Manzana',
    desc: 'Clásica receta alemana con manzanas horneadas y un toque de canela.',
    fullDesc: 'Clásica receta alemana con manzanas horneadas, un toque de canela y textura suave. El sabor de la tradición en tu mesa.',
    img: '/kuchen-manzana.png',
    images: ['/kuchen-manzana.png'],
    startingPrice: '$14.900'
  },
  {
    id: 'durazno',
    name: 'Kuchen de Durazno',
    desc: 'Dulces duraznos seleccionados sobre nuestra tradicional base artesanal.',
    fullDesc: 'Dulces duraznos seleccionados sobre nuestra tradicional base artesanal y crujiente. Una delicia fresca y suave.',
    img: '/kuchen-durazno.png',
    images: ['/kuchen-durazno.png'],
    startingPrice: '$14.900'
  },
  {
    id: 'frutilla',
    name: 'Kuchen de Frutilla',
    desc: 'Frutillas frescas de temporada con el balance perfecto de dulzor.',
    fullDesc: 'Frutillas frescas de temporada con el balance perfecto de dulzor y tradición alemana. Coronado con nuestro característico crumble.',
    img: '/kuchen-frutilla.png',
    images: ['/kuchen-frutilla.png'],
    startingPrice: '$14.900'
  }

];

export const getFlavorById = (id) => flavors.find(f => f.id === id) || flavors[0];
