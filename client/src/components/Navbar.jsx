// src/components/Navbar.jsx
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "../lib/brandIcons";
import { waLink } from "../lib/whatsapp";

const navLinkClass =
  "text-[var(--muted)] uppercase tracking-[0.05em] text-sm font-semibold transition-colors duration-200 hover:text-[var(--green)]";
const navCtaClass =
  "inline-flex items-center gap-2 rounded-[0.375rem] bg-[var(--green)] px-5 py-2.5 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)]";

export default function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[rgba(10,10,10,0.92)] px-6 backdrop-blur-xl">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-[var(--font-display)] text-[1.5rem] font-black text-[var(--text)] tracking-[0.02em]">
            GSM<span className="text-[var(--green)]">Fix</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <a href="#servicios" className={navLinkClass}>
            Servicios
          </a>
          <a href="#nosotros" className={navLinkClass}>
            Nosotros
          </a>
          <a href="#promos" className={navLinkClass}>
            Promos
          </a>
          <a href="#preguntas" className={navLinkClass}>
            FAQ
          </a>
          <a href="#contacto" className={navLinkClass}>
            Contacto
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={navCtaClass}
          >
            WhatsApp
          </a>
        </div>

        <button
          className="md:hidden text-[var(--text)] p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`fixed inset-x-0 top-16 z-40 flex-col gap-5 border-b border-[var(--border)] bg-[rgba(10,10,10,0.98)] px-6 py-6 transition-all duration-200 ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        {['servicios', 'nosotros', 'promos', 'preguntas', 'contacto'].map(
          (s) => (
            <a
              key={s}
              href={`#${s}`}
              className={`${navLinkClass} capitalize`}
              onClick={() => setMenuOpen(false)}
            >
              {s}
            </a>
          ),
        )}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={navCtaClass}
          onClick={() => setMenuOpen(false)}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
