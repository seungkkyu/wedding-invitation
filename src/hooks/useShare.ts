"use client";

import { useCopy } from "./useCopy";

/** 공유 버튼 공통 동작: Web Share → 안 되면 링크 복사 */
export function useShare() {
  const { copied, copy } = useCopy();

  // TODO: Kakao JS SDK 연동 후 카카오톡 공유로 교체
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch {
        // 사용자가 공유를 취소한 경우
      }
      return;
    }
    copy(url);
  };

  const copyLink = () => copy(window.location.href);

  return { share, copyLink, copied: copied !== null };
}
