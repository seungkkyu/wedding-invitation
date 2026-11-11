import { Bride, Groom } from "@/components/pixel/Characters";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { BUSH_FRAMES, BUSH_PALETTE, HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { EasterEgg } from "./EasterEgg";

export function Cover() {
  const { groom, bride } = wedding;

  return (
    <section className="flex min-h-dvh flex-col">
      {/* TODO: 대표 사진으로 교체 (next/image). 사진을 빠르게 5번 누르면 이스터에그 */}
      <EasterEgg className="relative mx-6 mt-16 flex flex-1 items-center justify-center bg-ivory pixel-box">
        <span className="font-pixel text-xs text-muted">Main Photo</span>
      </EasterEgg>

      <div className="px-8 pt-10 text-center font-pixel">
        <p className="text-xs tracking-[0.3em] text-accent">{formatWeddingDateDots()}</p>
        <h1 className="mt-5 flex items-center justify-center gap-3 text-2xl text-ink">
          {groom.name}
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-5 w-6 animate-twinkle" />
          {bride.name}
        </h1>
        <p className="mt-5 text-xs leading-6 text-muted">
          {formatWeddingDate()}
          <br />
          {venueLabel}
        </p>
      </div>

      {/* 꽃덤불 사이에 선 두 사람과 잔디 바닥 */}
      <div aria-hidden className="relative mt-6 flex h-24 items-end justify-center gap-1">
        <PixelSprite frames={BUSH_FRAMES} palette={BUSH_PALETTE} className="mr-3 h-9 w-14" />
        <Groom className="h-20 w-15" />
        <Bride className="h-20 w-15" />
        <PixelSprite frames={BUSH_FRAMES} palette={BUSH_PALETTE} className="ml-3 h-9 w-14" />
      </div>
      <div aria-hidden className="h-4 border-t-4 border-[#6fb07a] bg-[#3f8a55]" />
    </section>
  );
}
