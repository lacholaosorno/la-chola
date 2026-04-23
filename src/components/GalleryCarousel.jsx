import React from 'react';
import { allGalleryImages } from '../data/products';

const GalleryCarousel = () => {
  // Duplicate array to create a seamless infinite loop effect
  const doubledImages = [...allGalleryImages, ...allGalleryImages];

  return (
    <section className="gallery section-padding">
      <div className="container text-center">
        <h2 className="title-main gallery-title">
          Nuestras Creaciones
        </h2>
      </div>

      <div className="gallery-track-container">
        <div className="gallery-track">
          {doubledImages.map((imgUrl, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={imgUrl} 
                alt={`Galería kuchen ${index}`} 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
