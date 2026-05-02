import React, { useState } from 'react';

const faqs = [
  {
    question: "¿Con cuánta anticipación debo hacer mi pedido?",
    answer: "Para asegurar la frescura de nuestros productos, te recomendamos realizar tu pedido con al menos 24 horas de anticipación."
  },
  {
    question: "¿Tienen opciones sin azúcar o sin gluten?",
    answer: "Por el momento, mantenemos la receta tradicional. Sin embargo, estamos trabajando para pronto ofrecer opciones que se adapten a más requerimientos dietéticos."
  },
  {
    question: "¿Cuánto dura un producto de La Chola?",
    answer: "Nuestros productos no contienen preservantes. Te sugerimos consumirlos dentro de los primeros 3 a 4 días, manteniéndolos refrigerados para conservar su frescura óptima."
  },
  {
    question: "¿Cuáles son los métodos de pago?",
    answer: "Para asegurar la reserva de tu producto, solicitamos el pago del 100% mediante transferencia bancaria. Todo el proceso se coordina de manera personalizada a través de nuestro WhatsApp."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-header">
        <h2 className="section-title">Preguntas Frecuentes</h2>
        <div className="section-divider">
          <span className="divider-line"></span>
          <span className="divider-diamond">◆</span>
          <span className="divider-line"></span>
        </div>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question-container">
              <h3 className="faq-question">{faq.question}</h3>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer-container">
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
