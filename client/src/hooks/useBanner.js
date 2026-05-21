import { useEffect, useState } from "react";

const STORAGE_KEY = "gsmfix-banner-url";

function readStoredBanner() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

let _bannerUrl = readStoredBanner();
const listeners = new Set();

export function useBanner() {
  const [url, setUrl] = useState(_bannerUrl);

  useEffect(() => {
    listeners.add(setUrl);
    return () => listeners.delete(setUrl);
  }, []);

  const setBanner = (nextUrl) => {
    _bannerUrl = nextUrl;
    try {
      if (typeof window !== "undefined") {
        if (nextUrl) window.localStorage.setItem(STORAGE_KEY, nextUrl);
        else window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
    listeners.forEach((fn) => fn(nextUrl));
  };

  return [url, setBanner];
}
