"use client";

import { useEffect, useRef, useState } from "react";
import { venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots, msUntilWedding, WEEKDAYS, weddingMonthCells } from "@/lib/date";
import { FILM, Reveal, SceneTitle } from "./parts";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

function toTimecode(ms: number) {
  const frames = Math.floor((ms % 1000) / (1000 / FPS));
  const seconds = Math.floor(ms / 1000);
  return [
    String(Math.floor(seconds / 86_400)),
    pad(Math.floor(seconds / 3600) % 24),
    pad(Math.floor(seconds / 60) % 60),
    pad(seconds % 60),
    pad(frames),
  ].join(":");
}

/** 예식까지 남은 시간을 24fps 타임코드로 (DD:HH:MM:SS:FF). 예식이 시작되면 숨긴다 */
function Timecode() {
  const textRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  // 초당 24번 바뀌므로 리렌더 없이 글자만 직접 갈아 끼운다. 접속 시점 기준이라 클라이언트에서만 계산
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const remaining = msUntilWedding();
      if (remaining <= 0) {
        setStarted(true);
        return;
      }
      if (textRef.current) textRef.current.textContent = toTimecode(remaining);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (started) return null;

  return (
    <Reveal className="mt-14 text-center">
      <p className={`font-typewriter text-[10px] tracking-[0.35em] ${FILM.amber}`}>TIME TO PREMIERE</p>
      <span
        ref={textRef}
        className={`mt-3 block font-typewriter text-[1.7rem] tracking-[0.06em] tabular-nums ${FILM.cream}`}
      >
        --:--:--:--:--
      </span>
      <p className={`mt-1 grid grid-cols-5 font-typewriter text-[9px] tracking-[0.2em] ${FILM.muted}`}>
        <span>DAYS</span>
        <span>HRS</span>
        <span>MIN</span>
        <span>SEC</span>
        <span>FRM</span>
      </p>
    </Reveal>
  );
}

function Ticket() {
  const { groom, bride, venue, date } = wedding;

  return (
    <Reveal className="relative flex bg-[#efe6d6] text-[#1c1915] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex-1 px-5 pt-5 pb-4">
        <p className="flex justify-between font-typewriter text-[10px] tracking-[0.3em] text-[#1c1915]/60">
          <span>PREMIERE</span>
          <span>No. {pad(date.month)}{pad(date.day)}</span>
        </p>
        <p className="mt-3 font-cinema text-[2.4rem] leading-none tracking-[0.06em]">THE WEDDING</p>
        <p className="mt-1 font-serif text-sm">
          {groom.name} · {bride.name}
        </p>
        <dl className="mt-5 space-y-2.5 text-[13px]">
          <div>
            <dt className="font-typewriter text-[9px] tracking-[0.25em] text-[#1c1915]/50">DATE</dt>
            <dd>{formatWeddingDate()}</dd>
          </div>
          <div>
            <dt className="font-typewriter text-[9px] tracking-[0.25em] text-[#1c1915]/50">THEATER</dt>
            <dd>{venueLabel}</dd>
            {venue.address && <dd className="text-xs text-[#1c1915]/60">{venue.address}</dd>}
          </div>
          <div>
            <dt className="font-typewriter text-[9px] tracking-[0.25em] text-[#1c1915]/50">SEAT</dt>
            <dd>어디든, 가장 반가운 자리</dd>
          </div>
        </dl>
        {/* 바코드 */}
        <div
          aria-hidden
          className="mt-5 h-7 bg-[repeating-linear-gradient(90deg,#1c1915_0_2px,transparent_2px_4px,#1c1915_4px_5px,transparent_5px_8px,#1c1915_8px_11px,transparent_11px_13px)] opacity-80"
        />
      </div>

      {/* 절취선: 위아래 반원 홈 + 점선 */}
      <div className="relative w-0 border-l-2 border-dashed border-[#1c1915]/25">
        <span className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-[#0e0d0c]" />
        <span className="absolute -bottom-2.5 -left-2.5 size-5 rounded-full bg-[#0e0d0c]" />
      </div>

      <div className="flex w-16 flex-col items-center justify-center gap-3">
        <span className="font-cinema text-xl tracking-[0.25em] [writing-mode:vertical-rl]">ADMIT TWO</span>
        <span className="font-typewriter text-[9px] tracking-[0.2em] text-[#1c1915]/60 [writing-mode:vertical-rl]">
          {formatWeddingDateDots()}
        </span>
      </div>
    </Reveal>
  );
}

function MonthCalendar() {
  const { year, month, day } = wedding.date;

  return (
    <Reveal className="mt-14">
      <p className={`text-center font-cinema text-xl tracking-[0.3em] ${FILM.cream}`}>
        {year} · {pad(month)}
      </p>
      <div className={`mt-5 grid grid-cols-7 gap-y-2 border-y py-5 text-center font-typewriter text-xs ${FILM.line}`}>
        {WEEKDAYS.map((weekday, i) => (
          <span key={weekday} className={`pb-1 text-[10px] ${i === 0 ? "text-[#d9913a]/80" : FILM.muted}`}>
            {weekday}
          </span>
        ))}
        {weddingMonthCells().map((date, i) => (
          <span key={i} className="flex justify-center">
            {date && (
              <span
                className={`flex size-8 items-center justify-center rounded-full ${
                  date === day
                    ? "font-bold text-[#d9913a] ring-1 ring-[#d9913a]"
                    : i % 7 === 0
                      ? "text-[#d9913a]/70"
                      : FILM.cream + " opacity-80"
                }`}
              >
                {date}
              </span>
            )}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

/** SCENE 04: 시사회 티켓 + 달력 + 타임코드 카운트다운 */
export function Premiere() {
  return (
    <section className="px-8 py-24">
      <SceneTitle no="04" en="PREMIERE" title="우리의 첫 상영에 초대합니다" />
      <Ticket />
      <MonthCalendar />
      <Timecode />
    </section>
  );
}
