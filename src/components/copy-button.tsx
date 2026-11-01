"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

const styles = {
  default: "h-11 rounded-full border-line bg-surface text-text hover:border-accent/50 hover:bg-raised",
  onDark: "h-12 rounded-xl border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10",
};

export function CopyButton({
  value,
  label,
  variant = "default",
  className = "",
}: {
  value: string;
  label: string;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          window.location.href = `mailto:${value}`;
        }
      }}
      className={`inline-flex shrink-0 items-center justify-center gap-2 border px-5 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
