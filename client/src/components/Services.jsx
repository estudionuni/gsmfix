import { Smartphone, Monitor, Gamepad2 } from "lucide-react";
import { Icon, icons } from "../lib/icons";
import { waLink } from "../lib/whatsapp";

export default function Services() {
  const services = [
    {
      IconComponent: Smartphone,
      name: "Celulares",
      items: [
        "Cambio de pantalla",
        "Cambio de batería",
        "Pin de carga",
        "Cámara y micrófono",
        "Software y actualizaciones",
        "iPhone, Samsung, Motorola y más",
      ],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi celular.",
    },
    {
      IconComponent: Monitor,
      name: "Computadoras",
      items: [
        "Diagnóstico completo",
        "Limpieza y mantenimiento",
        "Cambio de pasta térmica",
        "RAM y almacenamiento",
        "Problemas de software/OS",
        "Laptops y PC de escritorio",
      ],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi computadora.",
    },
    {
      IconComponent: Gamepad2,
      name: "Consolas",
      items: [
        "PlayStation 3 y 4",
        "Limpieza + pasta térmica MX4",
        "Joysticks y controles",
        "Problemas de arranque",
        "Lectores de disco",
        "Xbox y otras consolas",
      ],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi consola.",
    },
  ];

  return (
    <section id="servicios" className="bg-[var(--bg)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" />{" "}
          Servicios
        </div>
        <h2 className="mb-3 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          ¿Qué necesitás reparar?
        </h2>
        <p className="mb-12 max-w-[500px] text-base leading-7 text-[var(--muted)]">
          Seleccioná tu dispositivo y te conectamos directo con el equipo.
        </p>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-8 transition duration-200 ease-out hover:-translate-y-1 hover:border-[var(--border-green)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-[0.625rem] bg-[rgba(34,197,94,0.1)] text-[var(--green)]">
                <s.IconComponent size={22} />
              </div>
              <div className="mb-6 text-xl font-[var(--font-display)] font-black uppercase text-[var(--text)]">
                {s.name}
              </div>
              <ul className="mb-6 space-y-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[var(--muted)]"
                  >
                    <span className="block h-2 w-2 rounded-full bg-[var(--green)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-green)] bg-[rgba(34,197,94,0.1)] px-4 py-3 text-sm font-bold uppercase tracking-[0.04em] text-[var(--green)] transition duration-200 hover:bg-[rgba(34,197,94,0.2)]"
              >
                <Icon d={icons.whatsapp} size={16} /> Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
