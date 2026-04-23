import React from 'react';
import { WHATSAPP_URL } from '../data/products';

const Contact = () => {
  const socialLinks = [
    { nombre: "Instagram", icono: "fa-brands fa-instagram", color: "#E1306C", url: "#" },
    { nombre: "WhatsApp", icono: "fa-brands fa-whatsapp", color: "#25D366", url: WHATSAPP_URL },
    { nombre: "Facebook", icono: "fa-brands fa-facebook", color: "#1877F2", url: "#" },
    { nombre: "TikTok", icono: "fa-brands fa-tiktok", color: "#010101", url: "#" },
    { nombre: "Pinterest", icono: "fa-brands fa-pinterest", color: "#E60023", url: "#" }
  ];

  return (
    <footer id="contacto" className="footer">
      <div className="container">
        {/* Grid principal del footer */}
        <div className="footer-grid">
          {/* Columna 1: Logo y descripción */}
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/assets/logo.png" alt="La Chola - Pastelería Mapuche Alemana" />
            </div>
            <p className="footer-desc">
              Kuchenes artesanales hechos con tradición mapuche y alemana en el corazón del sur de Chile.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="footer-col">
            <h4>Enlaces</h4>
            <div className="footer-links">
              <a href="/">Inicio</a>
              <a href="#kuchenes">Kuchenes</a>
              <a href="#nosotros">Nosotros</a>
              <a href="#contacto">Contacto</a>
            </div>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer-col">
            <h4>Contáctanos</h4>
            <div className="footer-contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>+56 9 1234 5678</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>hola@lachola.cl</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>Temuco, Chile</span>
            </div>
          </div>

          {/* Columna 4: Redes sociales */}
          <div className="footer-col">
            <h4>Síguenos</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  style={{ backgroundColor: social.color }}
                  title={social.nombre}
                >
                  <i className={social.icono}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} La Chola Pastelería Mapuche Alemana. Todos los derechos reservados.</p>
          <p>Diseñado con ❤️ en Chile</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
