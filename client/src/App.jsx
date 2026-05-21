import { useState, useEffect, useRef, useCallback } from "react";

// ─── SIMPLE ROUTER ───────────────────────────────────────────────────────────
function useHash() {
  const [hash, setHash] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setHash(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return hash;
}

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// ─── BANNER STORE (ephemeral, in-memory) ────────────────────────────────────
let _bannerUrl = null;
const bannerListeners = new Set();
function getBanner() { return _bannerUrl; }
function setBanner(url) {
  _bannerUrl = url;
  bannerListeners.forEach(fn => fn(url));
}
function useBanner() {
  const [url, setUrl] = useState(_bannerUrl);
  useEffect(() => {
    bannerListeners.add(setUrl);
    return () => bannerListeners.delete(setUrl);
  }, []);
  return [url, setBanner];
}

// ─── ICONS (Lucide-style SVG inline) ─────────────────────────────────────────
const Icon = ({ d, size = 24, stroke = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  wrench: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  monitor: ["M20 3H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z", "M8 21h8M12 17v4"],
  gamepad: ["M6 12h4M8 10v4", "M15 11h.01M18 11h.01", "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"],
  smartphone: ["M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z", "M12 18h.01"],
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"],
  mapPin: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347",
  instagram: ["M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01", "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"],
  chevronDown: "M6 9l6 6 6-6",
  chevronUp: "M18 15l-6-6-6 6",
  menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
  x: ["M18 6 6 18", "M6 6l12 12"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
  image: ["M21 15l-5-5L5 21", "M3 3h18v18H3z", "M8.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  lock: ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"],
  logOut: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  checkCircle: ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"],
  award: ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89 7 23l5-3 5 3-1.21-9.12"],
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  tool: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"],
  battery: ["M16 7H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z", "M22 11v2"],
  wifi: ["M1.42 9a16 16 0 0 1 21.16 0", "M5 12.55a11 11 0 0 1 14.08 0", "M8.53 16.11a6 6 0 0 1 6.95 0", "M12 20h.01"],
};

// ─── WHATSAPP CTA ─────────────────────────────────────────────────────────────
const WA_NUMBER = "5491153258828";
function waLink(msg = "Hola GSMFix! Quería consultarles sobre un servicio.") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #22c55e;
    --green-bright: #4ade80;
    --green-dark: #15803d;
    --green-muted: #166534;
    --bg: #0a0a0a;
    --bg-card: #111111;
    --bg-card2: #161616;
    --border: #1f1f1f;
    --border-green: rgba(34,197,94,0.25);
    --text: #f5f5f5;
    --muted: #737373;
    --font-display: 'Barlow Condensed', sans-serif;
    --font-body: 'Barlow', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }

  ::selection { background: var(--green); color: #000; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--green-muted); border-radius: 3px; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10,10,10,0.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 1.5rem; height: 64px;
  }
  .navbar-logo { display: flex; align-items: center; gap: 0.625rem; text-decoration: none; }
  .navbar-logo img { height: 38px; width: auto; }
  .navbar-logo-text { font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; color: var(--text); letter-spacing: 0.02em; }
  .navbar-logo-text span { color: var(--green); }
  .nav-links { display: flex; align-items: center; gap: 1.75rem; }
  .nav-link { color: var(--muted); text-decoration: none; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s; }
  .nav-link:hover { color: var(--green); }
  .nav-cta { background: var(--green); color: #000; font-family: var(--font-display); font-size: 1rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.5rem 1.25rem; border-radius: 6px; text-decoration: none; transition: background 0.2s, transform 0.15s; white-space: nowrap; }
  .nav-cta:hover { background: var(--green-bright); transform: translateY(-1px); }
  .hamburger { display: none; background: none; border: none; color: var(--text); cursor: pointer; padding: 4px; }
  .mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(10,10,10,0.98); border-bottom: 1px solid var(--border); flex-direction: column; padding: 1.5rem; gap: 1.25rem; z-index: 99; }
  .mobile-menu.open { display: flex; }
  .mobile-menu .nav-link { font-size: 1rem; color: var(--text); }
  .mobile-menu .nav-cta { text-align: center; }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 5rem 1.5rem 4rem;
    text-align: center;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 60%),
      var(--bg);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0; opacity: 0.04;
    background-image: linear-gradient(var(--green) 1px, transparent 1px), linear-gradient(90deg, var(--green) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .hero-content { position: relative; z-index: 1; max-width: 860px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(34,197,94,0.1); border: 1px solid var(--border-green); border-radius: 100px; padding: 0.375rem 1rem; font-size: 0.8rem; font-weight: 600; color: var(--green); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem; }
  .hero-title { font-family: var(--font-display); font-size: clamp(3rem, 10vw, 6.5rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.01em; text-transform: uppercase; margin-bottom: 1rem; }
  .hero-title .accent { color: var(--green); display: block; }
  .hero-subtitle { font-size: clamp(1rem, 2.5vw, 1.25rem); color: var(--muted); max-width: 560px; margin: 0 auto 2rem; line-height: 1.6; }
  .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: var(--green); color: #000; font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.875rem 2rem; border-radius: 8px; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
  .btn-primary:hover { background: var(--green-bright); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34,197,94,0.3); }
  .btn-secondary { background: transparent; color: var(--text); font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 0.875rem 2rem; border-radius: 8px; border: 1px solid var(--border); text-decoration: none; cursor: pointer; transition: border-color 0.2s, color 0.2s; display: inline-flex; align-items: center; gap: 0.5rem; }
  .btn-secondary:hover { border-color: var(--green); color: var(--green); }
  .hero-stats { display: flex; gap: 3rem; justify-content: center; margin-top: 3.5rem; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-num { font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; color: var(--green); line-height: 1; }
  .stat-label { font-size: 0.8rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.25rem; }

  /* SECTIONS */
  section { padding: 5rem 1.5rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-tag { font-family: var(--font-display); font-size: 0.8rem; font-weight: 700; color: var(--green); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
  .section-tag::before { content: ''; display: block; width: 24px; height: 2px; background: var(--green); }
  .section-title { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; text-transform: uppercase; line-height: 1.05; margin-bottom: 0.5rem; }
  .section-sub { color: var(--muted); font-size: 1rem; max-width: 500px; line-height: 1.6; margin-bottom: 3rem; }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  .service-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 2rem 1.5rem; transition: border-color 0.2s, transform 0.2s; cursor: default; }
  .service-card:hover { border-color: var(--border-green); transform: translateY(-3px); }
  .service-icon { width: 48px; height: 48px; background: rgba(34,197,94,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--green); margin-bottom: 1.25rem; }
  .service-name { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem; }
  .service-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
  .service-list li { font-size: 0.9rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; }
  .service-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
  .service-cta { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(34,197,94,0.1); color: var(--green); font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 0.6rem 1.1rem; border-radius: 6px; text-decoration: none; border: 1px solid var(--border-green); transition: background 0.2s, border-color 0.2s; }
  .service-cta:hover { background: rgba(34,197,94,0.2); border-color: var(--green); }

  /* WHY US */
  .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
  .why-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.75rem; display: flex; gap: 1rem; align-items: flex-start; }
  .why-icon { color: var(--green); flex-shrink: 0; margin-top: 2px; }
  .why-title { font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.375rem; }
  .why-text { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

  /* PROMO BANNER */
  .promo-section { background: var(--bg-card); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .promo-banner-wrap { border-radius: 12px; overflow: hidden; border: 1px solid var(--border-green); aspect-ratio: 16/5; background: var(--bg-card2); display: flex; align-items: center; justify-content: center; position: relative; }
  .promo-placeholder { text-align: center; color: var(--muted); }
  .promo-placeholder svg { margin: 0 auto 0.75rem; opacity: 0.4; }
  .promo-placeholder p { font-size: 0.9rem; }
  .promo-banner-img { width: 100%; height: 100%; object-fit: cover; }

  /* FAQ */
  .faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .faq-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .faq-q { width: 100%; background: none; border: none; color: var(--text); font-family: var(--font-body); font-size: 1rem; font-weight: 600; text-align: left; padding: 1.25rem 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 1rem; transition: color 0.2s; }
  .faq-q:hover { color: var(--green); }
  .faq-q svg { flex-shrink: 0; transition: transform 0.2s; }
  .faq-a { padding: 0 1.5rem 1.25rem; color: var(--muted); font-size: 0.9rem; line-height: 1.7; }

  /* REVIEWS */
  .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  .review-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }
  .review-stars { display: flex; gap: 3px; color: #facc15; margin-bottom: 0.75rem; }
  .review-text { font-size: 0.9rem; color: var(--muted); line-height: 1.65; margin-bottom: 1rem; font-style: italic; }
  .review-author { font-weight: 600; font-size: 0.875rem; }
  .review-date { font-size: 0.775rem; color: var(--muted); }

  /* CONTACT / FOOTER */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  .contact-info { display: flex; flex-direction: column; gap: 1.25rem; }
  .contact-row { display: flex; gap: 1rem; align-items: flex-start; }
  .contact-icon { color: var(--green); flex-shrink: 0; margin-top: 2px; }
  .contact-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.2rem; }
  .contact-value { font-size: 0.95rem; font-weight: 500; }
  .map-embed { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); aspect-ratio: 16/9; }
  .map-embed iframe { width: 100%; height: 100%; border: none; display: block; }
  .social-links { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
  .social-link { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 0.6rem 1rem; color: var(--text); text-decoration: none; font-size: 0.875rem; font-weight: 600; transition: border-color 0.2s, color 0.2s; }
  .social-link:hover { border-color: var(--green); color: var(--green); }
  footer { background: var(--bg-card); border-top: 1px solid var(--border); padding: 1.5rem; text-align: center; color: var(--muted); font-size: 0.8rem; }

  /* ADMIN */
  .admin-page { min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .admin-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 480px; }
  .admin-logo { font-family: var(--font-display); font-size: 2rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.375rem; }
  .admin-logo span { color: var(--green); }
  .admin-sub { color: var(--muted); font-size: 0.875rem; margin-bottom: 2rem; }
  .admin-label { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 0.5rem; display: block; }
  .admin-input { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font-family: var(--font-body); font-size: 1rem; padding: 0.75rem 1rem; outline: none; transition: border-color 0.2s; }
  .admin-input:focus { border-color: var(--green); }
  .admin-err { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.875rem; color: #f87171; margin-bottom: 1rem; }
  .admin-panel-wrap { min-height: 100vh; background: var(--bg); padding: 2rem 1.5rem; }
  .admin-header { display: flex; justify-content: space-between; align-items: center; max-width: 860px; margin: 0 auto 2.5rem; }
  .admin-title { font-family: var(--font-display); font-size: 2rem; font-weight: 900; text-transform: uppercase; }
  .admin-title span { color: var(--green); }
  .btn-logout { background: none; border: 1px solid var(--border); color: var(--muted); font-family: var(--font-body); font-size: 0.875rem; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: border-color 0.2s, color 0.2s; }
  .btn-logout:hover { border-color: #ef4444; color: #ef4444; }
  .upload-section { max-width: 860px; margin: 0 auto; }
  .upload-info { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.75rem; }
  .upload-info strong { color: var(--green-bright); }
  .dropzone { aspect-ratio: 16/5; border: 2px dashed var(--border); border-radius: 12px; background: var(--bg-card); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.2s, background 0.2s; position: relative; overflow: hidden; }
  .dropzone:hover, .dropzone.drag { border-color: var(--green); background: rgba(34,197,94,0.04); }
  .dropzone-label { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; color: var(--muted); cursor: pointer; }
  .dropzone-label svg { opacity: 0.5; }
  .dropzone-label p { font-size: 0.9rem; }
  .dropzone-label span { font-size: 0.775rem; }
  .dropzone-preview { position: absolute; inset: 0; }
  .dropzone-preview img { width: 100%; height: 100%; object-fit: cover; }
  .upload-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
  .admin-status { background: rgba(34,197,94,0.1); border: 1px solid var(--border-green); border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.875rem; color: var(--green); display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; }
  .admin-back { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--muted); font-size: 0.875rem; text-decoration: none; margin-bottom: 1rem; cursor: pointer; background: none; border: none; font-family: var(--font-body); transition: color 0.2s; }
  .admin-back:hover { color: var(--green); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .services-grid { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .hamburger { display: block; }
    .promo-banner-wrap { aspect-ratio: 4/3; }
    .hero-stats { gap: 2rem; }
    .dropzone { aspect-ratio: 4/3; }
  }
  @media (max-width: 600px) {
    section { padding: 3.5rem 1rem; }
    .admin-card { padding: 1.75rem 1.25rem; }
    .hero-actions { flex-direction: column; align-items: center; }
    .social-links { flex-direction: column; }
  }
`;

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const faqs = [
  { q: "¿Tienen garantía en las reparaciones?", a: "Sí, todos nuestros trabajos cuentan con garantía. La cobertura varía según el tipo de reparación — consultanos por tu caso específico." },
  { q: "¿Cuánto tarda una reparación?", a: "Depende del trabajo. Reparaciones simples como cambio de pantalla o pin de carga suelen estar listas el mismo día. Diagnósticos más complejos de PC o consolas pueden llevar 24 a 48 hs." },
  { q: "¿Trabajan con todas las marcas de celulares?", a: "Sí, trabajamos con todas las marcas: iPhone, Samsung, Motorola, Xiaomi, LG, Huawei, Alcatel y más. Si tenés dudas sobre tu modelo, escribinos." },
  { q: "¿Aceptan tarjeta o solo efectivo?", a: "Aceptamos efectivo y transferencia. Pagando en efectivo podés acceder a precios especiales en algunos servicios." },
  { q: "¿Hacen presupuesto antes de reparar?", a: "Siempre. Primero diagnosticamos el equipo y te damos un presupuesto sin compromiso. Si no aceptás, no se cobra nada." },
  { q: "¿Están en Luis Guillón todo el día?", a: "Estamos abiertos de lunes a sábado de 10 a 20 hs en José Hernández 32, Luis Guillón. También podés escribirnos por WhatsApp antes de venir." },
];

const reviews = [
  { text: "Llevé mi iPhone con la pantalla rota y en pocas horas estaba como nuevo. Excelente atención y precio justo.", author: "Valentina G.", date: "Hace 2 semanas" },
  { text: "Diez puntos. La PC no encendía, la dejé a la mañana y a la tarde me llamaron con el diagnóstico. Muy prolijos.", author: "Martín R.", date: "Hace 1 mes" },
  { text: "El mejor servicio técnico de la zona, sin dudas. Ya mandé a tres amigos y todos quedaron conformes.", author: "Lucía F.", date: "Hace 3 semanas" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <>
      <nav className="navbar">
        <a href="#inicio" className="navbar-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="navbar-logo-text">GSM<span>Fix</span></span>
        </a>
        <div className="nav-links">
          <a href="#servicios" className="nav-link">Servicios</a>
          <a href="#nosotros" className="nav-link">Nosotros</a>
          <a href="#promos" className="nav-link">Promos</a>
          <a href="#preguntas" className="nav-link">FAQ</a>
          <a href="#contacto" className="nav-link">Contacto</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="nav-cta">WhatsApp</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menú">
          <Icon d={menuOpen ? icons.x : icons.menu} size={24} />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["servicios", "nosotros", "promos", "preguntas", "contacto"].map(s => (
          <a key={s} href={`#${s}`} className="nav-link" onClick={() => setMenuOpen(false)} style={{ textTransform: "capitalize" }}>{s}</a>
        ))}
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="nav-cta" onClick={() => setMenuOpen(false)}>WhatsApp</a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">
          <Icon d={icons.shield} size={14} /> 10 años en Luis Guillón
        </div>
        <h1 className="hero-title">
          Tu equipo<br /><span className="accent">en buenas manos</span>
        </h1>
        <p className="hero-subtitle">
          Servicio técnico profesional para celulares, computadoras y consolas. Reparaciones rápidas, garantizadas y con atención personalizada.
        </p>
        <div className="hero-actions">
          <a href={waLink("Hola GSMFix! Quiero consultar sobre una reparación.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <Icon d={icons.whatsapp} size={18} /> Consultar ahora
          </a>
          <a href="#servicios" className="btn-secondary">
            Ver servicios
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">10+</div><div className="stat-label">Años de experiencia</div></div>
          <div className="stat"><div className="stat-num">∞</div><div className="stat-label">Marcas atendidas</div></div>
          <div className="stat"><div className="stat-num">★ 4.9</div><div className="stat-label">En Google</div></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: icons.smartphone,
      name: "Celulares",
      items: ["Cambio de pantalla", "Cambio de batería", "Pin de carga", "Cámara y micrófono", "Software y actualizaciones", "iPhone, Samsung, Motorola y más"],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi celular."
    },
    {
      icon: icons.monitor,
      name: "Computadoras",
      items: ["Diagnóstico completo", "Limpieza y mantenimiento", "Cambio de pasta térmica", "RAM y almacenamiento", "Problemas de software/OS", "Laptops y PC de escritorio"],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi computadora."
    },
    {
      icon: icons.gamepad,
      name: "Consolas",
      items: ["PlayStation 3 y 4", "Limpieza + pasta térmica MX4", "Joysticks y controles", "Problemas de arranque", "Lectores de disco", "Xbox y otras consolas"],
      msg: "Hola GSMFix! Quiero consultar sobre la reparación de mi consola."
    },
  ];

  return (
    <section id="servicios">
      <div className="section-inner">
        <div className="section-tag">Servicios</div>
        <h2 className="section-title">¿Qué necesitás reparar?</h2>
        <p className="section-sub">Seleccioná tu dispositivo y te conectamos directo con el equipo.</p>
        <div className="services-grid">
          {services.map(s => (
            <div key={s.name} className="service-card">
              <div className="service-icon"><Icon d={s.icon} size={22} /></div>
              <div className="service-name">{s.name}</div>
              <ul className="service-list">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              <a href={waLink(s.msg)} target="_blank" rel="noopener noreferrer" className="service-cta">
                <Icon d={icons.whatsapp} size={16} /> Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: icons.award, title: "10 años de experiencia", text: "Una década atendiendo a vecinos de Luis Guillón y alrededores. Conocemos cada marca y modelo." },
    { icon: icons.shield, title: "Garantía en todo", text: "Todos nuestros trabajos tienen garantía. Si algo no queda bien, lo resolvemos sin vueltas." },
    { icon: icons.zap, title: "Reparaciones rápidas", text: "La mayoría de las reparaciones se resuelven el mismo día. Valoramos tu tiempo." },
    { icon: icons.checkCircle, title: "Repuestos de calidad", text: "Usamos repuestos seleccionados para que tu equipo funcione como nuevo por mucho tiempo." },
  ];

  return (
    <section id="nosotros" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="section-inner">
        <div className="section-tag">Por qué elegirnos</div>
        <h2 className="section-title">Técnicos de verdad,<br />no improvisados</h2>
        <p className="section-sub">Somos Hernán y equipo — un emprendimiento familiar con historia en el barrio.</p>
        <div className="why-grid">
          {items.map(i => (
            <div key={i.title} className="why-card">
              <div className="why-icon"><Icon d={i.icon} size={22} /></div>
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

function PromoBanner() {
  const [bannerUrl] = useBanner();

  return (
    <section className="promo-section" id="promos">
      <div className="section-inner">
        <div className="section-tag">Promociones</div>
        <h2 className="section-title">Ofertas vigentes</h2>
        <p className="section-sub">Las promos se actualizan seguido. Consultanos por la oferta del momento.</p>
        <div className="promo-banner-wrap">
          {bannerUrl ? (
            <img src={bannerUrl} alt="Promoción GSMFix" className="promo-banner-img" />
          ) : (
            <div className="promo-placeholder">
              <Icon d={icons.image} size={40} />
              <p>Promo activa próximamente</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="preguntas">
      <div className="section-inner">
        <div className="section-tag">Preguntas frecuentes</div>
        <h2 className="section-title">Las dudas más comunes</h2>
        <p className="section-sub">Si no encontrás tu respuesta, escribinos por WhatsApp.</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <Icon d={open === i ? icons.chevronUp : icons.chevronDown} size={18} />
              </button>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="section-inner">
        <div className="section-tag">Reseñas</div>
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <p className="section-sub">Más de 100 reseñas en Google con calificación 4.9 ★</p>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">{[...Array(5)].map((_, j) => <Icon key={j} d={icons.star} size={14} stroke="#facc15" />)}</div>
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

function Contact() {
  return (
    <section id="contacto">
      <div className="section-inner">
        <div className="section-tag">Contacto</div>
        <h2 className="section-title">Vení a vernos</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-row">
              <div className="contact-icon"><Icon d={icons.mapPin} size={20} /></div>
              <div>
                <div className="contact-label">Dirección</div>
                <div className="contact-value">José Hernández 32, Luis Guillón<br />Esteban Echeverría, Buenos Aires</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><Icon d={icons.clock} size={20} /></div>
              <div>
                <div className="contact-label">Horario</div>
                <div className="contact-value">Lunes a Sábado · 10:00 a 20:00 hs</div>
              </div>
            </div>
            <div className="contact-row">
              <div className="contact-icon"><Icon d={icons.whatsapp} size={20} /></div>
              <div>
                <div className="contact-label">WhatsApp</div>
                <div className="contact-value">+54 9 11 5325-8828</div>
              </div>
            </div>
            <div className="social-links">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="social-link">
                <Icon d={icons.whatsapp} size={16} /> WhatsApp
              </a>
              <a href="https://www.instagram.com/gsmfixok" target="_blank" rel="noopener noreferrer" className="social-link">
                <Icon d={icons.instagram} size={16} /> Instagram
              </a>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <a href={waLink("Hola GSMFix! Quiero hacer una consulta.")} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <Icon d={icons.whatsapp} size={18} /> Escribirnos por WhatsApp
              </a>
            </div>
          </div>
          <div className="map-embed">
            <iframe
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

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div style={{ paddingTop: 64 }}>
        <Hero />
        <Services />
        <WhyUs />
        <PromoBanner />
        <FAQ />
        <Reviews />
        <Contact />
        <footer>
          <p>© {new Date().getFullYear()} GSMFix · José Hernández 32, Luis Guillón · Todos los derechos reservados</p>
          <p style={{ marginTop: "0.375rem", fontSize: "0.75rem" }}>
            <button onClick={() => navigate("/panel")} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline" }}>Panel admin</button>
          </p>
        </footer>
      </div>
    </div>
  );
}

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
const ADMIN_PASS = "casa1234";

function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (pass === ADMIN_PASS) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2500); }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
          <div style={{ background: "rgba(34,197,94,0.1)", borderRadius: "10px", padding: "0.625rem", color: "var(--green)" }}>
            <Icon d={icons.lock} size={22} />
          </div>
          <div>
            <div className="admin-logo">GSM<span>Fix</span></div>
            <div className="admin-sub">Panel de administración</div>
          </div>
        </div>
        {err && <div className="admin-err">Clave incorrecta. Intentá de nuevo.</div>}
        <label className="admin-label" htmlFor="pass">Clave de acceso</label>
        <input
          id="pass" type="password" className="admin-input" placeholder="••••••••"
          value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ marginBottom: "1rem" }}
          autoFocus
        />
        <button className="btn-primary" onClick={submit} style={{ width: "100%", justifyContent: "center" }}>
          Ingresar
        </button>
        <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <button className="admin-back" onClick={() => navigate("/")}>← Volver al sitio</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const [bannerUrl, setBannerUrl] = useBanner();
  const [preview, setPreview] = useState(bannerUrl);
  const [drag, setDrag] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const onDragOver = (e) => { e.preventDefault(); setDrag(true); };
  const onDragLeave = () => setDrag(false);

  const save = () => {
    if (preview) {
      setBannerUrl(preview);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const clear = () => { setPreview(null); setBannerUrl(null); setSaved(false); };

  return (
    <div className="admin-panel-wrap">
      <div className="admin-header">
        <div>
          <div className="admin-title">Panel <span>Admin</span></div>
          <div style={{ color: "var(--muted)", fontSize: "0.875rem" }}>GSMFix · Gestión de banner promocional</div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button className="admin-back" onClick={() => navigate("/")}>← Ver sitio</button>
          <button className="btn-logout" onClick={onLogout}>
            <Icon d={icons.logOut} size={15} /> Salir
          </button>
        </div>
      </div>

      <div className="upload-section">
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.375rem" }}>Banner promocional</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Esta imagen aparece en la sección "Ofertas vigentes" del sitio.</p>

          <div className="upload-info">
            Relación de aspecto requerida: <strong>16:5 (panorámica horizontal)</strong> — por ejemplo, 1600 × 500 px o 3200 × 1000 px. Podés crear tu banner en Canva con esas medidas.
          </div>

          <div
            className={`dropzone${drag ? " drag" : ""}`}
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => fileRef.current.click()}
          >
            {preview ? (
              <div className="dropzone-preview">
                <img src={preview} alt="Preview banner" />
              </div>
            ) : (
              <label className="dropzone-label">
                <Icon d={icons.upload} size={36} />
                <p>Arrastrá tu imagen aquí o hacé clic para subir</p>
                <span>PNG, JPG · Relación 16:5 recomendada</span>
              </label>
            )}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => handleFile(e.target.files[0])} />
          </div>

          <div className="upload-actions">
            <button className="btn-primary" onClick={save} disabled={!preview} style={{ opacity: preview ? 1 : 0.5 }}>
              <Icon d={icons.checkCircle} size={16} /> Publicar banner
            </button>
            {preview && (
              <button className="btn-secondary" onClick={clear}>Quitar imagen</button>
            )}
          </div>

          {saved && (
            <div className="admin-status">
              <Icon d={icons.checkCircle} size={16} /> Banner publicado correctamente en el sitio.
            </div>
          )}

          <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(34,197,94,0.05)", border: "1px solid var(--border-green)", borderRadius: "8px", fontSize: "0.8rem", color: "var(--muted)", lineHeight: "1.7" }}>
            <strong style={{ color: "var(--green-bright)" }}>Consejo:</strong> Diseñá el banner en Canva con tamaño 1600 × 500 px. Guardalo como PNG o JPG. Nombralo con palabras clave como <em>gsmfix-promo-pantalla-agosto.jpg</em> para mejor SEO. La sesión se cierra al recargar la página.
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPage() {
  const [auth, setAuth] = useState(false);
  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />;
  return <AdminPanel onLogout={() => setAuth(false)} />;
}

// ─── APP (Router) ─────────────────────────────────────────────────────────────
export default function App() {
  const path = useHash();

  return (
    <>
      <style>{css}</style>
      {path === "/panel" ? <AdminPage /> : <Landing />}
    </>
  );
}
