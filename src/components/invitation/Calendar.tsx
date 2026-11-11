"use client";

import { PixelSection, PixelWindow } from "@/components/pixel/PixelSection";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";
import { useDday } from "@/hooks/useCountdown";
import { Countdown } from "./Countdown";
import { EasterEgg } from "./EasterEgg";
import { formatWeddingDate, WEEKDAYS, weddingMonthCells } from "@/lib/date";

function DdayText() {
  // 서버 렌더 시점과 클라이언트의 날짜가 다를 수 있어 클라이언트에서만 계산
  const days = useDday();
  if (days === null) return null;

  const { groom, bride } = wedding;
  const names = (
    <>
      {groom.name.slice(1)} <EasterEgg className="text-[#ff6b8b]">♥</EasterEgg> {bride.name.slice(1)}
    </>
  );
  if (days > 0) {
    return (
      <>
        {names}의 결혼식이 <span className="text-accent">{days}일</span> 남았습니다
      </>
    );
  }
  if (days === 0) return <>오늘은 {names}의 결혼식 날입니다</>;
  return <>{names}의 결혼식이 {-days}일 지났습니다</>;
}

export function Calendar() {
  const { year, month, day } = wedding.date;

  return (
    <PixelSection title={`${year}년 ${month}월`}>
      <p className="-mt-5 mb-8 text-center font-pixel text-xs text-muted">{formatWeddingDate()}</p>
      <PixelWindow className="px-4 py-6">
        <div className="grid grid-cols-7 gap-y-2.5 text-center font-pixel text-[13px]">
          {WEEKDAYS.map((weekday, i) => (
            <span key={weekday} className={`pb-2 text-xs ${i === 0 ? "text-[#ff8fa6]" : "text-muted"}`}>
              {weekday}
            </span>
          ))}
          {weddingMonthCells().map((date, i) => (
            <span key={i} className="flex justify-center">
              {date &&
                (date === day ? (
                  // 예식일: 도트 하트 위에 날짜
                  <span className="relative flex size-9 items-center justify-center text-night">
                    <PixelSprite
                      frames={HEART_FRAMES}
                      palette={HEART_PALETTE}
                      className="absolute inset-0 m-auto h-8 w-9"
                    />
                    <span className="relative -mt-1.5">{date}</span>
                  </span>
                ) : (
                  <span
                    className={`flex size-9 items-center justify-center ${i % 7 === 0 ? "text-[#ff8fa6]" : "text-ink"}`}
                  >
                    {date}
                  </span>
                ))}
            </span>
          ))}
        </div>
      </PixelWindow>
      <Countdown />
      <p className="mt-8 min-h-6 text-center font-pixel text-[13px] text-ink">
        <DdayText />
      </p>
    </PixelSection>
  );
}
