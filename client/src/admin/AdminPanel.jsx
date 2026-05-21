import { useCallback, useEffect, useRef, useState } from "react";
import { Icon, icons } from "../lib/icons";
import { navigate } from "../hooks/useRouter";
import { useBanner } from "../hooks/useBanner";

export default function AdminPanel({ onLogout }) {
  const [bannerUrl, setBannerUrl] = useBanner();
  const [preview, setPreview] = useState(bannerUrl);
  const [drag, setDrag] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    setPreview(bannerUrl);
  }, [bannerUrl]);

  const handleFile = useCallback((file) => {
    if (!file || !file.type?.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result || null);
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile],
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeave = () => setDrag(false);

  const save = () => {
    if (!preview) return;
    setBannerUrl(preview);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const clear = () => {
    setPreview(null);
    setBannerUrl(null);
    setSaved(false);
    if (fileRef.current) fileRef.current.value = "";
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
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <Icon d={icons.upload} size={36} />
            <div className="dropzone-label">
              Arrastrá tu banner acá o hacé click para seleccionar
            </div>
          </div>

          {preview && (
            <div className="dropzone-preview">
              <img src={preview} alt="Vista previa del banner" />
            </div>
          )}

          <div className="upload-actions">
            {preview && (
              <button className="btn-secondary" onClick={clear} type="button">
                Limpiar
              </button>
            )}

            <button className="btn-primary" onClick={save} type="button">
              <Icon d={icons.checkCircle} size={16} /> Publicar banner
            </button>
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
            se guarda localmente en este navegador.
          </div>
        </div>
      </div>
    </div>
  );
}
