import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { WHATSAPP_URL } from '../data/products';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = "¡Hola! Quiero hacer un pedido:\n\n";
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.size} porciones) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total:* ${formatPrice(cartTotal)}\n\n`;
    message += "¿Me confirmas si tienes disponibilidad?";
    
    // We replace the message param from the WHATSAPP_URL logic
    // Usually WHATSAPP_URL is https://wa.me/569... but we just use it as base.
    // Let's hardcode the number from WHATSAPP_URL or parse it.
    // The previous code had WHATSAPP_URL = "https://wa.me/56912345678" or similar.
    const baseUrl = WHATSAPP_URL.split('?')[0]; 
    const whatsappUrl = `${baseUrl}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <>
      {isOpen && <div className="cart-backdrop" onClick={onClose} />}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Mi Pedido</h2>
          <button onClick={onClose} className="cart-close">
            <X size={28} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <p>Tu carrito está vacío</p>
              <button className="btn-minimal" onClick={onClose}>Ver productos</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-size">{item.size} porciones</p>
                  <p className="cart-item-price">{formatPrice(item.price)} c/u</p>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus size={16}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={16}/></button>
                    </div>
                    <button className="btn-remove" onClick={() => removeFromCart(item.id, item.size)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <button className="btn-whatsapp w-full" onClick={handleCheckout}>
              Confirmar y comprar
            </button>
            <button className="btn-minimal w-full" onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
