import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('lachola_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lachola_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, sizeObj, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === sizeObj.cantidad
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.nombre,
            size: sizeObj.cantidad,
            price: sizeObj.precio,
            quantity,
            image: product.imagenes[0],
          },
        ];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
