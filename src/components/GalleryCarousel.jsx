import React from 'react';
import { heroImages, products } from '../data/products';

const GalleryCarousel = () => {
  // Collect all images from products and hero
  const allImages = [
    ...heroImages,
    ...products.flatMap(p => p.imagenes)
  ];

  return (
    <section className="gallery-carousel section-padding">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h2 className="section-title">Galería de Sabores</h2>
          <div className="ornament">
            <span className="ornament-icon">✦</span>
          </div>
        </div>
      </div>
      
      <div className="carousel-container">
        <div className="carousel-track">
          {/* Double the images to create seamless loop */}
          {[...allImages, ...allImages].map((img, idx) => (
            <div key={idx} className="carousel-item" style={{ filter: 'brightness(1.1) contrast(1.05)' }}>
              <img src={img} alt={`Kuchen artesanal ${idx}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
