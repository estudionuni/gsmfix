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
    <div className="min-h-screen bg-[var(--bg)] px-6 py-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-3xl font-[var(--font-display)] font-black uppercase text-[var(--text)]">
              Panel <span className="text-[var(--green)]">Admin</span>
            </div>
            <div className="mt-2 text-sm text-[var(--muted)]">
              GSMFix · Gestión de banner promocional
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--muted)] transition hover:border-[#ef4444] hover:text-[#ef4444]"
              onClick={() => navigate("/")}
            >
              ← Ver sitio
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] bg-[transparent] px-4 py-3 text-sm font-semibold text-[var(--muted)] transition hover:border-[#ef4444] hover:text-[#ef4444]"
              onClick={onLogout}
            >
              <Icon d={icons.logOut} size={15} /> Salir
            </button>
          </div>
        </div>

        <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-10">
          <div className="mb-4 text-[1.3rem] font-[var(--font-display)] font-black uppercase tracking-[0.05em] text-[var(--text)]">
            Banner promocional
          </div>
          <p className="mb-6 text-sm text-[var(--muted)]">
            Esta imagen aparece en la sección "Ofertas vigentes" del sitio.
          </p>
          <div className="mb-6 text-sm text-[var(--muted)]">
            Relación de aspecto requerida: <strong className="text-[var(--text)]">16:5 (panorámica horizontal)</strong> — por ejemplo, 1600 × 500 px o 3200 × 1000 px. Podés crear tu banner en Canva con esas medidas.
          </div>

          <div
            className={`relative flex min-h-[220px] cursor-pointer items-center justify-center gap-4 overflow-hidden rounded-[1rem] border-2 px-6 py-10 text-[var(--muted)] transition duration-200 ${
              drag
                ? "border-[var(--green)] bg-[rgba(34,197,94,0.04)]"
                : "border-[var(--border)] bg-[var(--bg-card)]"
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
            <Icon d={icons.upload} size={36} />
            <div className="text-center text-sm">
              Arrastrá tu banner acá o hacé click para seleccionar
            </div>
          </div>

          {preview && (
            <div className="mt-6 overflow-hidden rounded-[1rem] border border-[var(--border)]">
              <img src={preview} alt="Vista previa del banner" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {preview && (
              <button className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition duration-200 hover:border-[var(--green)]" onClick={clear} type="button">
                Limpiar
              </button>
            )}
            <button className="inline-flex items-center gap-2 rounded-[0.75rem] bg-[var(--green)] px-4 py-3 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)]" onClick={save} type="button">
              <Icon d={icons.checkCircle} size={16} /> Publicar banner
            </button>
          </div>

          {saved && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-[0.75rem] border border-[var(--border-green)] bg-[rgba(34,197,94,0.1)] px-4 py-3 text-sm text-[var(--green)]">
              <Icon d={icons.checkCircle} size={16} /> Banner publicado correctamente en el sitio.
            </div>
          )}

          <div className="mt-6 rounded-[0.75rem] border border-[var(--border-green)] bg-[rgba(34,197,94,0.05)] p-4 text-sm leading-7 text-[var(--muted)]">
            <strong className="text-[var(--green-bright)]">Consejo:</strong> Diseñá el banner en Canva con tamaño 1600 × 500 px. Guardalo como PNG o JPG. Nombralo con palabras clave como <em>gsmfix-promo-pantalla-agosto.jpg</em> para mejor SEO. La sesión se guarda localmente en este navegador.
          </div>
        </div>
      </div>
    </div>
  );
}
