"use client";

import { useSyncExternalStore } from "react";
import { Section } from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import { daysUntilWedding, formatWeddingDate, WEEKDAYS, weddingMonthCells } from "@/lib/date";

const noopSubscribe = () => () => {};

function DdayText() {
  // 서버 렌더 시점과 클라이언트의 날짜가 다를 수 있어 클라이언트에서만 계산
  const days = useSyncExternalStore(noopSubscribe, () => daysUntilWedding(), () => null);
  if (days === null) return null;

  const { groom, bride } = wedding;
  const names = `${groom.name.slice(1)} ♥ ${bride.name.slice(1)}`;
  if (days > 0) {
    return (
      <>
        {names}의 결혼식이 <span className="font-semibold text-accent">{days}일</span> 남았습니다
      </>
    );
  }
  if (days === 0) return <>오늘은 {names}의 결혼식 날입니다</>;
  return <>{names}의 결혼식이 {-days}일 지났습니다</>;
}

export function Calendar() {
  const { year, month, day } = wedding.date;

  return (
    <Section eyebrow="Wedding Day" title={`${year}년 ${month}월`}>
      <p className="-mt-6 mb-8 text-center text-sm text-muted">{formatWeddingDate()}</p>
      <div className="grid grid-cols-7 gap-y-3 border-y border-stone-200 py-6 text-center text-sm">
        {WEEKDAYS.map((weekday, i) => (
          <span key={weekday} className={i === 0 ? "text-rose-400" : "text-muted"}>
            {weekday}
          </span>
        ))}
        {weddingMonthCells().map((date, i) => (
          <span key={i} className="flex justify-center">
            {date && (
              <span
                className={`flex size-8 items-center justify-center rounded-full ${
                  date === day ? "bg-accent text-white" : i % 7 === 0 ? "text-rose-400" : "text-ink"
                }`}
              >
                {date}
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="mt-8 min-h-6 text-center text-sm text-ink">
        <DdayText />
      </p>
    </Section>
  );
}
