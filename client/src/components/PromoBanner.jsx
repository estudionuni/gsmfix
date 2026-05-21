// src/components/PromoBanner.jsx
import { ImageIcon } from "lucide-react";
import { useBanner } from "../hooks/useBanner";

export default function PromoBanner() {
  const [bannerUrl] = useBanner();

  return (
    <section className="promo-section" id="promos">
      <div className="section-inner">
        <div className="section-tag">Promociones</div>
        <h2 className="section-title">Ofertas vigentes</h2>
        <p className="section-sub">
          Las promos se actualizan seguido. Consultanos por la oferta del
          momento.
        </p>
        <div className="promo-banner-wrap">
          {bannerUrl ? (
            <img
              src={bannerUrl}
              alt="Promoción GSMFix"
              className="promo-banner-img"
            />
          ) : (
            <div className="promo-placeholder">
              <ImageIcon size={40} />
              <p>Promo activa próximamente</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
