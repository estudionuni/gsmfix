import { Award, Shield, Zap, CheckCircle2 } from "lucide-react";

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
      className="border-y border-[var(--border)] bg-[var(--bg-card)] px-6 py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" /> Por qué
          elegirnos
        </div>
        <h2 className="mb-3 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          Técnicos de verdad,
          <br />
          no improvisados
        </h2>
        <p className="mb-12 max-w-[500px] text-base leading-7 text-[var(--muted)]">
          Somos Hernán y equipo — un emprendimiento familiar con historia en el
          barrio.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-7"
            >
              <div className="mt-1 text-[var(--green)]">
                <item.IconComponent size={22} />
              </div>
              <div>
                <div className="mb-2 text-lg font-[var(--font-display)] font-black uppercase text-[var(--text)]">
                  {item.title}
                </div>
                <div className="text-sm leading-7 text-[var(--muted)]">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
