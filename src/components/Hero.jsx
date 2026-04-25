import React, { useState, useEffect } from 'react';
import { heroImages } from '../data/products';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Imágenes de fondo con transición */}
      {heroImages.map((imgUrl, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={imgUrl} alt={`La Chola - Kuchen artesanal ${index + 1}`} />
        </div>
      ))}

      {/* Overlay oscuro */}
      <div className="hero-overlay"></div>

      {/* Contenido */}
      <div className="hero-content">
        <h1 className="hero-title animate-fade">
          Kuchenes artesanales<br />con alma del sur
        </h1>
        <a href="#kuchenes" className="hero-btn animate-slide">
          Ver Kuchenes
        </a>
      </div>

      {/* Indicadores (dots) */}
      <div className="hero-dots">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
