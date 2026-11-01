"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme, useIsDark } from "@/lib/theme";

/**
 * A round button that flips like a coin: the moon face shows in dark mode, the sun
 * face in light mode. The flip direction comes from CSS, so the server never needs
 * to know the theme.
 */
export function ThemeFlip({ className = "" }: { className?: string }) {
  const isDark = useIsDark();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className={`group grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-text transition-colors duration-300 hover:border-accent/50 [perspective:300px] ${className}`}
    >
      <span className="relative size-[18px] transition-transform duration-700 ease-snap [transform-style:preserve-3d] light:[transform:rotateY(180deg)]">
        <Moon
          aria-hidden="true"
          className="absolute inset-0 size-[18px] [backface-visibility:hidden]"
          strokeWidth={2.2}
        />
        <Sun
          aria-hidden="true"
          className="absolute inset-0 size-[18px] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          strokeWidth={2.2}
        />
      </span>
    </button>
  );
}
