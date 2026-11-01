"use client";

import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export type ViewerItem = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  width: number;
  height: number;
  pdf?: string;
};

/**
 * A full-size viewer for screenshots and certificates. Returns `open(item)` and the
 * dialog element to render once. A bottom sheet on phones, a centered panel from sm up.
 */
export function useImageViewer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<ViewerItem | null>(null);

  const open = (next: ViewerItem) => {
    setItem(next);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const viewer = (
    <dialog
      ref={dialogRef}
      aria-label={item?.title ?? "Image viewer"}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="viewer mt-auto mb-0 w-full max-w-none overflow-hidden rounded-t-[24px] bg-surface p-0 text-text sm:m-auto sm:w-[min(92vw,1000px)] sm:rounded-[24px]"
    >
      {item && (
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="font-display text-base font-semibold text-text sm:text-lg">{item.title}</p>
              {item.subtitle && <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-raised text-text transition-colors hover:bg-line"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-raised p-4 sm:p-6">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              quality={90}
              sizes="(min-width: 640px) 1000px, 100vw"
              className="mx-auto h-auto max-h-[70dvh] w-auto rounded-xl object-contain shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)]"
            />
          </div>

          {item.pdf && (
            <div className="flex justify-end border-t border-line px-5 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-6 sm:pb-3">
              <a
                href={item.pdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-hover"
              >
                Open PDF
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </dialog>
  );

  return { open, viewer };
}
