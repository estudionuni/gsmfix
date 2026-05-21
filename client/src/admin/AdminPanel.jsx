// src/admin/AdminPanel.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, CheckCircle2, LogOut } from "lucide-react";
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

  const onDragOver = (e) => { e.preventDefault(); setDrag(true); };
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
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10">
      <div className="mx-auto max-w-[860px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-3xl font-[var(--font-display)] font-black uppercase text-[var(--text)]">
              Panel <span className="text-[var(--green)]">Admin</span>
            </div>
            <div className="mt-1 text-sm text-[var(--muted)]">
              GSMFix · Gestión de banner promocional
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--green)] hover:text-[var(--green)]"
              onClick={() => navigate("/")}
            >
              ← Ver sitio
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:border-[#ef4444] hover:text-[#ef4444]"
              onClick={onLogout}
            >
              <LogOut size={15} /> Salir
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-8">
          <h2 className="mb-1 text-[1.3rem] font-[var(--font-display)] font-black uppercase text-[var(--text)]">
            Banner promocional
          </h2>
          <p className="mb-6 text-sm text-[var(--muted)]">
            Esta imagen aparece en la sección "Ofertas vigentes" del sitio.
          </p>
          <div className="mb-4 rounded-[0.75rem] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--muted)]">
            Relación de aspecto requerida:{" "}
            <strong className="text-[var(--text)]">16:5 (panorámica horizontal)</strong>
            {" "}— por ejemplo, 1600 × 500 px o 3200 × 1000 px.
          </div>

          {/* Dropzone */}
          <div
            className={`relative flex aspect-[16/5] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-[1rem] border-2 transition duration-200 ${
              drag
                ? "border-[var(--green)] bg-[rgba(34,197,94,0.04)]"
                : "border-dashed border-[var(--border)] bg-[var(--bg)]"
            }`}
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
            {preview ? (
              <img
                src={preview}
                alt="Vista previa del banner"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <>
                <Upload size={36} className="opacity-40 text-[var(--muted)]" />
                <p className="text-sm text-[var(--muted)]">
                  Arrastrá tu imagen aquí o hacé clic para subir
                </p>
                <span className="text-xs text-[var(--muted)] opacity-60">
                  PNG, JPG · Relación 16:5 recomendada
                </span>
              </>
            )}
          </div>

          {/* Acciones */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-[0.75rem] bg-[var(--green)] px-5 py-3 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)] disabled:opacity-40"
              onClick={save}
              disabled={!preview}
              type="button"
            >
              <CheckCircle2 size={16} /> Publicar banner
            </button>
            {preview && (
              <button
                className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition duration-200 hover:border-[#ef4444] hover:text-[#ef4444]"
                onClick={clear}
                type="button"
              >
                Quitar imagen
              </button>
            )}
          </div>

          {saved && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border-green)] bg-[rgba(34,197,94,0.1)] px-4 py-3 text-sm text-[var(--green)]">
              <CheckCircle2 size={16} /> Banner publicado correctamente en el sitio.
            </div>
          )}

          <div className="mt-6 rounded-[0.75rem] border border-[var(--border-green)] bg-[rgba(34,197,94,0.05)] p-4 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--green-bright)]">Consejo:</strong>{" "}
            Diseñá el banner en Canva con tamaño 1600 × 500 px. Guardalo como PNG o JPG.
            Nombralo con palabras clave como{" "}
            <em>gsmfix-promo-pantalla-agosto.jpg</em> para mejor SEO.
            El banner se guarda en este navegador y persiste entre sesiones.
          </div>
        </div>
      </div>
    </div>
  );
}
