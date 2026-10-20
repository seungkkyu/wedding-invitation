import { wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { EasterEgg } from "./EasterEgg";

export function Cover() {
  const { groom, bride, venue } = wedding;

  return (
    <section className="flex min-h-dvh flex-col">
      {/* TODO: 대표 사진으로 교체 (next/image). 사진을 빠르게 5번 누르면 이스터에그 */}
      <EasterEgg className="relative mx-5 mt-5 flex flex-1 items-center justify-center bg-[#e8e1d6]">
        <span className="font-display text-sm text-muted italic">Main Photo</span>
      </EasterEgg>
      <div className="px-8 pt-12 pb-14 text-center">
        <p className="font-display text-[13px] tracking-[0.35em] text-accent lining-nums">{formatWeddingDateDots()}</p>
        <h1 className="mt-6 flex items-center justify-center gap-4 font-serif text-[1.6rem] text-ink">
          {groom.name}
          <span className="font-display text-lg text-accent italic">&amp;</span>
          {bride.name}
        </h1>
        <span className="mx-auto mt-7 block h-px w-6 bg-accent/40" />
        <p className="mt-7 text-[13px] leading-6 text-muted">
          {formatWeddingDate()}
          <br />
          {venue.name} {venue.hall}
        </p>
      </div>
    </section>
  );
}
