import React from 'react';

const Testimonials = () => {
  const reviews = [
    { text: "Muy rico el kuchen, totalmente recomendado.", author: "Carolina M." },
    { text: "Excelente calidad y sabor, repetiría sin duda.", author: "Andrés R." },
    { text: "Se nota que es artesanal, muy bueno.", author: "Mónica S." }
  ];

  return (
    <section className="testimonials section-padding">
      <div className="container">
        <div className="text-center" style={{ marginBottom: '50px' }}>
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="ornament">
            <span className="ornament-icon">✦</span>
          </div>
        </div>
        
        <div className="testimonials-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="testimonial-card animate-slide" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{review.text}"</p>
              <p className="testimonial-author">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
