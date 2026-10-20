"use client";

import { useEffect } from "react";

// 오버레이가 겹쳐 열릴 수 있어서(예: 입력 창이 닫히는 중에 출국 장면이 열림) 잠금 개수를 센다.
// 각자 이전 값을 저장했다 되돌리면 닫히는 순서에 따라 잠긴 상태로 남을 수 있다.
let locks = 0;
let originalOverflow = "";

/** 오버레이가 떠 있는 동안 뒤의 페이지 스크롤을 잠근다 */
export function useScrollLock() {
  useEffect(() => {
    if (locks === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    locks++;
    return () => {
      locks--;
      if (locks === 0) document.body.style.overflow = originalOverflow;
    };
  }, []);
}
