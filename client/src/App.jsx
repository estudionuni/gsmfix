import { useState, useEffect, useRef, useCallback } from "react";
import { faqs } from "../data/faqs";
import { reviews } from "../data/reviews";
import { WhatsAppIcon } from "../src/lib/brandIcons";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import PromoBanner from "./components/PromoBanner";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

//Navbar

// Services

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
        <Footer />
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
    if (pass === ADMIN_PASS) {
      onLogin();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2500);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.75rem",
          }}
        >
          <div
            style={{
              background: "rgba(34,197,94,0.1)",
              borderRadius: "10px",
              padding: "0.625rem",
              color: "var(--green)",
            }}
          >
            <Icon d={icons.lock} size={22} />
          </div>
          <div>
            <div className="admin-logo">
              GSM<span>Fix</span>
            </div>
            <div className="admin-sub">Panel de administración</div>
          </div>
        </div>
        {err && (
          <div className="admin-err">Clave incorrecta. Intentá de nuevo.</div>
        )}
        <label className="admin-label" htmlFor="pass">
          Clave de acceso
        </label>
        <input
          id="pass"
          type="password"
          className="admin-input"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          style={{ marginBottom: "1rem" }}
          autoFocus
        />
        <button
          className="btn-primary"
          onClick={submit}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Ingresar
        </button>
        <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <button className="admin-back" onClick={() => navigate("/")}>
            ← Volver al sitio
          </button>
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
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const onDragLeave = () => setDrag(false);

  const save = () => {
    if (preview) {
      setBannerUrl(preview);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const clear = () => {
    setPreview(null);
    setBannerUrl(null);
    setSaved(false);
  };

  return (
    <div className="admin-panel-wrap">
      <div className="admin-header">
        <div>
          <div className="admin-title">
            Panel <span>Admin</span>
          </div>
          <div style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
            GSMFix · Gestión de banner promocional
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button className="admin-back" onClick={() => navigate("/")}>
            ← Ver sitio
          </button>
          <button className="btn-logout" onClick={onLogout}>
            <Icon d={icons.logOut} size={15} /> Salir
          </button>
        </div>
      </div>

      <div className="upload-section">
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.3rem",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: "0.375rem",
            }}
          >
            Banner promocional
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            Esta imagen aparece en la sección "Ofertas vigentes" del sitio.
          </p>

          <div className="upload-info">
            Relación de aspecto requerida:{" "}
            <strong>16:5 (panorámica horizontal)</strong> — por ejemplo, 1600 ×
            500 px o 3200 × 1000 px. Podés crear tu banner en Canva con esas
            medidas.
          </div>

          <div
            className={`dropzone${drag ? " drag" : ""}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
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
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          <div className="upload-actions">
            <button
              className="btn-primary"
              onClick={save}
              disabled={!preview}
              style={{ opacity: preview ? 1 : 0.5 }}
            >
              <Icon d={icons.checkCircle} size={16} /> Publicar banner
            </button>
            {preview && (
              <button className="btn-secondary" onClick={clear}>
                Quitar imagen
              </button>
            )}
          </div>

          {saved && (
            <div className="admin-status">
              <Icon d={icons.checkCircle} size={16} /> Banner publicado
              correctamente en el sitio.
            </div>
          )}

          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "rgba(34,197,94,0.05)",
              border: "1px solid var(--border-green)",
              borderRadius: "8px",
              fontSize: "0.8rem",
              color: "var(--muted)",
              lineHeight: "1.7",
            }}
          >
            <strong style={{ color: "var(--green-bright)" }}>Consejo:</strong>{" "}
            Diseñá el banner en Canva con tamaño 1600 × 500 px. Guardalo como
            PNG o JPG. Nombralo con palabras clave como{" "}
            <em>gsmfix-promo-pantalla-agosto.jpg</em> para mejor SEO. La sesión
            se cierra al recargar la página.
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
