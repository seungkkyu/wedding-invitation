"use client";

import { useCopy } from "@/hooks/useCopy";
import { useIntroStore } from "@/store/introStore";

export function Share() {
  const { copied, copy } = useCopy();
  const replay = useIntroStore((s) => s.replay);

  // TODO: Kakao JS SDK 연동 후 카카오톡 공유로 교체. 지금은 Web Share → 링크 복사 폴백
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

  const replayIntro = () => {
    window.scrollTo({ top: 0 });
    replay();
  };

  return (
    <footer className="px-6 pt-8 pb-16 text-center">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={share} className="rounded-md bg-[#fee500] py-3 text-sm text-[#191919]">
          카카오톡 공유하기
        </button>
        <button
          type="button"
          onClick={() => copy(window.location.href)}
          className="rounded-md border border-stone-300 py-3 text-sm text-ink"
        >
          {copied ? "복사되었습니다" : "링크 복사하기"}
        </button>
      </div>
      <button type="button" onClick={replayIntro} className="mt-10 font-pixel text-xs text-muted">
        ▶ 인트로 다시 보기
      </button>
    </footer>
  );
}
