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
import { venueLabel, wedding } from "@/data/wedding";
import { dayNumberOf, formatWeddingDate } from "@/lib/date";
import { StarSky } from "./StarSky";

const { groom, bride, firstDay } = wedding;

const TONE: Tone = {
  text: "text-[#e9ebf6]",
  soft: "text-[#e9ebf6]/65",
  line: "border-white/12",
  card: "rounded-2xl bg-[#0b1029]/55 ring-1 ring-white/8",
  tile: "rounded-full bg-[#0b1029]/55 ring-1 ring-white/12",
  chip: "rounded-full ring-1 ring-white/20 active:bg-white/10",
  button: "rounded-full bg-[#f1ecdc] text-[#0c1230]",
  ghost: "rounded-full ring-1 ring-white/25",
  accent: "font-headline",
  photo: "rounded-xl",
};

// 처음 만난 날부터 예식 전날까지 밤하늘이 돈 횟수 (하루에 한 바퀴)
const turns = dayNumberOf(wedding.date) - 1;

function Chapter({ title, children, flush = false }: { title: string; children: ReactNode; flush?: boolean }) {
  return (
    <section data-section={title} className={`py-28 ${TONE.text}`}>
      <h2 className="flex items-center gap-3 px-7 font-headline text-[1.45rem]">
        <svg viewBox="0 0 12 12" className="size-3 text-[#f1ecdc]" aria-hidden>
          <path d="M6 0 7 5 12 6 7 7 6 12 5 7 0 6 5 5Z" fill="currentColor" />
        </svg>
        {title}
      </h2>
      <div className={`mt-10 ${flush ? "" : "px-7"}`}>{children}</div>
    </section>
  );
}

/** 별밤 버전: 처음 만난 밤하늘이 스크롤만큼 돌고, 끝에서 까치들이 견우와 직녀 사이에 다리를 놓는다 */
export function StarsInvitation() {
  return (
    <AmbientPage<string> initial="cover" className="bg-[#05081a]" backdrop={() => <StarSky />}>
      <section data-section="cover" className={`flex min-h-dvh flex-col justify-end px-7 pb-24 ${TONE.text}`}>
        <p className={`text-sm ${TONE.soft}`}>
          {firstDay.year}년 {firstDay.month}월 {firstDay.day}일, 처음 만난 여름 밤
        </p>
        <h1 className="mt-5 font-headline text-[2.6rem] leading-[1.25] font-bold">
          {groom.name}
          <br />
          {bride.name}
        </h1>
        <p className="mt-6 font-headline text-lg leading-8">
          그 밤부터 하늘이 {turns.toLocaleString("ko-KR")}바퀴를 도는 동안
          <br />
          함께였고, 이제 결혼합니다.
        </p>
        <p className={`mt-10 text-sm leading-6 ${TONE.soft}`}>
          {formatWeddingDate()}
          <br />
          {venueLabel}
        </p>
      </section>

      <Chapter title="인사드립니다">
        <GreetingBlock tone={TONE} />
      </Chapter>

      <Chapter title="예식">
        <CeremonyBlock tone={TONE} />
      </Chapter>

      <Chapter title="함께 본 하늘들" flush>
        <PhotoStrip tone={TONE} lightboxClassName="bg-[#05081a]/95 text-[#e9ebf6]" />
      </Chapter>

      <Chapter title="연락하기">
        <ContactBlock tone={TONE} />
        <h3 className="mt-16 mb-5 font-headline text-lg">마음 전하실 곳</h3>
        <AccountBlock tone={TONE} />
      </Chapter>

      {/* 마지막 장면: 하늘이 다 돌면 견우·직녀 사이에 오작교가 놓인다 (배경 캔버스) */}
      <section data-section="bridge" className={`flex min-h-[130dvh] flex-col justify-end px-7 pb-32 ${TONE.text}`}>
        <p className="font-headline text-[1.45rem] leading-[1.7]">
          견우와 직녀는 일 년에 한 번 만나지만,
          <br />
          저희는 이제 매일 만나려 합니다.
        </p>
        <p className={`mt-5 text-sm ${TONE.soft}`}>
          {groom.name}, {bride.name} 드림
        </p>
        <div className="mt-12">
          <ShareBlock tone={TONE} />
        </div>
      </section>
    </AmbientPage>
  );
}
