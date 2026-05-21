// src/components/PromoBanner.jsx
import { ImageIcon } from "lucide-react";
import { useBanner } from "../hooks/useBanner";

export default function PromoBanner() {
  const [bannerUrl] = useBanner();

  return (
    <section
      id="promos"
      className="border-t border-b border-[var(--border)] bg-[var(--bg-card)] px-6 py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 inline-flex items-center gap-2 font-[var(--font-display)] text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[var(--green)]">
          <span className="h-0.5 w-6 rounded-full bg-[var(--green)]" />{" "}
          Promociones
        </div>
        <h2 className="mb-3 font-[var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-black uppercase leading-[1.05] text-[var(--text)]">
          Ofertas vigentes
        </h2>
        <p className="mb-10 max-w-[560px] text-base leading-7 text-[var(--muted)]">
          Las promos se actualizan seguido. Consultanos por la oferta del
          momento.
        </p>

        <div className="relative mx-auto overflow-hidden rounded-[1rem] border border-[var(--border-green)] bg-[var(--bg-card2)] aspect-[16/5] flex items-center justify-center">
          {bannerUrl ? (
            <img
              src={bannerUrl}
              alt="Promoción GSMFix"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-[var(--muted)]">
              <ImageIcon size={40} />
              <p>Promo activa próximamente</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
