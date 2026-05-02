import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SizesAndPrices from './components/SizesAndPrices';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import OurStory from './components/OurStory';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { CartProvider } from './context/CartContext';
import ScrollReveal from './components/ScrollReveal';
import FloatingContact from './components/FloatingContact';
import './index.css';

const Home = () => (
  <main>
    <Hero />
    <ScrollReveal>
      <SizesAndPrices />
    </ScrollReveal>
    <ScrollReveal delay={0.1}>
      <OurStory />
    </ScrollReveal>
    <ScrollReveal delay={0.1}>
      <Testimonials />
    </ScrollReveal>
    <ScrollReveal delay={0.1}>
      <FAQ />
    </ScrollReveal>
  </main>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:flavorId" element={<ProductPage />} />
            <Route path="/producto" element={<ProductPage />} />
          </Routes>
          <Footer />
          <FloatingContact />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

