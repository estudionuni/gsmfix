// src/components/Contact.jsx
import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "../lib/brandIcons";
import { waLink } from "../lib/whatsapp";

export default function Contact() {
  return (
    <section id="contacto">
      <div className="section-inner">
        <div className="section-tag">Contacto</div>
        <h2 className="section-title">Vení a vernos</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-row">
              <div className="contact-icon">
                <Icon d={icons.mapPin} size={20} />
              </div>
              <div>
                <div className="contact-label">Dirección</div>
                <div className="contact-value">
                  José Hernández 32, Luis Guillón
                  <br />
                  Esteban Echeverría, Buenos Aires
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">
                <Icon d={icons.clock} size={20} />
              </div>
              <div>
                <div className="contact-label">Horario</div>
                <div className="contact-value">
                  Lunes a Sábado · 10:00 a 20:00 hs
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon">
                <Icon d={icons.whatsapp} size={20} />
              </div>
              <div>
                <div className="contact-label">WhatsApp</div>
                <div className="contact-value">+54 9 11 5325-8828</div>
              </div>
            </div>
            <div className="social-links">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Icon d={icons.whatsapp} size={16} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/gsmfixok"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Icon d={icons.instagram} size={16} /> Instagram
              </a>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={waLink("Hola GSMFix! Quiero hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <WhatsAppIcon size={18} /> Escribirnos por WhatsApp
              </a>
            </div>
          </div>
          <div className="map-embed">
            <iframe
              title="GSMFix ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8!2d-58.4383!3d-34.8089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ4JzMyLjAiUyA1OMKwMjYnMTcuOSJX!5e0!3m2!1ses!2sar!4v1700000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
