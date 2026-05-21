// src/components/Reviews.jsx
import { Star } from "lucide-react";
import { reviews } from "../data/reviews";

export default function Reviews() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-card)] px-6 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" /> Reseñas
        </div>
        <h2 className="mb-3 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mb-12 max-w-[500px] text-base leading-7 text-[var(--muted)]">
          Más de 100 reseñas en Google con calificación 4.9 ★
        </p>

        <div className="grid gap-5 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-6"
            >
              <div className="mb-4 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} color="#facc15" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-7 italic text-[var(--muted)]">
                "{r.text}"
              </p>
              <div className="text-sm font-semibold text-[var(--text)]">
                {r.author}
              </div>
              <div className="text-xs text-[var(--muted)]">{r.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
