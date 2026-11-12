"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { coverPhoto, wedding } from "@/data/wedding";
import { formatWeddingDateDots } from "@/lib/date";

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

// 바코드 막대 굵기 패턴 (1 = 가는 막대, 3 = 굵은 막대)
const BARS = [2, 1, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 1, 2];

function Barcode() {
  return (
    <div className="bg-white px-2 pt-1.5 pb-1 text-[#171513]">
      <div className="flex h-7 items-stretch gap-px">
        {BARS.map((width, i) => (
          <span key={i} className={`bg-current ${width === 1 ? "w-px" : width === 2 ? "w-0.5" : "w-[3px]"}`} />
        ))}
      </div>
      <p className="mt-0.5 text-center font-display text-[7px] tracking-[0.2em] lining-nums">
        {formatWeddingDateDots().replaceAll(".", "")}
      </p>
    </div>
  );
}

export function Cover() {
  const { groom, bride, date, firstDay } = wedding;
  const cover = coverPhoto;
  const years = date.year - firstDay.year;

  return (
    <section className="relative h-dvh min-h-[560px] overflow-hidden bg-[#171513] text-white">
      {cover && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 7, ease: "easeOut" }}
        >
          <Image src={cover.src} alt="커버 사진" fill preload sizes="480px" className="object-cover" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.05)_32%,rgba(0,0,0,0.05)_55%,rgba(0,0,0,0.7)_100%)]" />

      {/* 상단 56px는 버전 탭이 덮으므로 마스트헤드는 그 아래부터 */}
      <motion.header
        className="absolute inset-x-0 top-16 px-5 text-center"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
      >
        <p className="text-[9px] tracking-[0.5em] text-white/85">THE</p>
        <h1 className="font-display text-[min(19vw,92px)] leading-[0.85] font-medium tracking-[-0.02em]">WEDDING</h1>
        <p className="mt-3 flex items-center justify-between border-y border-white/60 py-1.5 text-[9px] tracking-[0.3em] lining-nums">
          <span>VOL. 01</span>
          <span>
            {MONTHS[date.month - 1]} {date.year}
          </span>
          <span>SEOUL</span>
        </p>
      </motion.header>

      {/* 커버 라인 */}
      <motion.div
        className="absolute bottom-24 left-5 max-w-[62%] space-y-5"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
      >
        <div>
          <p className="text-[9px] tracking-[0.3em] text-white/75">THE BIG DAY</p>
          <p className="mt-1 font-display text-2xl leading-none lining-nums">{formatWeddingDateDots()}</p>
        </div>
        <div>
          <p className="font-display text-[11px] tracking-[0.15em] italic text-white/80">Exclusive</p>
          <p className="mt-1 font-headline text-[15px] leading-snug font-extrabold">
            {years}년의 연애,
            <br />그 끝과 시작
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-5 bottom-6 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <p className="font-display text-[1.7rem] leading-none italic">
          {groom.name}
          <span className="mx-2 text-base not-italic text-white/70">&amp;</span>
          {bride.name}
        </p>
        <Barcode />
      </motion.div>
    </section>
  );
}
