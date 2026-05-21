// src/hooks/useBanner.js
import { useState, useEffect } from "react";

let _bannerUrl = null;
const listeners = new Set();

export function useBanner() {
  const [url, setUrl] = useState(_bannerUrl);

  useEffect(() => {
    listeners.add(setUrl);
    return () => listeners.delete(setUrl);
  }, []);

  const setBanner = (url) => {
    _bannerUrl = url;
    listeners.forEach((fn) => fn(url));
  };

  return [url, setBanner];
}
