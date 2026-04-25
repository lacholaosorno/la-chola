import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="kuchen/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
