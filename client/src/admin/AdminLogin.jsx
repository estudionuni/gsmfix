import { useState } from "react";
import { Icon, icons } from "../lib/icons";
import { navigate } from "../hooks/useRouter";

const ADMIN_PASS = "casa1234";

export default function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (pass === ADMIN_PASS) {
      onLogin();
      return;
    }

    setErr(true);
    window.setTimeout(() => setErr(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[480px] rounded-[1rem] border border-[var(--border)] bg-[var(--bg-card)] p-10">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[0.75rem] bg-[rgba(34,197,94,0.1)] text-[var(--green)]">
            <Icon d={icons.lock} size={22} />
          </div>
          <div>
            <div className="text-2xl font-[var(--font-display)] font-black uppercase text-[var(--text)]">
              GSM<span className="text-[var(--green)]">Fix</span>
            </div>
            <div className="text-sm text-[var(--muted)]">Panel de administración</div>
          </div>
        </div>

        {err && (
          <div className="mb-4 rounded-[0.75rem] border border-[#fca5a5] bg-[rgba(239,68,68,0.1)] px-4 py-3 text-sm text-[#f87171]">
            Clave incorrecta. Intentá de nuevo.
          </div>
        )}

        <label className="mb-2 block text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[var(--muted)]" htmlFor="pass">
          Clave de acceso
        </label>
        <input
          id="pass"
          type="password"
          className="mb-4 w-full rounded-[0.75rem] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition duration-200 focus:border-[var(--green)]"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />

        <button
          className="mb-5 inline-flex w-full items-center justify-center gap-2 rounded-[0.75rem] bg-[var(--green)] px-5 py-3 text-sm font-[var(--font-display)] font-extrabold uppercase tracking-[0.05em] text-black transition duration-200 hover:bg-[var(--green-bright)]"
          onClick={submit}
        >
          Ingresar
        </button>

        <div className="text-center">
          <button
            className="text-sm text-[var(--muted)] underline transition hover:text-[var(--green)]"
            onClick={() => navigate("/")}
          >
            ← Volver al sitio
          </button>
        </div>
      </div>
    </div>
  );
}
