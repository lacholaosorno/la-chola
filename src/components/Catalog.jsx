import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const CatalogCardImage = ({ product }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (product.imagenes.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % product.imagenes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product.imagenes]);

  return (
    <div className="product-card-img-wrapper slider-container">
      {product.imagenes.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={product.nombre}
          className={`product-card-img product-slider-img ${idx === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

const Catalog = () => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="kuchenes" className="catalogo section-padding">
      <div className="container">
        {/* Título */}
        <div className="text-center">
          <h2 className="section-title animate-slide">Nuestros Kuchenes</h2>
          <div className="ornament">
            <span className="ornament-icon">✦</span>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="catalogo-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card animate-slide"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/kuchen/${product.id}`)}
            >
              <CatalogCardImage product={product} />
              <div className="product-card-body">
                <h3 className="product-card-name">{product.nombre}</h3>
                <p className="product-card-desc">{product.descripcion}</p>
                <span className="product-card-price">
                  Desde {formatPrice(product.precio_base)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver todos" */}
        <div className="catalogo-btn-wrapper animate-slide" style={{ animationDelay: '0.4s' }}>
          <a href="#kuchenes" className="btn-ver-todos">
            Ver todos los kuchenes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
