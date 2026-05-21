import { useEffect, useState } from "react";

function getPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

export function useRouter() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const handler = () => setPath(getPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return path;
}

export const useHash = useRouter;

export function navigate(path) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
