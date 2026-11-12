import type { ReactNode } from "react";
import {
  AccountBlock,
  CeremonyBlock,
  ContactBlock,
  GreetingBlock,
  PhotoStrip,
  ShareBlock,
  type Tone,
} from "@/components/ambient/blocks";
import { Icon } from "@/components/common/Icon";
import { secondaryPhoto, venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { CLOCK, type TimeOfDay } from "./times";

const { groom, bride } = wedding;

const LIGHT_BASE = {
  line: "border-current/15",
  tile: "rounded-full bg-white/45",
  chip: "rounded-full bg-white/70",
  button: "rounded-full bg-[#17304e] text-white",
  ghost: "rounded-full bg-white/50",
  accent: "font-hahmlet",
  photo: "rounded-[24px]",
};
const DARK_BASE = {
  ...LIGHT_BASE,
  tile: "rounded-full bg-white/10",
  chip: "rounded-full bg-white/12 active:bg-white/25",
  button: "rounded-full bg-[#f4efdc] text-[#17214a]",
  ghost: "rounded-full bg-white/10",
};

// 하늘 밝기에 맞춘 글자색과 정보 카드 바탕
const TONE: Record<TimeOfDay, Tone> = {
  dawn: { ...DARK_BASE, text: "text-[#f6eee6]", soft: "text-[#f6eee6]/75", card: "rounded-[28px] bg-[#1f2547]/35" },
  morning: { ...LIGHT_BASE, text: "text-[#22324a]", soft: "text-[#22324a]/70", card: "rounded-[28px] bg-white/45" },
  ceremony: { ...LIGHT_BASE, text: "text-[#17304e]", soft: "text-[#17304e]/70", card: "rounded-[28px] bg-white/55" },
  afternoon: { ...LIGHT_BASE, text: "text-[#2b2f3c]", soft: "text-[#2b2f3c]/70", card: "rounded-[28px] bg-white/45" },
  dusk: { ...DARK_BASE, text: "text-[#fff3ea]", soft: "text-[#fff3ea]/75", card: "rounded-[28px] bg-[#2c2c5a]/45" },
  night: { ...DARK_BASE, text: "text-[#e8ebf7]", soft: "text-[#e8ebf7]/70", card: "rounded-[28px] bg-white/[0.07]" },
};

/** 한 시각의 장면. 큰 시각 숫자와 그 시각의 한 줄, 그리고 내용 */
function Hour({
  time,
  caption,
  children,
  flush = false,
  className = "",
}: {
  time: TimeOfDay;
  caption: string;
  children: ReactNode;
  /** 내용을 화면 끝까지 붙인다 (가로 스크롤 갤러리) */
  flush?: boolean;
  className?: string;
}) {
  return (
    <section data-section={time} className={`relative py-24 ${TONE[time].text} ${className}`}>
      <h2 className="px-7">
        <time className="block font-hahmlet text-[4.2rem] leading-none font-extralight tracking-[-0.02em] tabular-nums">
          {CLOCK[time]}
        </time>
        <span className={`mt-3 block font-hahmlet text-[15px] font-normal ${TONE[time].soft}`}>{caption}</span>
      </h2>
      <div className={`mt-12 ${flush ? "" : "px-7"}`}>{children}</div>
    </section>
  );
}

export function Dawn() {
  return (
    <section data-section="dawn" className={`flex min-h-dvh flex-col justify-end px-7 pt-24 pb-32 ${TONE.dawn.text}`}>
      <p className={`font-hahmlet text-[15px] ${TONE.dawn.soft}`}>{CLOCK.dawn}, 해가 뜨기 조금 전</p>
      <h1 className="mt-5 font-hahmlet text-[3.4rem] leading-[1.05] font-light tracking-[-0.03em]">
        {groom.name}
        <br />
        {bride.name}
      </h1>
      <p className="mt-6 font-hahmlet text-xl font-light">두 사람의 가장 긴 하루에 초대합니다</p>
      <p className={`mt-10 text-sm leading-6 ${TONE.dawn.soft}`}>
        {formatWeddingDate()}
        <br />
        {venueLabel}
      </p>
      <p className={`mt-16 flex items-center gap-2 text-xs ${TONE.dawn.soft}`}>
        <Icon name="chevronDown" className="size-4 animate-bounce motion-reduce:animate-none" />
        천천히 내려 보세요. 하루가 흘러갑니다
      </p>
    </section>
  );
}

export function Morning() {
  return (
    <Hour time="morning" caption="아침 볕에 옷매무새를 고치며">
      <GreetingBlock tone={TONE.morning} photo={secondaryPhoto} />
    </Hour>
  );
}

export function Ceremony() {
  return (
    <Hour time="ceremony" caption="해가 가장 높이 뜰 무렵, 예식이 시작됩니다">
      <CeremonyBlock tone={TONE.ceremony} />
    </Hour>
  );
}

export function Afternoon() {
  return (
    <Hour time="afternoon" caption="긴 그림자 사이로, 우리가 지나온 날들" flush>
      <PhotoStrip tone={TONE.afternoon} lightboxClassName="bg-[#2b2f3c]/95 text-white" />
    </Hour>
  );
}

export function Dusk() {
  return (
    <Hour time="dusk" caption="노을이 질 때쯤, 고마운 분들께">
      <ContactBlock tone={TONE.dusk} />
      <h3 className="mt-16 mb-5 font-hahmlet text-xl">마음 전하실 곳</h3>
      <AccountBlock tone={TONE.dusk} />
    </Hour>
  );
}

export function Night() {
  return (
    <Hour time="night" caption="모두 돌아간 밤, 둘이 남아" className="min-h-dvh pb-36">
      <p className="font-hahmlet text-2xl leading-[1.7] font-light">
        오늘 하루를 함께해 주셔서
        <br />
        고맙습니다.
      </p>
      <p className={`mt-6 text-sm ${TONE.night.soft}`}>
        {groom.name}, {bride.name} 드림
      </p>
      <div className="mt-14">
        <ShareBlock tone={TONE.night} />
      </div>
    </Hour>
  );
}
