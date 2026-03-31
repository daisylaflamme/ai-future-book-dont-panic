import { useState, useEffect } from "react";

export type LayoutMode = "single" | "spread";

/**
 * Returns "single" for phones and portrait tablets, "spread" for landscape tablets and desktop.
 * - Phone: always single (< 768px)
 * - Tablet portrait: single (768-1024px, portrait)
 * - Tablet landscape: spread (768-1024px, landscape)
 * - Desktop: spread (> 1024px)
 */
export function useLayoutMode(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>("spread");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 768) {
        setMode("single");
      } else if (w <= 1024 && h > w) {
        // tablet portrait
        setMode("single");
      } else {
        setMode("spread");
      }
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return mode;
}
