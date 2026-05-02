import React from 'react';

const testimonials = [
  { id: 1, name: "María José T.", text: "Simplemente el mejor kuchen que he probado. La masa es crujiente y la fruta súper fresca.", role: "Clienta Frecuente" },
  { id: 2, name: "Felipe R.", text: "Compré el de arándanos para un cumpleaños y fue un éxito. La presentación es impecable.", role: "Cliente Nuevo" },
  { id: 3, name: "Carolina S.", text: "Excelente servicio y puntualidad. El kuchen de frambuesa es perfecto.", role: "Clienta Frecuente" },
  { id: 4, name: "Claudia M.", text: "Los mejores kuchenes de Osorno, sin duda alguna. Recomendados 100%.", role: "Clienta Frecuente" },
  { id: 5, name: "Ricardo H.", text: "La masa es perfecta, me recuerda mucho a los kuchenes que hacía mi abuela.", role: "Cliente" },
  { id: 6, name: "Sofía G.", text: "El de frambuesa es de otro planeta. El equilibrio de sabor es increíble.", role: "Clienta" },
  { id: 7, name: "Marcelo P.", text: "Excelente atención, el pedido llegó justo a tiempo para nuestra reunión.", role: "Cliente" },
  { id: 8, name: "Valentina S.", text: "La calidad de los ingredientes se nota en cada bocado. Muy frescos.", role: "Clienta Frecuente" },
  { id: 9, name: "Javier L.", text: "Un sabor artesanal que ya casi no se encuentra. Realmente auténtico.", role: "Cliente" },
  { id: 10, name: "Antonia B.", text: "El crumble es crujiente y delicioso. El mejor acompañamiento para el té.", role: "Clienta" },
  { id: 11, name: "Gabriel V.", text: "Recomendado para cualquier ocasión especial. Siempre quedas bien.", role: "Cliente Nuevo" },
  { id: 12, name: "Paula C.", text: "Mis hijos aman el de manzana. Es suave, dulce y muy aromático.", role: "Clienta" },
  { id: 13, name: "Andrés R.", text: "El equilibrio justo de dulzor. No empalaga y se siente la fruta natural.", role: "Cliente" },
  { id: 14, name: "Camila F.", text: "Increíble presentación, da gusto recibir un producto tan bien cuidado.", role: "Clienta" },
  { id: 15, name: "Ignacio T.", text: "El kuchen de arándanos es mi favorito personal. Simplemente espectacular.", role: "Cliente" },
  { id: 16, name: "Fernanda K.", text: "Un pedacito del sur en cada bocado. Me transporta a mis vacaciones.", role: "Clienta" },
  { id: 17, name: "Bruno M.", text: "Tradición alemana de verdad. Se nota el respeto por las recetas originales.", role: "Cliente" },
  { id: 18, name: "Elena D.", text: "Súper frescos y aromáticos. Desde que abres la caja ya se siente el aroma.", role: "Clienta" },
  { id: 19, name: "Matías O.", text: "El servicio por WhatsApp es muy rápido y amable. Todo muy fácil.", role: "Cliente" },
  { id: 20, name: "Daniela A.", text: "Vale cada peso, calidad superior comparado con cualquier otro.", role: "Clienta Frecuente" }
];

const Testimonials = () => {
  // Duplicamos la lista para un scroll infinito sin saltos
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <div className="section-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      <div className="testimonials-carousel-container">
        <div className="testimonials-track">
          {allTestimonials.map((t, index) => (
            <div key={`${t.id}-${index}`} className="testimonial-card">
              <div className="testimonial-quote-icon">"</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <span className="author-name">{t.name}</span>
                <span className="author-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
