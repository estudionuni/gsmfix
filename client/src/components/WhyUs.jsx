// src/components/WhyUs.jsx
import { Award, Shield, Zap, CheckCircle2 } from "lucide-react";

export default function WhyUs() {
  const items = [
    {
      icon: Award,
      title: "10 años de experiencia",
      text: "Una década atendiendo a vecinos de Luis Guillón y alrededores. Conocemos cada marca y modelo.",
    },
    {
      icon: Shield,
      title: "Garantía en todo",
      text: "Todos nuestros trabajos tienen garantía. Si algo no queda bien, lo resolvemos sin vueltas.",
    },
    {
      icon: Zap,
      title: "Reparaciones rápidas",
      text: "La mayoría de las reparaciones se resuelven el mismo día. Valoramos tu tiempo.",
    },
    {
      icon: CheckCircle2,
      title: "Repuestos de calidad",
      text: "Usamos repuestos seleccionados para que tu equipo funcione como nuevo por mucho tiempo.",
    },
  ];

  return (
    <section
      id="nosotros"
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="section-inner">
        <div className="section-tag">Por qué elegirnos</div>
        <h2 className="section-title">
          Técnicos de verdad,
          <br />
          no improvisados
        </h2>
        <p className="section-sub">
          Somos Hernán y equipo — un emprendimiento familiar con historia en el
          barrio.
        </p>
        <div className="why-grid">
          {items.map((i) => (
            <div key={i.title} className="why-card">
              <div className="why-icon">
                <i.IconComponent size={22} />
              </div>
              <div>
                <div className="why-title">{i.title}</div>
                <div className="why-text">{i.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
