import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  // Trigger bounce animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  const handleNavClick = (e, targetId) => {
    if (e) e.preventDefault();
    closeMenu();

    if (location.pathname !== '/') {
      navigate('/' + targetId);
    } else {
      if (targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(targetId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  };

  const handleCheckout = () => {
    const WHATSAPP_NUMBER = '56989584196';
    let message = "¡Hola! Me gustaría realizar el siguiente pedido en La Chola:\n\n";
    
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.name} (${item.size}) - ${item.price} c/u\n`;
    });
    
    message += `\n*Total: ${formatPrice(cartTotal)}*\n\n¿Me podrían confirmar disponibilidad y los datos para la transferencia?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setIsCartOpen(false);
    // Opcional: clearCart(); // El usuario puede querer limpiar el carro después de enviar
  };

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" onClick={(e) => handleNavClick(e, '#top')}>
            <img src="/logo-transparent.png" alt="La Chola - Pastelería Mapuche Alemana" />
          </Link>

          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="#top" onClick={(e) => handleNavClick(e, '#top')}>Inicio</a></li>
            <li><a href="#productos" onClick={(e) => handleNavClick(e, '#productos')}>Productos</a></li>
            <li><a href="#nosotros" onClick={(e) => handleNavClick(e, '#nosotros')}>Nosotros</a></li>
            <li><a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')}>Contacto</a></li>
          </ul>

          <div className="nav-actions">
            <button className={`nav-cart-btn ${animateCart ? 'bounce' : ''}`} onClick={toggleCart} aria-label="Abrir carrito">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Abrir menú">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={toggleCart}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Tu Pedido</h3>
              <button className="close-cart" onClick={toggleCart}>&times;</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>Aún no has añadido productos.</p>
                  <button className="btn-continue" onClick={toggleCart}>Empezar a comprar</button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.flavor}-${item.size}`} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span>{item.size} — {item.price}</span>
                    </div>
                    <div className="item-controls">
                      <div className="quantity-selector">
                        <button onClick={() => updateQuantity(item.flavor, item.size, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.flavor, item.size, 1)}>+</button>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.flavor, item.size)}>Eliminar</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <button className="btn-checkout" onClick={handleCheckout}>
                  Finalizar Pedido vía WhatsApp
                </button>
                <button className="btn-keep-shopping" onClick={toggleCart}>
                  Seguir vitrineando
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
