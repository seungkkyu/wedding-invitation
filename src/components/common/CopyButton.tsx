"use client";

import { useCopy } from "@/hooks/useCopy";
import { Icon } from "./Icon";

type CopyButtonProps = {
  text: string;
  label?: string;
  copiedLabel?: string;
  /** 앞에 복사 아이콘을 붙일지 */
  icon?: boolean;
  iconClassName?: string;
  /** 글자 크기·색·모양. 주면 기본값(text-xs text-accent)을 대신한다 */
  className?: string;
};

/** 복사 버튼. 복사할 내용이 비어 있으면 그리지 않는다 */
export function CopyButton({
  text,
  label = "복사",
  copiedLabel = "복사됨",
  icon = true,
  iconClassName = "size-3.5",
  className = "",
}: CopyButtonProps) {
  const { copied, copy } = useCopy();
  if (!text) return null;

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={`inline-flex shrink-0 items-center gap-1 transition-opacity active:opacity-60 ${className || "text-xs text-accent"}`}
    >
      {icon && <Icon name="copy" className={iconClassName} />}
      {copied ? copiedLabel : label}
    </button>
  );
}
