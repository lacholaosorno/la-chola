import React from 'react';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import SizesAndPrices from '../components/SizesAndPrices';
import AboutSection from '../components/AboutSection';

const Landing = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <SizesAndPrices />
      <AboutSection />
    </>
  );
};

export default Landing;
