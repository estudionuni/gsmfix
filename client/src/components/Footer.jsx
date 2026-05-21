// src/components/Footer.jsx
import { navigate } from "../hooks/useRouter";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-card)] px-6 py-6 text-center text-sm text-[var(--muted)]">
      <p>
        © {new Date().getFullYear()} GSMFix · José Hernández 32, Luis Guillón · Todos los derechos reservados
      </p>
      <p className="mt-1 text-sm">
        <button
          onClick={() => navigate("/panel")}
          className="text-[var(--muted)] underline transition hover:text-[var(--green)]"
        >
          Panel admin
        </button>
      </p>
    </footer>
  );
}
