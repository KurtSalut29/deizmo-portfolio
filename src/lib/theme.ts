import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Page colors of each theme; the curtain columns are painted in the incoming one.
const pageColor: Record<Theme, string> = { dark: "#0a0f1e", light: "#f4f6fb" };

// The theme lives on <html data-theme>, set before paint by the script in layout.tsx.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/** True while the dark theme is on. Re-renders when any control changes the theme. */
export function useIsDark() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme !== "light",
    () => true,
  );
}

let switching = false;

/**
 * Switches theme with a column curtain, echoing the layout grid: columns in the new
 * page color drop down one after another, the theme swaps behind them, then they lift
 * away in the same order. Reduced motion swaps instantly.
 */
export async function toggleTheme() {
  if (switching) return;
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "light" ? "dark" : "light";
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  switching = true;
  const count = window.innerWidth < 640 ? 6 : 12;
  const curtain = document.createElement("div");
  curtain.setAttribute("aria-hidden", "true");
  curtain.style.cssText = `position:fixed;inset:0;z-index:100;display:grid;grid-template-columns:repeat(${count},1fr);pointer-events:none`;
  const columns = Array.from({ length: count }, () => {
    const column = document.createElement("div");
    column.style.cssText = `background:${pageColor[next]};transform:scaleY(0);transform-origin:top`;
    curtain.append(column);
    return column;
  });
  document.body.append(curtain);

  const easing = "cubic-bezier(0.65, 0, 0.35, 1)";
  await Promise.all(
    columns.map(
      (column, i) =>
        column.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], {
          duration: 380,
          delay: i * 28,
          easing,
          fill: "forwards",
        }).finished,
    ),
  );

  apply();

  await Promise.all(
    columns.map((column, i) => {
      column.style.transformOrigin = "bottom";
      return column.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], {
        duration: 380,
        delay: 60 + i * 28,
        easing,
        fill: "forwards",
      }).finished;
    }),
  );

  curtain.remove();
  switching = false;
}
