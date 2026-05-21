import { WhatsAppIcon, InstagramIcon } from "../lib/brandIcons";
import { Icon, icons } from "../lib/icons";
import { waLink } from "../lib/whatsapp";

export default function Contact() {
  return (
    <section id="contacto" className="bg-[var(--bg)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" /> Contacto
        </div>
        <h2 className="mb-10 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          Vení a vernos
        </h2>
        <div className="grid gap-12 xl:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="mt-1 text-[var(--green)]">
                <Icon d={icons.mapPin} size={20} />
              </div>
              <div>
                <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                  Dirección
                </div>
                <div className="text-sm font-medium text-[var(--text)]">
                  José Hernández 32, Luis Guillón
                  <br />
                  Esteban Echeverría, Buenos Aires
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-[var(--green)]">
                <Icon d={icons.clock} size={20} />
              </div>
              <div>
                <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                  Horario
                </div>
                <div className="text-sm font-medium text-[var(--text)]">
                  Lunes a Sábado · 10:00 a 20:00 hs
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-[var(--green)]">
                <Icon d={icons.whatsapp} size={20} />
              </div>
              <div>
                <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                  WhatsApp
                </div>
                <div className="text-sm font-medium text-[var(--text)]">+54 9 11 5325-8828</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition duration-200 hover:border-[var(--green)] hover:text-[var(--green)]"
              >
                <Icon d={icons.whatsapp} size={16} /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/gsmfixok"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition duration-200 hover:border-[var(--green)] hover:text-[var(--green)]"
              >
                <Icon d={icons.instagram} size={16} /> Instagram
              </a>
            </div>

            <div className="mt-6">
              <a
                href={waLink("Hola GSMFix! Quiero hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[0.75rem] bg-[var(--green)] px-6 py-3 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)]"
              >
                <WhatsAppIcon size={18} /> Escribirnos por WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-[1rem] border border-[var(--border)] overflow-hidden bg-[var(--bg-card)] aspect-[16/9]">
            <iframe
              className="h-full w-full"
              title="GSMFix ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8!2d-58.4383!3d-34.8089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ4JzMyLjAiUyA1OMKwMjYnMTcuOSJX!5e0!3m2!1ses!2sar!4v1700000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
