"use client";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { Icon } from "@/components/common/Icon";
import { useCopy } from "@/hooks/useCopy";
import { useIntroStore } from "@/store/introStore";
import { EasterEgg } from "./EasterEgg";

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
    <footer className="border-t border-line px-8 pt-14 pb-28 text-center">
      <p className="font-display text-xl text-accent italic">Thank you</p>
      <p className="mt-3 text-[13px] leading-6 text-muted">함께해 주셔서 감사합니다.</p>
      <div className="mt-10 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-1.5 bg-[#fee500] py-3.5 text-[13px] text-[#191919]"
        >
          <Icon name="share" />
          카카오톡 공유
        </button>
        <button
          type="button"
          onClick={() => copy(window.location.href)}
          className="flex items-center justify-center gap-1.5 border border-ink/80 py-3.5 text-[13px] text-ink"
        >
          <Icon name="link" />
          {copied ? "복사되었습니다" : "링크 복사"}
        </button>
      </div>
      <div className="mt-12 flex flex-col items-center gap-8">
        <EasterEgg className="flex flex-col items-center gap-2">
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-6 w-7 animate-twinkle" />
          <span className="font-pixel text-[11px] text-muted">하트를 연속으로 눌러보세요</span>
        </EasterEgg>
        <button type="button" onClick={replayIntro} className="flex items-center gap-1.5 text-xs text-muted">
          <Icon name="replay" className="size-3.5" />
          인트로 다시 보기
        </button>
      </div>
    </footer>
  );
}
