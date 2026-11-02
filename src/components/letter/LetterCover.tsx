"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDate, formatWeddingDateDots } from "@/lib/date";
import { Sprig } from "./Ornament";

// 커버 위로 천천히 떨어지는 꽃잎 (몇 장만)
const PETALS = [
  { left: "8%", size: 10, delay: 0, duration: 11 },
  { left: "24%", size: 7, delay: 3.5, duration: 13 },
  { left: "47%", size: 9, delay: 6, duration: 12 },
  { left: "68%", size: 6, delay: 1.5, duration: 14 },
  { left: "86%", size: 8, delay: 8, duration: 12 },
];

function Petals() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PETALS.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute -top-4 rounded-[100%_0] bg-[#efc9c0]/80"
          style={{ left: petal.left, width: petal.size, height: petal.size }}
          animate={{ y: ["0vh", "105vh"], x: [0, 30, -10, 24], rotate: [0, 200, 420] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function LetterCover() {
  const { groom, bride } = wedding;
  const photo = wedding.gallery[0];

  return (
    <section className="relative flex min-h-dvh flex-col items-center px-8 pt-20 pb-14 text-center">
      <Petals />
      <p className="font-garamond text-xs tracking-[0.45em] text-[#9a8b82] lining-nums">{formatWeddingDateDots()}</p>
      <p className="mt-3 font-script text-[2.6rem] leading-none text-[#b7867a]">Our Wedding Day</p>

      {/* 아치형 액자: 바깥 금선 + 안쪽 사진 */}
      <motion.div
        className="mt-8 w-[80%] rounded-t-full border border-[#c9a36a]/45 p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-[#eadfd3]">
          {photo && (
            <Image
              src={photo.src}
              alt={`${groom.name}와 ${bride.name}`}
              fill
              preload
              sizes="(max-width: 480px) 75vw, 360px"
              className="object-cover"
            />
          )}
        </div>
      </motion.div>

      <h1 className="mt-10 flex items-center gap-3 font-serif text-[1.55rem] text-[#4a3f3a]">
        {groom.name}
        <span className="font-script text-2xl text-[#b7867a]">&amp;</span>
        {bride.name}
      </h1>
      <Sprig className="mt-6" />
      <p className="mt-6 font-serif text-[13px] leading-7 text-[#8f8078]">
        {formatWeddingDate()}
        <br />
        {venueLabel}
      </p>
    </section>
  );
}
