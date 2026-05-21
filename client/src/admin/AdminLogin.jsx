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
