"use client";

import { Check, Expand } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { RoleView } from "@/lib/content";
import { useImageViewer } from "./image-viewer";

/**
 * StratfAI has three kinds of users, so its screenshots are shown by role: tabs switch
 * the screen and the list of what that role can do. The screen opens full size.
 */
export function RoleSwitcher({ views, project }: { views: RoleView[]; project: string }) {
  const [current, setCurrent] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const pillRef = useRef<HTMLSpanElement>(null);
  const { open, viewer } = useImageViewer();
  const view = views[current];

  // Slides the blue pill under the selected tab.
  useLayoutEffect(() => {
    const tab = tabsRef.current[current];
    const pill = pillRef.current;
    if (!tab || !pill) return;
    const place = () => {
      pill.style.translate = `${tab.offsetLeft}px 0`;
      pill.style.width = `${tab.offsetWidth}px`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(tab);
    return () => observer.disconnect();
  }, [current]);

  // Arrow keys move between tabs, as in any tab list.
  const onKeyDown = (event: KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (current + step + views.length) % views.length;
    setCurrent(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={`${project} views by role`}
        onKeyDown={onKeyDown}
        className="panel no-scrollbar relative flex gap-1 overflow-x-auto rounded-2xl p-1.5 sm:inline-flex"
      >
        <span
          ref={pillRef}
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 left-0 rounded-xl bg-blue shadow-[0_10px_24px_-10px_var(--c-glow)] transition-[translate,width] duration-500 ease-snap"
        />
        {views.map((v, i) => {
          const isCurrent = i === current;
          return (
            <button
              key={v.key}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${v.key}`}
              aria-selected={isCurrent}
              aria-controls={`panel-${v.key}`}
              tabIndex={isCurrent ? 0 : -1}
              onClick={() => setCurrent(i)}
              className={`relative flex-1 rounded-xl px-1.5 py-2.5 text-[12.5px] font-semibold whitespace-nowrap min-[360px]:px-2.5 min-[360px]:text-[13px] sm:px-4 sm:text-sm transition-colors duration-300 sm:flex-none ${
                isCurrent ? "text-white" : "text-muted hover:text-text"
              }`}
            >
              {v.role}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${view.key}`}
        aria-labelledby={`tab-${view.key}`}
        className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-8"
      >
        <button
          type="button"
          onClick={() => open({ ...view, title: `${project}: ${view.role}`, subtitle: view.alt })}
          aria-label={`View the ${view.role.toLowerCase()} screen full size`}
          className="tilt-in panel group relative block overflow-hidden rounded-2xl text-left shadow-[0_50px_100px_-40px_var(--c-glow)]"
        >
          {/* Minimal window bar */}
          <span className="flex h-10 items-center gap-1.5 border-b border-line px-4">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-3 truncate font-mono text-[11px] text-muted">{view.screen}</span>
          </span>
          <span className="relative block" style={{ aspectRatio: `${view.width} / ${view.height}` }}>
            {views.map((v, i) => (
              <Image
                key={v.key}
                src={v.src}
                alt={i === current ? v.alt : ""}
                fill
                quality={90}
                sizes="(min-width: 1024px) 780px, 100vw"
                className={`object-cover object-top transition-[opacity,translate] duration-600 ease-snap ${
                  i === current ? "translate-x-0 opacity-100" : i < current ? "-translate-x-6 opacity-0" : "translate-x-6 opacity-0"
                }`}
              />
            ))}
          </span>
          <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-page/85 text-text opacity-100 shadow-lg backdrop-blur transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <Expand aria-hidden="true" className="size-4" />
          </span>
        </button>

        <div key={view.key} className="enter panel rounded-2xl p-6 [--i:-5]">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">{view.role}</p>
          <p className="mt-1 font-display text-lg font-bold text-text">{view.screen}</p>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            {view.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.6} />
                <span className="text-text/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {viewer}
    </div>
  );
}
