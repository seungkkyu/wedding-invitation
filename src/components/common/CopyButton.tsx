"use client";

import { useCopy } from "@/hooks/useCopy";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "복사", className = "" }: CopyButtonProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={`shrink-0 rounded-md border border-stone-300 px-2.5 py-1 text-xs text-ink transition-colors active:bg-stone-100 ${className}`}
    >
      {copied ? "복사됨" : label}
    </button>
  );
}
