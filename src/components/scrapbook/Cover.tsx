"use client";

import { motion, useReducedMotion } from "motion/react";
import { coverPhoto, venueLabel, wedding } from "@/data/wedding";
import { useDday } from "@/hooks/useCountdown";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { HeartSticker, Polaroid, StarSticker, Tape } from "./parts";

/** 동그란 D-day 스티커 (오늘 날짜는 접속 시점 기준이라 클라이언트에서만) */
function DdaySticker() {
  const days = useDday();
  if (days === null) return null;
  const text = days > 0 ? `D-${days}` : days === 0 ? "D-DAY" : `D+${-days}`;
  return (
    <span className="absolute -top-5 -right-3 z-10 flex size-20 rotate-12 items-center justify-center rounded-full bg-[#e0675a] shadow-[0_6px_14px_-6px_rgba(120,40,30,0.6)]">
      <span className="flex size-[68px] items-center justify-center rounded-full border border-dashed border-white/70 font-hand-en text-2xl font-semibold text-white">
        {text}
      </span>
    </span>
  );
}

export function Cover() {
  const reduceMotion = useReducedMotion();
  const { groom, bride, date } = wedding;
  // 폴라로이드가 위에서 툭 떨어지고, 테이프가 이어서 붙는다
  const drop = (delay: number, rotate: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: -60, rotate: rotate - 10 },
          animate: { opacity: 1, y: 0, rotate },
          transition: { type: "spring" as const, stiffness: 140, damping: 14, delay },
        };

  return (
    <section className="relative flex min-h-dvh flex-col items-center px-6 pt-20 pb-12 text-center">
      <p className="font-hand-en text-xl text-ink/50">
        {date.year} · vol.1 <span className="ml-1 text-[#e0675a]">♥</span>
      </p>
      <h1 className="relative mt-1 font-hand-en text-[3.1rem] leading-none font-semibold text-ink">
        Our Wedding Diary
        <StarSticker className="absolute -top-3 -right-5 size-7 rotate-12 text-[#f2c14e]" />
      </h1>
      <p className="mt-3 font-hand text-[1.7rem] text-ink/70">우리, 결혼합니다!</p>

      <motion.div className="relative mt-9 w-[82%]" {...drop(0.15, -3)}>
        <Tape tone="pink" className="absolute -top-3 left-6 z-10 w-24 -rotate-12" />
        <Tape tone="mint" className="absolute -top-2 right-8 z-10 w-20 rotate-[14deg]" />
        <DdaySticker />
        <Polaroid photo={coverPhoto} sizes="(max-width: 480px) 82vw, 390px" preload />
      </motion.div>

      <h2 className="mt-10 flex items-center justify-center gap-3 font-hand text-[2.6rem] leading-none text-ink">
        {groom.name}
        <HeartSticker className="size-7 -rotate-6 text-[#e0675a]" />
        {bride.name}
      </h2>
      <p className="mt-5 font-hand-en text-2xl tracking-wider text-ink/70">{formatWeddingDateDots()}</p>
      <p className="mt-2 text-[13px] leading-6 text-ink/60">
        {formatWeddingDate()}
        <br />
        {venueLabel}
      </p>
      <p className="mt-auto pt-10 font-hand-en text-lg text-ink/40">turn the page ↓</p>
    </section>
  );
}
