"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// 필름 버전 공통 색: 따뜻한 검정 바탕, 크림색 글씨, 코닥 필름 가장자리의 주황빛 표기
export const FILM = {
  amber: "text-[#d9913a]",
  cream: "text-[#efe6d6]",
  muted: "text-[#a39684]",
  line: "border-[#efe6d6]/12",
};

/** 섹션 사이에 들어가는 필름 가장자리 표기 (프레임 번호 + 필름 이름) */
export function FrameMark({ n }: { n: number }) {
  return (
    <p
      aria-hidden
      className={`flex justify-between px-5 font-typewriter text-[9px] tracking-[0.25em] ${FILM.amber} opacity-60`}
    >
      <span>◂ {n}A</span>
      <span>KODAK 400TX</span>
      <span>{n + 1} ▸</span>
    </p>
  );
}

/** 장면 제목: SCENE 번호 + 영문 타이틀 + 한글 제목 */
export function SceneTitle({ no, en, title }: { no: string; en: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className={`font-typewriter text-[11px] tracking-[0.35em] ${FILM.amber}`}>SCENE {no}</p>
      <h2 className={`mt-3 font-cinema text-[2.6rem] leading-none tracking-[0.12em] ${FILM.cream}`}>{en}</h2>
      <p className={`mt-3 font-serif text-sm ${FILM.muted}`}>{title}</p>
    </Reveal>
  );
}

/** 스크롤해서 보일 때 천천히 떠오르는 블록 */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
