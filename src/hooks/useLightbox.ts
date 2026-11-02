"use client";

import { useState } from "react";

/** 사진 크게 보기 상태: 열린 사진 번호와 앞뒤 이동 (끝에서 처음으로 순환) */
export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);

  return {
    index,
    open: (i: number) => setIndex(i),
    close: () => setIndex(null),
    move: (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
  };
}
