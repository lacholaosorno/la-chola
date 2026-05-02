import React, { useState, useEffect } from 'react';

const ProductCarousel = ({ images, alt, height = '100%' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4 seconds as requested

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="product-carousel" 
      style={{ 
        width: '100%', 
        height: height, 
        position: 'relative', 
        overflow: 'hidden', 
        cursor: 'pointer',
        borderRadius: '8px'
      }}
      onClick={handleNext}
    >
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`${alt} - ${index + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.8s ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0
          }}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      
      {images.length > 1 && (
        <>
          <div className="carousel-overlay" />
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2
          }}>
            {images.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;

