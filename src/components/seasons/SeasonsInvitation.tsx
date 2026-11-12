"use client";

import type { ReactNode } from "react";
import {
  AccountBlock,
  AmbientPage,
  CeremonyBlock,
  ContactBlock,
  GreetingBlock,
  PhotoStrip,
  ShareBlock,
  type Tone,
} from "@/components/ambient/blocks";
import { Icon } from "@/components/common/Icon";
import { venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { type YearChapter, yearChapters } from "@/lib/years";
import { type Mood, Weather } from "./Weather";

const { groom, bride, firstDay, date } = wedding;

const SEASON_NAME = { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" } as const;

const LIGHT: Omit<Tone, "text" | "soft"> = {
  line: "border-current/15",
  card: "rounded-[20px] bg-white/55",
  tile: "rounded-full bg-white/55",
  chip: "rounded-full bg-white/70",
  button: "rounded-full bg-[#2b3a2e] text-[#fbf6e6]",
  ghost: "rounded-full bg-white/60",
  accent: "font-serif",
  photo: "rounded-[20px]",
};

// 계절 배경 밝기에 맞춘 글자색
const TONE: Record<Mood, Tone> = {
  spring: { ...LIGHT, text: "text-[#3d3236]", soft: "text-[#3d3236]/65" },
  summer: { ...LIGHT, text: "text-[#eef3e6]", soft: "text-[#eef3e6]/70", card: "rounded-[20px] bg-white/10" },
  autumn: { ...LIGHT, text: "text-[#3a2618]", soft: "text-[#3a2618]/70" },
  winter: { ...LIGHT, text: "text-[#26323d]", soft: "text-[#26323d]/65" },
  wedding: { ...LIGHT, text: "text-[#2b3a2e]", soft: "text-[#2b3a2e]/65" },
};

/** 한 해 한 장: 큰 연도, 그해 두 사람의 일, 그해 세상의 일 */
function Year({ chapter }: { chapter: YearChapter }) {
  const tone = TONE[chapter.season];
  return (
    <section data-section={chapter.season} className={`flex min-h-[62dvh] flex-col justify-center px-8 py-16 ${tone.text}`}>
      <h2 className="font-garamond text-[5.5rem] leading-[0.9] font-light tracking-[-0.02em] lining-nums">{chapter.year}</h2>
      <p className={`mt-3 text-sm ${tone.soft}`}>
        {chapter.month}월의 {SEASON_NAME[chapter.season]}
        {chapter.dayNumber && `, 함께한 지 ${chapter.dayNumber.toLocaleString("ko-KR")}일째`}
      </p>
      {chapter.title && <p className="mt-8 font-serif text-[1.35rem] leading-snug">{chapter.title}</p>}
      {chapter.text && <p className={`mt-3 font-serif text-[15px] leading-7 ${tone.soft}`}>{chapter.text}</p>}
      {chapter.world && (
        <p className={`mt-8 border-l-2 pl-3 text-[13px] leading-6 ${tone.soft} ${tone.line}`}>그해에는 {chapter.world}.</p>
      )}
    </section>
  );
}

function Part({ title, children, flush = false, className = "" }: { title: string; children: ReactNode; flush?: boolean; className?: string }) {
  return (
    <section data-section="wedding" className={`py-24 ${TONE.wedding.text} ${className}`}>
      <h2 className="px-8 font-serif text-[1.4rem]">{title}</h2>
      <div className={`mt-10 ${flush ? "" : "px-8"}`}>{children}</div>
    </section>
  );
}

const chapters = yearChapters();
const firstSeason = chapters[0]?.season ?? "summer";

/** 계절 버전: 처음 만난 해부터 예식 전 해까지 해마다 한 장, 배경 계절이 그해 기억을 따라 바뀐다 */
export function SeasonsInvitation() {
  const cover = TONE[firstSeason];

  return (
    <AmbientPage<Mood> initial={firstSeason} className="bg-[#0d2622]" backdrop={(mood) => <Weather mood={mood} />}>
      <section data-section={firstSeason} className={`flex min-h-dvh flex-col justify-end px-8 pb-24 ${cover.text}`}>
        <p className={`font-garamond text-2xl lining-nums ${cover.soft}`}>
          {firstDay.year} – {date.year}
        </p>
        <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.3]">
          {groom.name}
          <br />
          {bride.name}
        </h1>
        <p className="mt-6 font-serif text-lg leading-8">
          {date.year - firstDay.year}년의 계절을 함께 지나
          <br />
          결혼합니다.
        </p>
        <p className={`mt-10 text-sm leading-6 ${cover.soft}`}>
          {formatWeddingDate()}
          <br />
          {venueLabel}
        </p>
        <p className={`mt-14 flex items-center gap-2 text-xs ${cover.soft}`}>
          <Icon name="chevronDown" className="size-4 animate-bounce motion-reduce:animate-none" />
          한 해씩 내려 보세요
        </p>
      </section>

      {chapters.map((chapter) => (
        <Year key={chapter.year} chapter={chapter} />
      ))}

      {/* 마지막 해: 예식이 있는 초여름 */}
      <section data-section="wedding" className={`px-8 pt-28 pb-24 ${TONE.wedding.text}`}>
        <h2 className="font-garamond text-[5.5rem] leading-[0.9] font-light tracking-[-0.02em] lining-nums">{date.year}</h2>
        <p className={`mt-3 text-sm ${TONE.wedding.soft}`}>{date.month}월, 결혼합니다</p>
        <div className="mt-12">
          <GreetingBlock tone={TONE.wedding} />
        </div>
      </section>

      <Part title="예식">
        <CeremonyBlock tone={TONE.wedding} />
      </Part>

      <Part title="지나온 계절의 사진들" flush>
        <PhotoStrip tone={TONE.wedding} lightboxClassName="bg-[#1f2a22]/95 text-[#fbf6e6]" />
      </Part>

      <Part title="연락하기">
        <ContactBlock tone={TONE.wedding} />
        <h3 className="mt-16 mb-5 font-serif text-lg">마음 전하실 곳</h3>
        <AccountBlock tone={TONE.wedding} />
      </Part>

      <Part title="앞으로의 계절" className="min-h-dvh pb-36">
        <p className="font-serif text-xl leading-[1.8]">
          지나온 계절만큼, 앞으로의 계절도
          <br />
          함께 맞겠습니다.
        </p>
        <p className={`mt-5 text-sm ${TONE.wedding.soft}`}>
          {groom.name}, {bride.name} 드림
        </p>
        <div className="mt-12">
          <ShareBlock tone={TONE.wedding} />
        </div>
      </Part>
    </AmbientPage>
  );
}
