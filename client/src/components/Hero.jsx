// src/components/Hero.jsx
import { Shield } from "lucide-react";
import { WhatsAppIcon } from "../lib/brandIcons";
import { waLink } from "../lib/whatsapp";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">
          <Shield size={14} /> 10 años en Luis Guillón
        </div>
        <h1 className="hero-title">
          Tu equipo
          <br />
          <span className="accent">en buenas manos</span>
        </h1>
        <p className="hero-subtitle">
          Servicio técnico profesional para celulares, computadoras y consolas.
          Reparaciones rápidas, garantizadas y con atención personalizada.
        </p>
        <div className="hero-actions">
          <a
            href={waLink("Hola GSMFix! Quiero consultar sobre una reparación.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <WhatsAppIcon size={18} /> Consultar ahora
          </a>
          <a href="#servicios" className="btn-secondary">
            Ver servicios
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">10+</div>
            <div className="stat-label">Años de experiencia</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">Marcas atendidas</div>
          </div>
          <div className="stat">
            <div className="stat-num">★ 4.9</div>
            <div className="stat-label">En Google</div>
          </div>
        </div>
      </div>
    </section>
  );
}
