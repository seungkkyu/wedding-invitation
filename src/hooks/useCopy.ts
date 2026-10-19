"use client";

import { useCallback, useState } from "react";

// navigator.clipboard는 https/localhost에서만 동작하므로 폴백을 둔다 (폰에서 IP로 접속 테스트 시)
function legacyCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.className = "fixed -top-full opacity-0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export function useCopy(resetMs = 1500) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        legacyCopy(text);
      }
      setCopied(text);
      setTimeout(() => setCopied(null), resetMs);
    },
    [resetMs],
  );

  return { copied, copy };
}
