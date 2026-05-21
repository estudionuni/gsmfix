// src/components/Footer.jsx
import { navigate } from "../hooks/useRouter";

export default function Footer() {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()} GSMFix · José Hernández 32, Luis Guillón ·
        Todos los derechos reservados
      </p>
      <p style={{ marginTop: "0.375rem", fontSize: "0.75rem" }}>
        <button
          onClick={() => navigate("/panel")}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: "0.75rem",
            textDecoration: "underline",
          }}
        >
          Panel admin
        </button>
      </p>
    </footer>
  );
}
