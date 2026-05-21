// src/components/FAQ.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [open, setOpen] = useState([]);
  return (
    <section id="preguntas">
      <div className="section-inner">
        <div className="section-tag">Preguntas frecuentes</div>
        <h2 className="section-title">Las dudas más comunes</h2>
        <p className="section-sub">
          Si no encontrás tu respuesta, escribinos por WhatsApp.
        </p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-q"
                onClick={() => {
                  setOpen(
                    open.includes(i)
                      ? open.filter((index) => index !== i) // Si ya estaba abierto, lo saca del array
                      : [...open, i], // Si estaba cerrado, lo agrega al array
                  );
                }}
              >
                {f.q}
                {open.includes(i) ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {open.includes(i) && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
