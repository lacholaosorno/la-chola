import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (product && product.imagenes.length > 1) {
      const interval = setInterval(() => {
        setCurrentImgIndex(prev => (prev + 1) % product.imagenes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product]);

  if (!product) {
    return (
      <div style={{ paddingTop: '120px', textAlign: 'center', height: '100vh' }}>
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn-ver-todos" style={{ marginTop: '20px', display: 'inline-block' }}>
          Volver al inicio
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const [selectedPorcion, setSelectedPorcion] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    if (!selectedPorcion) return;
    addToCart(product, selectedPorcion, 1);
    setShowConfirm(false);
  };

  const handleBuyNow = () => {
    if (!selectedPorcion) return;
    addToCart(product, selectedPorcion, 1);
    setShowConfirm(false);
    setIsCartOpen(true);
  };

  const openConfirm = (porcion) => {
    setSelectedPorcion(porcion);
    setShowConfirm(true);
  };

  return (
    <div className="product-detail-page">
      {/* Modal de Confirmación */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade">
            <button className="modal-close" onClick={() => setShowConfirm(false)}>×</button>
            <h3 className="modal-title">Confirmar Pedido</h3>
            <div className="modal-details">
              <p>Has seleccionado:</p>
              <div className="selected-item">
                <strong>{product.nombre}</strong>
                <span>{selectedPorcion.cantidad} porciones</span>
                <span className="selected-price">{formatPrice(selectedPorcion.precio)}</span>
              </div>
            </div>
            <p className="modal-note">Elige qué deseas hacer con tu producto:</p>
            <div className="modal-actions">
              <button className="btn-whatsapp" onClick={handleBuyNow} style={{ width: '100%' }}>
                <WhatsAppIcon size={22} />
                Confirmar y comprar
              </button>
              <button className="btn-minimal" onClick={handleAddToCart} style={{ border: '1px solid var(--dorado)', width: '100%', textDecoration: 'none' }}>
                Agregar al carrito
              </button>
              <button className="btn-minimal" onClick={() => setShowConfirm(false)}>
                Seguir viendo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="product-hero">
        <div className="product-hero-bg">
          <img 
            src={product.imagenes[0]} 
            alt={product.nombre} 
            style={{ filter: 'blur(20px) brightness(0.4)', scale: '1.1' }}
          />
          <div className="product-hero-overlay"></div>
        </div>

        <div className="container product-hero-content">
          <div className="product-hero-text animate-slide">
            <Link to="/" className="detail-back-link">← Volver al inicio</Link>
            <h1 className="hero-title">{product.nombre}</h1>
            <p className="product-hero-price">Desde {formatPrice(product.precio_base)}</p>
          </div>
          <div className="product-hero-image animate-fade">
            <div className="slider-container">
              {product.imagenes.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={product.nombre} 
                  className={`product-slider-img ${idx === currentImgIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detalle del producto */}
      <section className="product-detail-info section-padding">
        <div className="container">
          <div className="detail-split">
            <div className="detail-image-col animate-slide">
              <img 
                src={product.imagenes[0]} 
                alt={product.nombre} 
                className="detail-img-square"
              />
            </div>
            <div className="detail-text-col animate-slide" style={{ animationDelay: '0.2s' }}>
              <h2 className="detail-title">{product.nombre}</h2>
              <p className="detail-price">Desde {formatPrice(product.precio_base)}</p>
              <p className="detail-portions">
                Disponible en {product.porciones.map(p => `${p.cantidad} porciones`).join(' · ')}
              </p>
              <p className="detail-desc">{product.descripcion}</p>

              {/* Tabla de precios interactiva */}
              <div className="detail-price-table">
                <p className="table-instruction">Selecciona un tamaño para encargar:</p>
                {product.porciones.map((porcion, index) => (
                  <div 
                    key={index} 
                    className="price-row clickable" 
                    onClick={() => openConfirm(porcion)}
                  >
                    <span className="price-row-label">{porcion.cantidad} porciones</span>
                    <span className="price-row-value">{formatPrice(porcion.precio)}</span>
                    <span className="price-row-action">Encargar →</span>
                  </div>
                ))}
              </div>

              <div className="detail-info-footer">
                <p>Hecho a mano con ingredientes naturales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default ProductDetail;
