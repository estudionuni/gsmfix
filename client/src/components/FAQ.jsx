// src/components/FAQ.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "../data/faqs";

export default function FAQ() {
  const [open, setOpen] = useState([]);
  return (
    <section id="preguntas" className="bg-[var(--bg)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" /> Preguntas frecuentes
        </div>
        <h2 className="mb-3 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          Las dudas más comunes
        </h2>
        <p className="mb-12 max-w-[500px] text-base leading-7 text-[var(--muted)]">
          Si no encontrás tu respuesta, escribinos por WhatsApp.
        </p>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)]">
              <button
                className="w-full px-6 py-5 text-left text-[var(--text)] font-semibold transition-colors duration-200 flex items-center justify-between gap-4 hover:text-[var(--green)]"
                onClick={() => {
                  setOpen(
                    open.includes(i)
                      ? open.filter((index) => index !== i)
                      : [...open, i],
                  );
                }}
              >
                {f.q}
                {open.includes(i) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {open.includes(i) && (
                <div className="px-6 pb-5 text-sm leading-7 text-[var(--muted)]">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
