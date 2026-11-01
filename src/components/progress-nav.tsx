"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/content";
import { ThemeFlip } from "./theme-flip";

/**
 * Phones and tablets: a bar at the bottom with one segment per section. Each segment's
 * track fills as you read through that section, so you can see where you are and how
 * far along you are. Tap a segment to jump to it.
 */
export function ProgressNav() {
  const [active, setActive] = useState("");
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector<HTMLElement>(link.href));
    let frame = 0;

    const update = () => {
      frame = 0;
      // A section counts as read up to the line 60% down the screen.
      const mark = window.scrollY + window.innerHeight * 0.6;
      let current = "";
      sections.forEach((section, i) => {
        if (!section) return;
        const top = section.offsetTop;
        const progress = Math.min(1, Math.max(0, (mark - top) / section.offsetHeight));
        const fill = fillRefs.current[i];
        if (fill) fill.style.scale = `${progress} 1`;
        if (progress > 0 && progress < 1) current = navLinks[i].href;
      });
      // At the very bottom the last section may never reach the mark; finish it.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        const last = fillRefs.current[navLinks.length - 1];
        if (last) last.style.scale = "1 1";
        current = navLinks[navLinks.length - 1].href;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] lg:hidden"
    >
      <div className="panel mx-auto flex h-[60px] max-w-lg items-center gap-0.5 rounded-2xl [--c-surface:color-mix(in_srgb,var(--c-page)_85%,transparent)] pr-1.5 pl-0.5 min-[360px]:gap-1 min-[360px]:pr-2 min-[360px]:pl-1 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <ul className="flex min-w-0 flex-1 items-stretch">
          {navLinks.map((link, i) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="min-w-0 flex-1">
                <a
                  href={link.href}
                  aria-label={link.label}
                  aria-current={isActive ? "true" : undefined}
                  className="flex h-12 flex-col justify-center gap-1.5 px-1 min-[360px]:px-1.5"
                >
                  <span
                    aria-hidden="true"
                    className={`truncate text-center text-[10px] font-semibold tracking-[-0.01em] min-[360px]:text-[11px] min-[360px]:tracking-normal transition-colors duration-300 ${
                      isActive ? "text-text" : "text-muted"
                    }`}
                  >
                    {link.short}
                  </span>
                  <span aria-hidden="true" className="relative block h-[3px] overflow-hidden rounded-full bg-line">
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-left rounded-full bg-blue [scale:0_1]"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <span aria-hidden="true" className="h-7 w-px shrink-0 bg-line" />
        <ThemeFlip className="ml-0.5 size-9 min-[360px]:ml-1" />
      </div>
    </nav>
  );
}
