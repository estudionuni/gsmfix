import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);

  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />;
  return <AdminPanel onLogout={() => setAuth(false)} />;
}
