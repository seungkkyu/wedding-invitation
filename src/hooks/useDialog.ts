"use client";

import { type RefObject, useEffect, useRef } from "react";
import { useScrollLock } from "./useScrollLock";

// 창이 겹쳐 열릴 수 있어서(예: 축하 입력 창 위로 출국 장면) ESC는 맨 위 창만 닫는다
const openDialogs: symbol[] = [];

/** 대화상자 요소에 붙일 속성. tabIndex는 열릴 때 포커스를 받기 위해 필요하다 */
export const dialogProps = { role: "dialog", "aria-modal": true, tabIndex: -1 } as const;

/**
 * 화면 위에 뜨는 창의 공통 동작.
 * - 뒤 페이지 스크롤 잠금
 * - 열리면 창으로 포커스 이동, 닫히면 창을 연 버튼으로 포커스 복귀
 * - ESC로 닫기 (onClose가 없으면 ESC로 닫히지 않는다)
 * 창 요소에는 ref와 {...dialogProps}, aria-label을 붙인다.
 */
export function useDialog(ref: RefObject<HTMLElement | null>, onClose?: () => void) {
  useScrollLock();

  // ESC 핸들러가 항상 최신 onClose를 부르도록 (매 렌더 새 함수가 와도 리스너는 한 번만 등록)
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const id = Symbol("dialog");
    openDialogs.push(id);
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    ref.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || openDialogs.at(-1) !== id || !onCloseRef.current) return;
      event.preventDefault();
      onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      openDialogs.splice(openDialogs.indexOf(id), 1);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [ref]);
}
