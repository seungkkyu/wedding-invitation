"use client";

import { motion } from "motion/react";
import { wedding } from "@/data/wedding";
import { useCountdown, useDday } from "@/hooks/useCountdown";
import { formatWeddingDate, WEEKDAYS, weddingMonthCells } from "@/lib/date";
import { LetterSection } from "./Ornament";

const UNITS = [
  { label: "Days", key: "days" },
  { label: "Hours", key: "hours" },
  { label: "Minutes", key: "minutes" },
  { label: "Seconds", key: "seconds" },
] as const;

/** 예식 시작까지 남은 시간 + D-day 문구. 접속 시점 기준이라 클라이언트에서만 계산 */
function Countdown() {
  const remaining = useCountdown();
  const days = useDday();
  if (remaining === null || days === null) return <div className="mt-12 h-28" />;

  const { groom, bride } = wedding;

  return (
    <div className="mt-12 text-center">
      {remaining !== "started" && (
        <div className="grid grid-cols-4 gap-2">
          {UNITS.map(({ label, key }) => (
            <div key={label} className="rounded-2xl bg-white/60 py-3 ring-1 ring-[#eadfd3]">
              <p className="font-garamond text-[1.7rem] leading-none text-[#4a3f3a] lining-nums tabular-nums">
                {remaining[key]}
              </p>
              <p className="mt-1.5 font-garamond text-[11px] tracking-[0.15em] text-[#a99a90] italic">{label}</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-8 font-serif text-[13px] text-[#6f625b]">
        {days > 0 && (
          <>
            {groom.name.slice(1)} <span className="text-[#c98f84]">♥</span> {bride.name.slice(1)}의 결혼식이{" "}
            <span className="text-[#b7867a]">{days}일</span> 남았습니다
          </>
        )}
        {days === 0 && <>오늘, 두 사람이 부부가 됩니다</>}
        {days < 0 && <>두 사람이 부부가 된 지 {-days}일이 지났습니다</>}
      </p>
    </div>
  );
}

/** 손으로 그린 듯한 동그라미로 예식일을 표시하는 달력 */
export function LetterCalendar() {
  const { year, month, day } = wedding.date;

  return (
    <LetterSection script="Save the Date" title={`${year}. ${String(month).padStart(2, "0")}`}>
      <p className="-mt-6 mb-10 text-center font-serif text-[13px] text-[#8f8078]">{formatWeddingDate()}</p>
      <div className="rounded-[2rem] bg-white/50 px-4 py-7 ring-1 ring-[#eadfd3]">
        <div className="grid grid-cols-7 gap-y-3 text-center text-[13px]">
          {WEEKDAYS.map((weekday, i) => (
            <span
              key={weekday}
              className={`pb-2 font-garamond text-xs ${i === 0 ? "text-[#c98f84]" : "text-[#a99a90]"}`}
            >
              {weekday}
            </span>
          ))}
          {weddingMonthCells().map((date, i) => (
            <span key={i} className="flex justify-center">
              {date && (
                <span
                  className={`relative flex size-8 items-center justify-center font-garamond text-[15px] lining-nums ${
                    date === day ? "font-semibold text-[#a8695e]" : i % 7 === 0 ? "text-[#c98f84]" : "text-[#5d514b]"
                  }`}
                >
                  {date}
                  {date === day && (
                    <svg viewBox="0 0 40 40" fill="none" className="absolute -inset-2 size-12 text-[#c98f84]" aria-hidden>
                      <motion.path
                        d="M9 23C6 13 15 5 25 7c9 2 12 12 8 20-4 7-15 9-22 4C6 28 6 20 11 15"
                        stroke="currentColor"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                      />
                    </svg>
                  )}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <Countdown />
    </LetterSection>
  );
}
