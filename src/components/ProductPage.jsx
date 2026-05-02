import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getFlavorById } from '../data/flavors';
import ProductCarousel from './ProductCarousel';

const ProductPage = () => {
  const { flavorId } = useParams();
  const flavor = getFlavorById(flavorId);
  const [showModal, setShowModal] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Scroll to top when loading the product page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [flavorId]);

  const handleAddToCart = (variant) => {
    addToCart({
      flavor: flavorId,
      name: flavor.name,
      size: variant.label,
      price: variant.price
    });
    setLastAdded(variant);
    setShowModal(true);
  };

  const handleFinishPurchase = () => {
    const WHATSAPP_NUMBER = '56989584196';
    const message = `Hola! Me gustaría encargar un ${flavor.name} de ${lastAdded.label} (${lastAdded.price}). ¿Está disponible?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setShowModal(false);
  };

  const goToProducts = () => {
    setShowModal(false);
    navigate('/#productos');
  };



  return (
    <div className="product-page" style={{ padding: '60px 40px', maxWidth: '1280px', margin: '0 auto', minHeight: '60vh' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '30px', color: 'var(--text-medium)', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
        ← Volver al inicio
      </Link>
      
      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Lado izquierdo: Imagen / Carousel */}
        <div style={{ flex: '1 1 400px' }}>
          {flavor.images && flavor.images.length > 1 ? (
            <ProductCarousel 
              images={flavor.images} 
              alt={flavor.name} 
              height="500px" 
            />
          ) : (
            <img 
              src={flavor.img} 
              alt={`Imagen de ${flavor.name}`} 
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 8px 25px rgba(62, 39, 35, 0.15)', objectFit: 'cover', height: '500px' }} 
              loading="lazy"
            />
          )}
        </div>
        
        {/* Lado derecho: Información del Producto */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '10px' }}>
            {flavor.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.8rem', color: 'var(--text-medium)', marginBottom: '30px', lineHeight: '1.6' }}>
            {flavor.fullDesc}
          </p>
          
          <h3 style={{ fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            Opciones y Tamaños
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { label: '12 Porciones', price: '$14.900' },
              { label: '18 Porciones', price: '$18.900' },
              { label: '24 Porciones', price: '$25.000' },
              { label: '30 Porciones', price: '$29.900', note: '(Por Encargo)' }
            ].map((variant, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--white)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'} onClick={() => handleAddToCart(variant)}>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 'bold', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
                    {variant.label} {variant.note && <span style={{fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 'normal'}}>{variant.note}</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.5rem', marginTop: '5px' }}>
                    {variant.price}
                  </div>
                </div>
                <button className="btn-encargar" style={{ margin: 0, width: 'auto', padding: '10px 24px', fontSize: '0.8rem' }}>
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item Added Confirmation Modal */}
      {showModal && lastAdded && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <h2 className="modal-title">¡Excelente elección!</h2>
            <p className="modal-summary">
              Has agregado un <strong>{flavor.name}</strong> para <strong>{lastAdded.label}</strong> a tu pedido.
            </p>
            
            <div className="modal-actions">
              <button className="btn-modal-finish" onClick={handleFinishPurchase}>
                Finalizar Compra vía WhatsApp
              </button>
              
              <button className="btn-modal-continue" style={{ padding: '12px', border: '1px solid var(--border)' }} onClick={goToProducts}>
                Seguir Comprando
              </button>

              <button className="btn-modal-continue" style={{ padding: '12px', border: '1px solid var(--border)' }} onClick={goToProducts}>
                Ver más sabores
              </button>
            </div>

            <p style={{ marginTop: '25px', fontSize: '0.95rem', color: 'var(--text-light)', fontFamily: 'var(--font-ui)', fontStyle: 'italic' }}>
              Puedes revisar tu pedido completo en el carrito arriba.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

