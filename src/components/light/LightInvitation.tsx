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
import { secondaryPhoto, venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { type LightTime, Room } from "./Room";

const { groom, bride } = wedding;

const DAY: Omit<Tone, "card"> = {
  text: "text-[#3a342e]",
  soft: "text-[#3a342e]/65",
  line: "border-[#3a342e]/15",
  tile: "rounded-[2px] border border-[#3a342e]/25",
  chip: "rounded-[2px] border border-[#3a342e]/25 active:bg-[#3a342e]/5",
  button: "rounded-[2px] bg-[#3a342e] text-[#efe9df]",
  ghost: "rounded-[2px] border border-[#3a342e]/30",
  accent: "font-serif",
  photo: "rounded-[2px]",
};

// 벽에 기대 둔 종이처럼 얇은 바탕. 밤에는 불빛 아래 어둑한 종이
const TONE: Record<LightTime, Tone> = {
  morning: { ...DAY, card: "rounded-[2px] bg-[#f4f2ed]/70" },
  forenoon: { ...DAY, card: "rounded-[2px] bg-[#f4f2ed]/70" },
  noon: { ...DAY, card: "rounded-[2px] bg-[#faf8f3]/75" },
  afternoon: { ...DAY, card: "rounded-[2px] bg-[#f6efe2]/70" },
  evening: {
    ...DAY,
    text: "text-[#2f2620]",
    soft: "text-[#2f2620]/70",
    card: "rounded-[2px] bg-[#f3e6d4]/60",
  },
  night: {
    ...DAY,
    text: "text-[#efe6da]",
    soft: "text-[#efe6da]/65",
    line: "border-[#efe6da]/15",
    card: "rounded-[2px] bg-white/[0.05]",
    tile: "rounded-[2px] border border-[#efe6da]/25",
    chip: "rounded-[2px] border border-[#efe6da]/25 active:bg-white/10",
    button: "rounded-[2px] bg-[#efe6da] text-[#2b2723]",
    ghost: "rounded-[2px] border border-[#efe6da]/30",
  },
};

/** 한 때의 장면: 볕이 지금 어디쯤 있는지 한 줄로 */
function Scene({
  time,
  title,
  children,
  flush = false,
  className = "",
}: {
  time: LightTime;
  title: string;
  children: ReactNode;
  flush?: boolean;
  className?: string;
}) {
  return (
    <section data-section={time} className={`py-28 ${TONE[time].text} ${className}`}>
      <h2 className="px-8 font-serif text-[1.35rem] leading-snug">{title}</h2>
      <div className={`mt-10 ${flush ? "" : "px-8"}`}>{children}</div>
    </section>
  );
}

/** 창가 버전: 볕 한 조각이 벽을 건너가는 동안 청첩장을 읽는다 */
export function LightInvitation() {
  return (
    <AmbientPage<LightTime> initial="morning" className="bg-[#dcdcd8]" backdrop={(time) => <Room time={time} />}>
      {/* 표지: 볕이 주인공이라 글은 아래쪽에 작게 */}
      <section data-section="morning" className={`flex min-h-dvh flex-col justify-end px-8 pb-20 ${TONE.morning.text}`}>
        <p className={`font-serif text-sm ${TONE.morning.soft}`}>아침 볕이 벽에 닿을 무렵</p>
        <h1 className="mt-4 font-serif text-[2.1rem] leading-[1.35]">
          {groom.name}
          <br />
          {bride.name}
          <span className={`mt-2 block text-xl ${TONE.morning.soft}`}>두 사람이 결혼합니다</span>
        </h1>
        <p className={`mt-8 text-sm leading-6 ${TONE.morning.soft}`}>
          {formatWeddingDate()}
          <br />
          {venueLabel}
        </p>
      </section>

      <Scene time="forenoon" title="볕이 조금 올라왔어요. 먼저 인사드립니다">
        <GreetingBlock tone={TONE.forenoon} photo={secondaryPhoto} />
      </Scene>

      <Scene time="noon" title="볕이 가장 짧아지는 한낮, 예식이 있습니다">
        <CeremonyBlock tone={TONE.noon} />
      </Scene>

      <Scene time="afternoon" title="오후 볕에 꺼내 본 사진들" flush>
        <PhotoStrip tone={TONE.afternoon} lightboxClassName="bg-[#2b2723]/95 text-[#efe6da]" />
      </Scene>

      <Scene time="evening" title="볕이 길게 눕는 저녁, 연락하실 곳">
        <ContactBlock tone={TONE.evening} />
        <h3 className="mt-16 mb-5 font-serif text-lg">마음 전하실 곳</h3>
        <AccountBlock tone={TONE.evening} />
      </Scene>

      <Scene time="night" title="볕이 진 뒤, 불을 켜고" className="min-h-dvh pb-36">
        <p className="font-serif text-xl leading-[1.9]">
          매일 같은 창가에서
          <br />
          아침을 함께 맞겠습니다.
        </p>
        <p className={`mt-6 text-sm ${TONE.night.soft}`}>
          {groom.name}, {bride.name} 드림
        </p>
        <div className="mt-14">
          <ShareBlock tone={TONE.night} />
        </div>
      </Scene>
    </AmbientPage>
  );
}
