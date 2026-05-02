import React from 'react';

const OurStory = () => {
  return (
    <section className="story-section" id="nosotros">
      <div className="story-container">
        <div className="story-image-wrapper">
          <img 
            src="/hero-kuchen.png" 
            alt="Proceso Artesanal La Chola - Kuchen recién horneado" 
            className="story-image"
            loading="lazy"
          />
        </div>
        <div className="story-content">
          <h2 className="section-title">Nuestra Historia</h2>
          <div className="section-divider">
            <span className="divider-line"></span>
            <span className="divider-diamond">◆</span>
            <span className="divider-line"></span>
          </div>
          <h3 className="story-subtitle">Tradición sureña en cada bocado</h3>
          <p className="story-text">
            La Chola nació del amor por las recetas tradicionales del sur de Chile. 
            Nuestra misión es llevar a tu mesa el auténtico sabor del kuchen artesanal, 
            elaborado con el mismo cuidado y cariño que en casa.
          </p>
          <p className="story-text">
            Seleccionamos cuidadosamente cada ingrediente, desde la fruta fresca de temporada 
            hasta nuestra masa crujiente elaborada a mano cada mañana. No usamos conservantes, 
            solo ingredientes reales para un sabor inolvidable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
