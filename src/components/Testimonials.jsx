import React from 'react';
import { testimonials } from '../data/products';

const Testimonials = () => {
  return (
    <section className="testimonials section-padding">
      <div className="testimonials-bg"></div>
      
      <div className="container">
        <div className="text-center animate-slide">
          <h2 className="title-main">
            Lo que dicen nuestros clientes
          </h2>
          <div className="divider"></div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card animate-slide"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Fake Avatar Initials */}
              <div className="testimonial-avatar">
                {testimonial.nombre.charAt(0)}
              </div>
              
              <h3 className="testimonial-name">
                {testimonial.nombre}
              </h3>
              
              <div className="testimonial-stars">
                {[...Array(testimonial.estrellas)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>
              
              <p className="testimonial-text">
                "{testimonial.texto}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
