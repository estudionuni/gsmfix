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
    <section id="servicios">
      <div className="section-inner">
        <div className="section-tag">Servicios</div>
        <h2 className="section-title">¿Qué necesitás reparar?</h2>
        <p className="section-sub">
          Seleccioná tu dispositivo y te conectamos directo con el equipo.
        </p>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.name} className="service-card">
              <div className="service-icon">
                <s.IconComponent size={22} />
              </div>
              <div className="service-name">{s.name}</div>
              <ul className="service-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                href={waLink(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="service-cta"
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
