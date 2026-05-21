// src/components/Navbar.jsx
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "../lib/brandIcons";
import { waLink } from "../lib/whatsapp";

export default function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="navbar">
        <a
          href="#inicio"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="navbar-logo-text">
            GSM<span>Fix</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#servicios" className="nav-link">
            Servicios
          </a>
          <a href="#nosotros" className="nav-link">
            Nosotros
          </a>
          <a href="#promos" className="nav-link">
            Promos
          </a>
          <a href="#preguntas" className="nav-link">
            FAQ
          </a>
          <a href="#contacto" className="nav-link">
            Contacto
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            WhatsApp
          </a>
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["servicios", "nosotros", "promos", "preguntas", "contacto"].map(
          (s) => (
            <a
              key={s}
              href={`#${s}`}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ textTransform: "capitalize" }}
            >
              {s}
            </a>
          ),
        )}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          onClick={() => setMenuOpen(false)}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
