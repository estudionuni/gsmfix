import { Award, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Icon } from "../lib/icons";

export default function WhyUs() {
  const items = [
    {
      IconComponent: Award,
      title: "10 años de experiencia",
      text: "Una década atendiendo a vecinos de Luis Guillón y alrededores. Conocemos cada marca y modelo.",
    },
    {
      IconComponent: Shield,
      title: "Garantía en todo",
      text: "Todos nuestros trabajos tienen garantía. Si algo no queda bien, lo resolvemos sin vueltas.",
    },
    {
      IconComponent: Zap,
      title: "Reparaciones rápidas",
      text: "La mayoría de las reparaciones se resuelven el mismo día. Valoramos tu tiempo.",
    },
    {
      IconComponent: CheckCircle2,
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
          {items.map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-icon">
                <item.IconComponent size={22} />
              </div>
              <div>
                <div className="why-title">{item.title}</div>
                <div className="why-text">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
