"use client";

import { motion, useReducedMotion } from "motion/react";
import { wedding } from "@/data/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { formatWeddingDate, WEEKDAYS, weddingMonthCells } from "@/lib/date";
import { HeartSticker, Page, Tape } from "./parts";

/** 마커로 슥 그린 동그라미 (화면에 들어오면 그려진다) */
function MarkerCircle() {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      viewBox="0 0 44 40"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-2 -left-3 h-[calc(100%+16px)] w-[calc(100%+24px)]"
      aria-hidden
    >
      <motion.path
        d="M30 6C21 2 7 6 5 18c-2 11 9 17 19 16 10-1 16-8 15-17C38 9 31 5 22 6"
        fill="none"
        stroke="#e0675a"
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** 포스트잇에 적은 남은 시간 */
function CountdownNote() {
  const remaining = useCountdown();
  // 서버 렌더 때는 자리만 잡아 둔다
  if (remaining === null) return <div className="h-40" />;
  if (remaining === "started") {
    return (
      <p className="mx-auto mt-10 w-fit rotate-2 bg-[#ffe58f] px-6 py-4 font-hand text-[1.7rem] text-ink shadow-[0_8px_16px_-8px_rgba(80,60,30,0.45)]">
        오늘, 드디어 그날이에요!
      </p>
    );
  }
  const units = [
    { value: remaining.days, label: "일" },
    { value: remaining.hours, label: "시간" },
    { value: remaining.minutes, label: "분" },
    { value: remaining.seconds, label: "초" },
  ];
  return (
    <div className="relative mx-auto mt-12 w-[86%] rotate-[1.5deg] bg-[#ffe58f] px-5 pt-7 pb-5 text-center shadow-[0_10px_18px_-10px_rgba(80,60,30,0.5)]">
      <Tape tone="blue" className="absolute -top-3 left-1/2 w-20 -translate-x-1/2 -rotate-2" />
      <p className="font-hand text-[1.5rem] text-ink/75">결혼식까지 앞으로</p>
      <p className="mt-1 flex items-baseline justify-center gap-2 font-hand text-ink">
        {units.map(({ value, label }) => (
          <span key={label}>
            <span className="font-hand-en text-[2.1rem] font-semibold tabular-nums">
              {label === "일" ? value : String(value).padStart(2, "0")}
            </span>
            <span className="ml-0.5 text-xl">{label}</span>
          </span>
        ))}
      </p>
      <p className="mt-1 font-hand text-[1.4rem] text-ink/70">조금만 기다려 주세요 :)</p>
    </div>
  );
}

export function Planner() {
  const { year, month, day } = wedding.date;

  return (
    <Page no="03" title="Save the date" sub={formatWeddingDate()}>
      <div className="relative mx-auto bg-[#fffefb] px-5 pt-10 pb-6 shadow-[0_12px_26px_-14px_rgba(70,50,25,0.5)]">
        {/* 스프링 노트 고리 */}
        <div aria-hidden className="absolute inset-x-6 -top-2.5 flex justify-between">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="h-5 w-2 rounded-full bg-[linear-gradient(90deg,#9b9286,#d9d2c6,#9b9286)]" />
          ))}
        </div>
        <div className="flex items-baseline justify-between border-b-2 border-ink/80 pb-2">
          <span className="font-hand text-[2.4rem] leading-none text-ink">{month}월</span>
          <span className="font-hand-en text-xl text-ink/50">{year}</span>
        </div>
        <div className="mt-3 grid grid-cols-7 text-center">
          {WEEKDAYS.map((weekday, i) => (
            <span key={weekday} className={`py-1.5 font-hand text-lg ${i === 0 ? "text-[#e0675a]" : "text-ink/50"}`}>
              {weekday}
            </span>
          ))}
          {weddingMonthCells().map((date, i) => (
            <span
              key={i}
              className={`relative flex h-11 flex-col items-center justify-start border-t border-ink/10 pt-1 font-hand-en text-xl ${
                i % 7 === 0 ? "text-[#e0675a]" : "text-ink/80"
              }`}
            >
              <span className="relative">
                {date}
                {date === day && (
                  <>
                    <MarkerCircle />
                    <HeartSticker className="absolute -top-2.5 -right-4 size-4 rotate-12 text-[#e0675a]" />
                  </>
                )}
              </span>
            </span>
          ))}
        </div>
      </div>
      <CountdownNote />
    </Page>
  );
}
