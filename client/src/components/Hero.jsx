// src/components/Hero.jsx
import { Shield } from "lucide-react";
import { WhatsAppIcon } from "../lib/brandIcons";
import { waLink } from "../lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden pt-20 pb-16 px-6 text-center"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 60%), var(--bg)",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--green) 1px, transparent 1px), linear-gradient(90deg, var(--green) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-green)] bg-[rgba(34,197,94,0.1)] px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[var(--green)]">
          <Shield size={14} /> 10 años en Luis Guillón
        </div>

        <h1 className="font-[var(--font-display)] text-[clamp(3rem,10vw,6.5rem)] font-black leading-[0.95] tracking-[-0.01em] uppercase text-[var(--text)]">
          Tu equipo
          <br />
          <span className="block text-[var(--green)]">en buenas manos</span>
        </h1>

        <p className="mx-auto max-w-[560px] text-[clamp(1rem,2.5vw,1.25rem)] leading-7 text-[var(--muted)]">
          Servicio técnico profesional para celulares, computadoras y consolas.
          Reparaciones rápidas, garantizadas y con atención personalizada.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={waLink("Hola GSMFix! Quiero consultar sobre una reparación.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[0.75rem] bg-[var(--green)] px-6 py-3 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)] hover:-translate-y-0.5"
          >
            <WhatsAppIcon size={18} /> Consultar ahora
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center rounded-[0.75rem] border border-[var(--border)] bg-transparent px-6 py-3 text-sm font-[var(--font-display)] font-bold uppercase tracking-[0.05em] text-[var(--text)] transition duration-200 hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            Ver servicios
          </a>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-12 text-left">
          {[
            { value: "10+", label: "Años de experiencia" },
            { value: "∞", label: "Marcas atendidas" },
            { value: "★ 4.9", label: "En Google" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-[2.5rem] font-[var(--font-display)] font-black leading-none text-[var(--green)]">
                {item.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.08em] text-[var(--muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
