"use client";

import { useEffect } from "react";

/** 오버레이가 떠 있는 동안 뒤의 페이지 스크롤을 잠근다 */
export function useScrollLock() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}
