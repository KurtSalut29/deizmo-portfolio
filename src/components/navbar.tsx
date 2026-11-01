"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navLinks, profile } from "@/lib/content";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeFlip } from "./theme-flip";

const hrefs = ["#top", ...navLinks.map((link) => link.href)];

/**
 * Large screens: a morphing bar. At the top of the page it's a clean, transparent
 * full-width bar; once you scroll it shrinks into a compact centered glass pill (the name and
 * the résumé label fold away). A solid blue pill slides to the section you're reading.
 * Phones use the progress bar at the bottom instead.
 */
export function Navbar() {
  const active = useActiveSection(hrefs);
  const [compact, setCompact] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 80);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Moves the blue pill onto the active link, straight from the DOM so it follows width
  // changes (fonts loading, the bar morphing) without extra renders.
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    const place = () => {
      const link = list.querySelector<HTMLElement>(`a[href="${active}"]`);
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      // Coming back from hidden: appear in place instead of sliding in from afar.
      const wasHidden = pill.style.opacity !== "1";
      if (wasHidden) pill.style.transitionProperty = "opacity";
      pill.style.translate = `${link.offsetLeft}px 0`;
      pill.style.width = `${link.offsetWidth}px`;
      if (wasHidden) {
        void pill.offsetWidth;
        pill.style.transitionProperty = "";
      }
      pill.style.opacity = "1";
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // Folding labels: a one-column grid that animates its column from 1fr to 0fr.
  const fold = `grid transition-[grid-template-columns,opacity,margin] duration-500 ease-snap ${
    compact ? "grid-cols-[0fr] opacity-0" : "grid-cols-[1fr] opacity-100"
  }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-8 pt-4 lg:flex">
      <nav
        aria-label="Main"
        className={`flex items-center justify-between gap-2 rounded-full border transition-[width,height,padding,background-color,border-color,box-shadow] duration-700 ease-snap [interpolate-size:allow-keywords] ${
          compact
            ? "nav-glass h-14 w-auto pr-1.5 pl-1.5"
            : "h-16 w-[1136px] max-w-full border-transparent bg-transparent pr-0 pl-0"
        }`}
      >
        <a href="#top" className="enter group flex shrink-0 items-center" aria-label={`${profile.name}, back to top`}>
          <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(140deg,#4a80f5,#2257d6)] font-mono text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_var(--c-glow)] transition-transform duration-500 ease-snap group-hover:-rotate-12">
            JD
          </span>
          <span className={`${fold} ${compact ? "ml-0" : "ml-3"}`}>
            <span className="min-w-0 overflow-hidden font-display text-[1.05rem] font-bold whitespace-nowrap text-text">
              {profile.name}
            </span>
          </span>
        </a>

        <ul
          ref={listRef}
          className={`enter relative flex items-center gap-0.5 transition-[margin] duration-700 ease-snap ${compact ? "mx-2" : "mx-0"}`}
          style={{ "--i": 1 } as CSSProperties}
        >
          <span
            ref={pillRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(180deg,#4a80f5,#2f6bf0)] opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_22px_-8px_var(--c-glow)] transition-[translate,width,opacity] duration-500 ease-snap"
          />
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="enter flex shrink-0 items-center gap-2" style={{ "--i": 2 } as CSSProperties}>
          <ThemeFlip className="glass-chip rounded-full" />
          <Link
            href="/resume"
            aria-label="Résumé"
            className="group inline-flex h-10 items-center rounded-full bg-text px-3 text-sm font-semibold text-page transition-[background-color,padding] duration-500 ease-snap hover:bg-accent"
          >
            <FileText aria-hidden="true" className="size-4 shrink-0" />
            <span className={`${fold} ${compact ? "ml-0" : "ml-2"}`}>
              <span className="min-w-0 overflow-hidden whitespace-nowrap">Résumé</span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
