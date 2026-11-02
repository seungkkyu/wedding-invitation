"use client";

import { useEffect } from "react";

// 우클릭(데스크톱)·길게 누르기(안드로이드) 메뉴와 끌어서 저장하기를 사진에서 막는다.
// iOS 길게 누르기 메뉴와 선택은 globals.css의 img 기본 스타일에서 막는다.
// 스크린샷이나 개발자 도구까지 막을 수는 없으므로 '가볍게 저장하기 어렵게' 하는 정도다.
const isImage = (target: EventTarget | null) => target instanceof HTMLImageElement;

export function ImageGuard() {
  useEffect(() => {
    const block = (event: Event) => {
      if (isImage(event.target)) event.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
