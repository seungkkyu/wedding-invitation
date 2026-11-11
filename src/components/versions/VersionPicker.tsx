import Link from "next/link";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { VERSIONS, type VersionId, versionHref } from "@/lib/versions";

const { groom, bride } = wedding;

/**
 * 홈: 다섯 가지 청첩장 디자인 중 하나를 고르는 화면.
 * 각 항목은 해당 디자인의 표지를 축소한 견본처럼 그 디자인의 색과 글꼴로 그린다.
 */
export function VersionPicker() {
  return (
    <main className="mx-auto min-h-dvh max-w-[480px] bg-[#efedea] text-ink shadow-[0_0_40px_rgba(47,42,37,0.08)]">
      <header className="px-7 pt-16 pb-10">
        <h1 className="font-serif text-[2rem] leading-tight font-bold tracking-tight text-balance">
          {groom.name}
          <span className="mx-2 font-normal text-muted">그리고</span>
          {bride.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          {formatWeddingDate()}
          <br />
          {venueLabel}
        </p>
        <p className="mt-8 text-[15px] leading-relaxed text-pretty text-ink/80">
          같은 초대를 다섯 가지 모습으로 준비했어요. 마음이 가는 디자인으로 열어 보세요.
        </p>
      </header>

      <ul className="flex flex-col gap-3 px-3 pb-16">
        {VERSIONS.map((version) => (
          <li key={version.id}>
            <Link
              href={versionHref(version.id)}
              className="group block overflow-hidden rounded-[3px] outline-offset-4 outline-ink transition-[transform,filter] duration-200 hover:brightness-[1.03] focus-visible:outline-2 active:scale-[0.985]"
            >
              <Swatch id={version.id} label={version.label} description={version.description} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

type SwatchProps = { id: VersionId; label: string; description: string };

function Swatch({ id, label, description }: SwatchProps) {
  switch (id) {
    case "pixel":
      return (
        <div className="relative h-52 bg-night px-6 py-6 text-gold">
          {[
            ["14%", "70%"],
            ["30%", "86%"],
            ["10%", "50%"],
            ["46%", "93%"],
          ].map(([top, left]) => (
            <span key={`${top}${left}`} aria-hidden className="absolute size-1 bg-gold/70" style={{ top, left }} />
          ))}
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="absolute right-8 bottom-8 h-12 w-14" />
          <Caption label={label} description={description} className="font-pixel" muted="text-gold/65" />
          <p className="absolute bottom-6 left-6 font-pixel text-xs text-white/55">{formatWeddingDateDots()}</p>
        </div>
      );
    case "film":
      return (
        <div className="relative h-48 bg-[#0e0d0c] px-9 py-6 text-[#efe6d6]">
          <Sprockets />
          <Caption label={label} description={description} className="font-typewriter" muted="text-[#efe6d6]/55" />
          <p className="absolute bottom-5 left-9 font-cinema text-[2.6rem] leading-none tracking-wide">
            {groom.name} <span className="text-[#d9a441]">&amp;</span> {bride.name}
          </p>
        </div>
      );
    case "magazine":
      return (
        <div className="relative h-56 bg-[#f4f1ec] px-6 py-6 text-[#171513] ring-1 ring-black/5 ring-inset">
          <p className="font-display text-[4.2rem] leading-[0.85] font-semibold tracking-tight italic">Wedding</p>
          <p className="mt-1 font-display text-xs tracking-[0.08em]">Special issue, {wedding.date.year}</p>
          <div className="absolute right-6 bottom-6 left-6 border-t-2 border-[#171513] pt-3">
            <Caption label={label} description={description} className="font-headline font-extrabold" muted="text-[#171513]/60" />
          </div>
        </div>
      );
    case "letter":
      return (
        <div className="relative h-44 bg-paper px-6 py-6 text-[#4a3f3a] ring-1 ring-[#4a3f3a]/8 ring-inset">
          <Caption label={label} description={description} className="font-garamond" muted="text-[#4a3f3a]/60" />
          {/* 봉투 덮개의 접힌 선 */}
          <svg aria-hidden viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full">
            <path d="M0 30 L50 4 L100 30" fill="none" stroke="#c9b8a8" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <p className="absolute right-6 bottom-6 font-script text-4xl text-[#8c6f5e]">with love</p>
        </div>
      );
    case "scrapbook":
      return (
        <div className="relative h-52 bg-[#f4ecdd] bg-[radial-gradient(rgba(120,95,60,0.17)_1px,transparent_1.4px)] bg-[length:20px_20px] px-6 py-6 text-ink">
          <span aria-hidden className="absolute -top-1 right-16 h-6 w-20 rotate-[8deg] bg-[#e7c9a9]/80" />
          <div aria-hidden className="absolute right-7 bottom-7 h-24 w-20 rotate-[-6deg] bg-white p-1.5 pb-5 shadow-[0_3px_8px_rgba(47,42,37,0.18)]">
            <div className="h-full bg-[#d8cdbb]" />
          </div>
          <Caption label={label} description={description} className="font-hand text-[1.3rem]" muted="text-ink/60" />
          <p className="absolute bottom-6 left-6 -rotate-2 font-hand text-2xl text-[#b0563f]">우리 결혼해요!</p>
        </div>
      );
  }
}

function Caption({
  label,
  description,
  className,
  muted,
}: {
  label: string;
  description: string;
  className: string;
  muted: string;
}) {
  return (
    <div className={className}>
      <p className="text-[1.125em] leading-snug">{label}</p>
      <p className={`mt-0.5 text-[0.875em] ${muted}`}>{description}</p>
    </div>
  );
}

/** 필름 양옆 구멍 */
function Sprockets() {
  const strip =
    "absolute inset-y-0 w-1.5 bg-[linear-gradient(180deg,rgba(239,230,214,0.18)_50%,transparent_0)] bg-size-[100%_14px]";
  return (
    <div aria-hidden>
      <span className={`${strip} left-3`} />
      <span className={`${strip} right-3`} />
    </div>
  );
}
