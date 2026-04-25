import React from 'react';
import Hero from '../components/Hero';
import Catalog from '../components/Catalog';
import SizesAndPrices from '../components/SizesAndPrices';
import AboutSection from '../components/AboutSection';
import GalleryCarousel from '../components/GalleryCarousel';
import Testimonials from '../components/Testimonials';

const Landing = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <SizesAndPrices />
      <AboutSection />
      <Testimonials />
      <GalleryCarousel />
    </>
  );
};

export default Landing;
