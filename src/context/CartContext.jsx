import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('laCholaCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('laCholaCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => 
        item.flavor === product.flavor && item.size === product.size
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.flavor === product.flavor && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (flavor, size) => {
    setCart((prevCart) => prevCart.filter(item => !(item.flavor === flavor && item.size === size)));
  };

  const updateQuantity = (flavor, size, delta) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.flavor === flavor && item.size === size) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => {
    const price = parseInt(item.price.replace('$', '').replace('.', ''));
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};
