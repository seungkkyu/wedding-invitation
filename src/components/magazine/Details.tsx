"use client";

import { venueLabel, wedding } from "@/data/wedding";
import { useCountdown, useDday } from "@/hooks/useCountdown";
import { formatWeddingDateDots, formatWeddingTime, WEEKDAYS, weddingMonthCells, weddingWeekday } from "@/lib/date";
import { Headline, Label, Page } from "./parts";

const pad = (n: number) => String(n).padStart(2, "0");

/** 예식까지 남은 시간. 서버 렌더와 접속 시각이 달라 클라이언트에서만 계산하고, 예식이 시작되면 숨긴다 */
function Countdown() {
  const remaining = useCountdown();
  const days = useDday();
  if (remaining === null || days === null) return <div className="h-[92px]" />;

  const dday = days > 0 ? `D-${days}` : days === 0 ? "D-DAY" : `D+${-days}`;
  if (remaining === "started") {
    return <p className="py-6 text-center font-display text-4xl text-[#7a2430] italic">{dday}</p>;
  }

  const { hours, minutes: mins, seconds: secs } = remaining;

  return (
    <div className="flex items-end justify-between py-5">
      <p className="font-display text-[3.2rem] leading-none text-[#7a2430] italic lining-nums">{dday}</p>
      <p className="pb-1 text-right">
        <span className="block text-[9px] tracking-[0.3em] text-[#171513]/55">HRS · MIN · SEC</span>
        <span className="mt-1 block font-display text-xl text-[#171513] lining-nums tabular-nums">
          {pad(hours)}:{pad(mins)}:{pad(secs)}
        </span>
      </p>
    </div>
  );
}

function MonthCalendar() {
  const { year, month, day } = wedding.date;
  return (
    <div>
      <p className="flex items-baseline justify-between">
        <span className="font-display text-2xl text-[#171513] italic">
          {new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" })}
        </span>
        <span className="font-display text-sm text-[#171513]/55 lining-nums">{year}</span>
      </p>
      <div className="mt-4 grid grid-cols-7 gap-y-1.5 border-t border-[#171513] pt-3 text-center text-[12px]">
        {WEEKDAYS.map((weekday, i) => (
          <span key={weekday} className={`pb-1 text-[10px] ${i === 0 ? "text-[#7a2430]" : "text-[#171513]/50"}`}>
            {weekday}
          </span>
        ))}
        {weddingMonthCells().map((date, i) => (
          <span key={i} className="flex justify-center">
            {date && (
              <span
                className={`flex size-8 items-center justify-center font-display lining-nums ${
                  date === day
                    ? "rounded-full bg-[#7a2430] text-white"
                    : i % 7 === 0
                      ? "text-[#7a2430]/80"
                      : "text-[#171513]"
                }`}
              >
                {date}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Details() {
  const specs = [
    { label: "Date", value: `${formatWeddingDateDots()} ${WEEKDAYS[weddingWeekday]}요일` },
    { label: "Time", value: formatWeddingTime() },
    { label: "Venue", value: venueLabel },
  ];

  return (
    <Page id="mag-details" folio={5} kicker="THE DETAILS">
      <Headline en="The Details" ko="예식 안내" />
      <dl className="divide-y divide-[#171513]/15 border-y border-[#171513]">
        {specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-[5rem_1fr] items-baseline py-4">
            <dt>
              <Label>{spec.label}</Label>
            </dt>
            <dd className="font-headline text-[15px] font-bold text-[#171513] lining-nums">{spec.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12">
        <MonthCalendar />
      </div>
      <div className="mt-10 border-y border-[#171513]/15">
        <Countdown />
      </div>
    </Page>
  );
}
