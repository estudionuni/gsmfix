import Landing from "./components/Landing";
import AdminPage from "./admin/AdminPage";
import { useRouter } from "./hooks/useRouter";

export default function App() {
  const path = useRouter();
  return path.startsWith("/panel") ? <AdminPage /> : <Landing />;
}
