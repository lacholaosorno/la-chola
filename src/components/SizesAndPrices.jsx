import React from 'react';
import { Cake } from 'lucide-react';
import { sizes } from '../data/products';

const SizesAndPrices = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="precios section-padding">
      {/* Fondo decorativo */}
      <div className="precios-bg">
        <img src={`${import.meta.env.BASE_URL}assets/hero1.jpg`} alt="" />
      </div>
      <div className="container">
        {/* Título */}
        <div className="text-center">
          <h2 className="section-title animate-slide">Tamaños y Precios</h2>
          <div className="ornament">
            <span className="ornament-icon">✦</span>
          </div>
        </div>

        {/* Grid de precios */}
        <div className="precios-grid">
          {sizes.map((size, index) => (
            <div
              key={size.personas}
              className="precio-card animate-slide"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="precio-card-icon">
                <Cake size={48} strokeWidth={1.5} color="var(--dorado)" />
              </div>
              <h3 className="precio-card-personas">{size.personas} Personas</h3>
              <p className="precio-card-diametro">Diámetro aprox. {size.diametro}</p>
              <p className="precio-card-valor">{formatPrice(size.precio)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SizesAndPrices;
