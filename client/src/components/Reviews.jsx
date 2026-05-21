// src/components/Reviews.jsx
import { Star } from "lucide-react";
import { reviews } from "../data/reviews";

export default function Reviews() {
  return (
    <section
      style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="section-inner">
        <div className="section-tag">Reseñas</div>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <p className="section-sub">
          Más de 100 reseñas en Google con calificación 4.9 ★
        </p>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} color="#facc15" />
                ))}
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">{r.author}</div>
              <div className="review-date">{r.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
