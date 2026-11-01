"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 text-sm font-semibold text-black transition-colors hover:border-neutral-500"
    >
      <Printer aria-hidden="true" className="size-4" />
      Print
    </button>
  );
}
