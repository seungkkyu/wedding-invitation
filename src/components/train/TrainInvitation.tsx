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
import { secondaryPhoto, venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { Scenery, type Stop, STOPS } from "./Scenery";

const { groom, bride, venue } = wedding;

/** 역 이름과 로마자 표기. 예식장역은 실제 장소 이름 */
const STATIONS: Record<Stop, { name: string; roman: string }> = {
  manam: { name: "만남", roman: "Manam" },
  insa: { name: "인사", roman: "Insa" },
  chueok: { name: "추억", roman: "Chueok" },
  hall: { name: venue.name, roman: formatWeddingDateDots() },
  maeum: { name: "마음", roman: "Maeum" },
  hamkke: { name: "함께", roman: "Hamkke" },
};

const LINE_COLOR = "bg-[#2f8a5b]";

const TONE: Tone = {
  text: "text-[#26302c]",
  soft: "text-[#26302c]/65",
  line: "border-[#26302c]/12",
  card: "rounded-2xl bg-[#fbfaf6]/90 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]",
  tile: "rounded-xl bg-[#fbfaf6]/90",
  chip: "rounded-full bg-[#26302c]/8 active:bg-[#26302c]/15",
  button: `rounded-xl ${LINE_COLOR} text-white`,
  ghost: "rounded-xl bg-[#fbfaf6]/90",
  accent: "font-bold",
  photo: "rounded-xl",
  panel: "rounded-2xl bg-[#fbfaf6]/90",
};
const NIGHT: Tone = {
  ...TONE,
  text: "text-[#eef0f6]",
  soft: "text-[#eef0f6]/65",
  line: "border-white/12",
  card: "rounded-2xl bg-[#141a36]/80",
  tile: "rounded-xl bg-[#141a36]/80",
  chip: "rounded-full bg-white/10 active:bg-white/20",
  ghost: "rounded-xl bg-white/12",
};

/** 승강장 역명판: 가운데 지금 역, 아래 띠에 이전·다음 역 */
function StationSign({ stop }: { stop: Stop }) {
  const i = STOPS.indexOf(stop);
  const prev = STOPS[i - 1];
  const next = STOPS[i + 1];
  const station = STATIONS[stop];

  return (
    <div className="mx-7 overflow-hidden rounded-lg bg-white text-[#1d2420] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.55)]">
      <div className="px-5 pt-5 pb-4 text-center">
        <p className="text-[1.9rem] leading-tight font-black tracking-tight">{station.name}</p>
        <p className="mt-0.5 text-xs font-medium text-[#1d2420]/60">{station.roman}</p>
      </div>
      <div className={`flex items-center justify-between px-3 py-1.5 text-xs font-bold text-white ${LINE_COLOR}`}>
        <span className="flex min-w-0 items-center gap-1">
          {prev && <Icon name="chevronLeft" className="size-3.5 shrink-0" />}
          <span className="truncate">{prev ? STATIONS[prev].name : "출발역"}</span>
        </span>
        <span className="flex min-w-0 items-center gap-1">
          <span className="truncate">{next ? STATIONS[next].name : "종착역"}</span>
          {next && <Icon name="chevronRight" className="size-3.5 shrink-0" />}
        </span>
      </div>
    </div>
  );
}

function Station({
  stop,
  children,
  tone = TONE,
  flush = false,
  className = "",
}: {
  stop: Stop;
  children: ReactNode;
  tone?: Tone;
  flush?: boolean;
  className?: string;
}) {
  return (
    <section data-section={stop} className={`py-24 ${tone.text} ${className}`}>
      <h2 className="sr-only">{STATIONS[stop].name}역</h2>
      <StationSign stop={stop} />
      <div className={`mt-8 ${flush ? "" : "px-7"}`}>{children}</div>
    </section>
  );
}

/** 창밖 버전: 기차를 타고 만남역에서 예식장역을 지나 함께역까지. 역마다 창밖 풍경이 바뀐다 */
export function TrainInvitation() {
  return (
    <AmbientPage<Stop> initial="manam" className="bg-[#38332e]" backdrop={(stop) => <Scenery stop={stop} />}>
      <section data-section="manam" className={`flex min-h-dvh flex-col justify-center py-24 ${TONE.text}`}>
        <StationSign stop="manam" />
        <div className={`mx-7 mt-6 px-6 py-7 ${TONE.card}`}>
          <p className={`text-sm ${TONE.soft}`}>만남역을 떠나는 열차에 초대합니다</p>
          <h1 className="mt-3 text-[2rem] leading-tight font-black tracking-tight">
            {groom.name}
            <span className="mx-2 font-medium text-[#2f8a5b]">그리고</span>
            {bride.name}
          </h1>
          <dl className={`mt-6 grid grid-cols-[3.5rem_1fr] gap-y-1.5 border-t pt-5 text-sm ${TONE.line}`}>
            <dt className={TONE.soft}>도착</dt>
            <dd>{formatWeddingDate()}</dd>
            <dt className={TONE.soft}>종착</dt>
            <dd>{venueLabel}</dd>
          </dl>
        </div>
        <p className="mx-7 mt-6 flex items-center gap-2 text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          <Icon name="chevronDown" className="size-4 animate-bounce motion-reduce:animate-none" />
          내릴수록 창밖 풍경이 바뀌어요
        </p>
      </section>

      <Station stop="insa">
        <div className={`px-6 py-7 ${TONE.card}`}>
          <GreetingBlock tone={TONE} photo={secondaryPhoto} />
        </div>
      </Station>

      <Station stop="chueok" flush>
        <PhotoStrip tone={{ ...TONE, soft: "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" }} lightboxClassName="bg-[#1d2420]/95 text-white" />
      </Station>

      <Station stop="hall">
        <CeremonyBlock tone={TONE} />
      </Station>

      <Station stop="maeum">
        <ContactBlock tone={TONE} />
        <h3 className="mt-14 mb-4 w-fit rounded-full bg-[#fbfaf6]/90 px-4 py-1.5 font-bold">마음 전하실 곳</h3>
        <AccountBlock tone={TONE} />
      </Station>

      <Station stop="hamkke" tone={NIGHT} className="min-h-dvh pb-36">
        <div className={`px-6 py-7 ${NIGHT.card}`}>
          <p className="text-xl leading-[1.7] font-bold">
            이 열차의 종착역은 함께역입니다.
            <br />
            오래도록 같은 칸에 타고 가겠습니다.
          </p>
          <p className={`mt-4 text-sm ${NIGHT.soft}`}>
            {groom.name}, {bride.name} 드림
          </p>
        </div>
        <div className="mt-4">
          <ShareBlock tone={NIGHT} />
        </div>
      </Station>
    </AmbientPage>
  );
}
