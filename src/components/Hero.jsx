import React, { useEffect, useState } from 'react';
import { flavors } from '../data/flavors';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Collect all images from all products
  const allProductImages = [
    '/hero-kuchen.png',
    ...flavors.flatMap(f => f.images)
  ].filter((value, index, self) => self.indexOf(value) === index); // Unique images

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Carousel interval: 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % allProductImages.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [allProductImages.length]);

  return (
    <section className="hero-section" id="inicio">
      {/* Lado izquierdo: texto */}
      <div 
        className="hero-text"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <h1 className="hero-title">
          Pastelería Artesanal
          <span className="hero-title-script">con alma del sur</span>
        </h1>

        {/* Ornamento decorativo */}
        <div className="hero-divider">
          <span className="hero-divider-line"></span>
          <span className="hero-divider-diamond">◆</span>
          <span className="hero-divider-line"></span>
        </div>

        <p className="hero-description">
          Tradición alemana, ingredientes del sur de Chile
          y mucho amor en cada preparación.
        </p>

        <a href="#productos" className="btn-primary">
          Ver Productos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      {/* Lado derecho: carrusel de imágenes */}
      <div className="hero-image-wrapper">
        <div 
          className="hero-carousel-container" 
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            overflow: 'hidden',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          {allProductImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Producto artesanal ${index + 1}`}
              className="hero-parallax"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 1.5s ease-in-out',
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0
              }}
            />
          ))}
          <div className="hero-carousel-overlay" style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {allProductImages.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === currentIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: index === currentIndex ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.4s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" style={{ opacity: 1 - scrollY / 300 }}>
        <div className="scroll-indicator-mouse">
          <div className="scroll-indicator-wheel"></div>
        </div>
        <span>Desliza</span>
      </div>
    </section>
  );
};

export default Hero;


