import React from 'react';
import { Link } from 'react-router-dom';
import { flavors } from '../data/flavors';
import ProductCarousel from './ProductCarousel';

const SizesAndPrices = () => {
  // Handle scrolling to the section when coming from another page with #productos
  React.useEffect(() => {
    if (window.location.hash === '#productos') {
      const element = document.getElementById('productos');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Wait for page transitions
      }
    }
  }, []);

  return (

    <section className="product-section" id="productos">
      <div className="product-header">
        <h2 className="product-title" style={{ fontSize: '4.5rem' }}>Nuestros Productos</h2>
        <div className="product-divider">
          <span className="product-divider-line"></span>
          <span className="product-divider-diamond">◆</span>
          <span className="product-divider-line"></span>
        </div>
        <p className="product-subtitle" style={{ fontSize: '3.5rem', marginTop: '10px' }}>
          Recetas tradicionales con ingredientes seleccionados del sur
        </p>
      </div>

      <div className="variants-grid">
        {flavors.map((flavor) => (
          <div key={flavor.id} className="variant-card">
            <div style={{ width: '100%', height: '350px', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
              {flavor.id === 'arandano' ? (
                <ProductCarousel 
                  images={flavor.images} 
                  alt={flavor.name} 
                  height="100%" 
                />
              ) : (
                <Link to={`/producto/${flavor.id}`} style={{ width: '100%', height: '100%', display: 'block' }}>
                  <img
                    className="product-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    src={flavor.img}
                    alt={flavor.name}
                    loading="lazy"
                  />
                </Link>
              )}
            </div>
            
            <div className="variant-label-wrapper" style={{ marginBottom: '5px', marginTop: '15px' }}>
              <p className="variant-label" style={{ fontSize: '2rem' }}>{flavor.name}</p>
            </div>

            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '25px' }}>
              Desde {flavor.startingPrice}
            </p>

            <Link to={`/producto/${flavor.id}`} className="btn-encargar" style={{ textDecoration: 'none', padding: '14px 28px', fontSize: '1.1rem' }}>

              Ver Opciones
              <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SizesAndPrices;

