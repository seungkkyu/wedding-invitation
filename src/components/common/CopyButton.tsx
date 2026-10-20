"use client";

import { useCopy } from "@/hooks/useCopy";
import { Icon } from "./Icon";

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
      className={`inline-flex shrink-0 items-center gap-1 text-xs text-accent transition-opacity active:opacity-60 ${className}`}
    >
      <Icon name="copy" className="size-3.5" />
      {copied ? "복사됨" : label}
    </button>
  );
}
