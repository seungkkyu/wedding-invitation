"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { coverPhoto, venueLabel, wedding } from "@/data/wedding";
import { formatWeddingDateDots } from "@/lib/date";
import { FILM } from "./parts";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

/** 오프닝 타이틀: 레터박스 속 대표 사진 + 크레딧 */
export function TitleCard({ ready }: { ready: boolean }) {
  const { groom, bride } = wedding;
  const cover = coverPhoto;

  return (
    <motion.section
      className="flex min-h-dvh flex-col justify-center bg-black pt-20 pb-12"
      variants={container}
      initial="hidden"
      animate={ready ? "show" : "hidden"}
    >
      <motion.div variants={line} className="mb-6 px-8 text-center">
        <p className={`font-typewriter text-[11px] tracking-[0.35em] ${FILM.muted}`}>A FILM BY</p>
        <p className={`mt-2 font-serif text-lg ${FILM.cream}`}>
          {groom.name} <span className={FILM.amber}>&amp;</span> {bride.name}
        </p>
      </motion.div>

      <motion.div
        className="relative aspect-4/5 w-full overflow-hidden"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.6, ease: "easeOut" } } }}
      >
        {cover ? (
          <motion.div
            className="absolute inset-0"
            variants={{ hidden: { scale: 1.12 }, show: { scale: 1, transition: { duration: 8, ease: "easeOut" } } }}
          >
            <Image
              src={cover.src}
              alt={`${groom.name}와 ${bride.name}`}
              fill
              preload
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover brightness-[0.9] contrast-[1.08] saturate-[0.8] sepia-[0.25]"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-[#2a2520]" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_35%,transparent_55%,rgba(0,0,0,0.85))]" />
        <motion.div variants={line} className="absolute inset-x-0 bottom-0 px-8 pb-8 text-center">
          <h1 className={`font-cinema text-[4.2rem] leading-[0.9] tracking-[0.08em] ${FILM.cream}`}>THE WEDDING</h1>
          <p className={`mt-3 font-serif text-[15px] tracking-wide ${FILM.cream} opacity-90`}>우리, 결혼합니다</p>
        </motion.div>
      </motion.div>

      <motion.div variants={line} className="mt-8 px-8 text-center">
        <p className={`font-cinema text-2xl tracking-[0.4em] ${FILM.amber}`}>{formatWeddingDateDots()}</p>
        <p className={`mt-2 font-typewriter text-xs tracking-[0.15em] ${FILM.muted}`}>{venueLabel}</p>
      </motion.div>

      <motion.p
        variants={line}
        className={`mt-10 text-center font-typewriter text-[10px] tracking-[0.4em] ${FILM.muted}`}
      >
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL ▾
        </motion.span>
      </motion.p>
    </motion.section>
  );
}
