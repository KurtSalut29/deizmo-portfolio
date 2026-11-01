"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Certificate } from "@/lib/content";
import { useImageViewer } from "./image-viewer";

/**
 * Certificates as a small deck: the front card is the one being read, the others peek
 * out behind it. Next and previous shuffle the deck; the list jumps straight to one.
 */
export function CertificateDeck({ items }: { items: Certificate[] }) {
  const [front, setFront] = useState(0);
  const { open, viewer } = useImageViewer();
  const cert = items[front];
  const go = (step: number) => setFront((front + step + items.length) % items.length);

  const view = (c: Certificate) =>
    open({
      src: c.image,
      alt: `${c.title} ${c.kind.toLowerCase()} awarded to Jhuana Deizmo by ${c.issuer}.`,
      title: `${c.title}`,
      subtitle: `${c.kind} · ${c.issuer} · ${c.date}`,
      width: c.width,
      height: c.height,
      pdf: c.pdf,
    });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
      {/* Deck */}
      <div className="relative mx-auto aspect-[3/2] w-full max-w-[620px]">
        {items.map((c, i) => {
          // 0 = front, 1 = behind it, 2 = at the back.
          const depth = (i - front + items.length) % items.length;
          return (
            <button
              key={c.key}
              type="button"
              tabIndex={depth === 0 ? 0 : -1}
              aria-hidden={depth !== 0}
              onClick={() => (depth === 0 ? view(c) : setFront(i))}
              aria-label={`View ${c.title} ${c.kind.toLowerCase()} full size`}
              className="group absolute top-0 left-0 h-[calc(100%-1.75rem)] w-[calc(100%-2.25rem)] rounded-xl border border-line bg-white p-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] transition-[translate,rotate,scale,opacity] duration-700 ease-snap"
              style={{
                zIndex: items.length - depth,
                translate: `${depth * 18}px ${depth * 14}px`,
                rotate: `${depth * 2.5}deg`,
                scale: `${1 - depth * 0.04}`,
                opacity: depth === 2 ? 0.75 : 1,
              }}
            >
              <span className="relative block size-full overflow-hidden rounded-md">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 580px, 92vw"
                  className="object-contain"
                />
              </span>
              {depth === 0 && (
                <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-[#0a0f1e]/85 text-white shadow-lg sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <Expand aria-hidden="true" className="size-4" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Details of the front card */}
      <div>
        <div key={cert.key} className="enter [--i:-5]">
          <p className="font-mono text-xs tracking-wide text-accent uppercase">
            {cert.kind} · <time dateTime={cert.dateTime}>{cert.date}</time>
          </p>
          <h3 className="mt-3 text-2xl leading-tight font-bold sm:text-[1.75rem]">{cert.title}</h3>
          <p className="mt-2">{cert.issuer}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => view(cert)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-hover"
          >
            <Expand aria-hidden="true" className="size-4" />
            View full size
          </button>
          <a
            href={cert.pdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-line bg-raised px-4 text-sm font-semibold text-text transition-colors hover:border-accent/50"
          >
            Open PDF
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous certificate"
            className="grid size-11 place-items-center rounded-full border border-line bg-raised text-text transition-colors hover:border-accent/50"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next certificate"
            className="grid size-11 place-items-center rounded-full border border-line bg-raised text-text transition-colors hover:border-accent/50"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
          <p className="font-mono text-sm text-muted" aria-live="polite">
            {front + 1} / {items.length}
          </p>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {items.map((c, i) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => setFront(i)}
                aria-current={i === front ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-4 py-3 text-left text-sm transition-colors ${
                  i === front ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{c.title}</span>
                  <span className="block text-xs text-muted">{c.kind}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`size-2 shrink-0 rounded-full transition-colors ${i === front ? "bg-blue" : "bg-line"}`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {viewer}
    </div>
  );
}
