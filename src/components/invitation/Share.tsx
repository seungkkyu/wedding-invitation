"use client";

import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { Icon } from "@/components/common/Icon";
import { ReplayIntroButton } from "@/components/common/ReplayIntroButton";
import { useShare } from "@/hooks/useShare";
import { EasterEgg } from "./EasterEgg";

export function Share() {
  const { share, copyLink, copied } = useShare();

  return (
    <footer className="px-8 pt-14 pb-28 text-center font-pixel">
      <p className="text-xl text-accent">Thank you!</p>
      <p className="mt-3 text-xs leading-6 text-muted">함께해 주셔서 감사합니다.</p>
      <div className="mt-10 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-1.5 bg-[#fee500] min-h-12 text-xs text-[#191919] pixel-btn [--pixel-border:#fee500]"
        >
          <Icon name="share" />
          카카오톡 공유
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-1.5 min-h-12 bg-ivory text-xs text-ink pixel-btn [--pixel-border:var(--color-control)]"
        >
          <Icon name="link" />
          {copied ? "복사되었습니다" : "링크 복사"}
        </button>
      </div>
      <div className="mt-12 flex flex-col items-center gap-8">
        <EasterEgg className="flex flex-col items-center gap-2">
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-6 w-7 animate-twinkle" />
          <span className="text-[11px] text-muted">하트를 연속으로 눌러보세요</span>
        </EasterEgg>
        <ReplayIntroButton className="text-muted" />
      </div>
    </footer>
  );
}
