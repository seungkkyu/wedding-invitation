"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/data/wedding";

// 폴라로이드 기울기. 렌더마다 같아야 해서(하이드레이션) 무작위 대신 인덱스로 고른다
export const TILTS = ["-rotate-2", "rotate-3", "-rotate-1", "rotate-2", "-rotate-3", "rotate-1"];

// 마스킹테이프 무늬
const TAPE_TONES = {
  pink: "bg-[repeating-linear-gradient(45deg,rgba(242,166,166,0.78)_0_6px,rgba(250,204,198,0.78)_6px_12px)]",
  mint: "bg-[rgba(150,204,184,0.72)] bg-[radial-gradient(rgba(255,255,255,0.75)_1.4px,transparent_1.8px)] bg-[length:8px_8px]",
  yellow:
    "bg-[rgba(250,216,120,0.75)] bg-[linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[length:7px_7px]",
  blue: "bg-[repeating-linear-gradient(90deg,rgba(160,190,225,0.78)_0_8px,rgba(200,218,240,0.78)_8px_16px)]",
} as const;

export type TapeTone = keyof typeof TAPE_TONES;

/** 양 끝이 찢긴 마스킹테이프 한 조각 */
export function Tape({ tone = "pink", className = "" }: { tone?: TapeTone; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block h-6 mix-blend-multiply [clip-path:polygon(3%_0,97%_0,100%_22%,96%_48%,100%_74%,97%_100%,3%_100%,0_76%,4%_50%,0_24%)] ${TAPE_TONES[tone]} ${className}`}
    />
  );
}

type PolaroidProps = {
  photo?: Photo;
  caption?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** 흰 테두리 폴라로이드. 사진 칸은 정사각형으로 고정해 가로·세로 사진이 섞여도 크기가 같다 */
export function Polaroid({ photo, caption, sizes, preload, className = "" }: PolaroidProps) {
  const text = caption ?? photo?.caption;
  return (
    <figure
      className={`bg-[#fffefb] p-3 pb-1 shadow-[0_12px_26px_-12px_rgba(70,50,25,0.5),0_1px_2px_rgba(70,50,25,0.15)] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-[#e9dfcd]">
        {photo ? (
          <Image
            src={photo.src}
            alt={text ?? "사진"}
            fill
            sizes={sizes}
            preload={preload}
            draggable={false}
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-hand-en text-xl text-ink/40">
            photo coming soon
          </span>
        )}
      </div>
      <figcaption className="h-11 truncate px-1 text-center font-hand-en text-xl leading-[2.75rem] text-ink/80">
        {text}
      </figcaption>
    </figure>
  );
}

type PageProps = {
  no: string;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
};

/** 다이어리 한 페이지: 쪽 번호 + 형광펜 제목, 스크롤하면 살짝 떠오른다 */
export function Page({ no, title, sub, children, className = "" }: PageProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className={`relative px-6 py-16 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <header className="mb-10 text-center">
        <p className="font-hand-en text-lg text-ink/45">p.{no}</p>
        <h2 className="mt-1 inline-block bg-[linear-gradient(transparent_58%,rgba(255,219,112,0.75)_58%)] px-1.5 font-hand text-[2.2rem] leading-none text-ink">
          {title}
        </h2>
        {sub && <p className="mt-4 font-hand text-xl text-ink/60">{sub}</p>}
      </header>
      {children}
    </motion.section>
  );
}

/** 페이지 사이 절취선 */
export function CutLine() {
  return (
    <div aria-hidden className="mx-8 flex items-center gap-2 text-ink/30">
      <span className="text-sm">✂</span>
      <span className="flex-1 border-t-2 border-dashed border-current" />
    </div>
  );
}

/** 손으로 그린 듯한 별 스티커 */
export function StarSticker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2.5l2.6 6 6.4.6-4.9 4.3 1.5 6.3L12 16.4l-5.6 3.3 1.5-6.3L3 9.1l6.4-.6z"
        fill="currentColor"
        stroke="#fffefb"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 하트 스티커 */
export function HeartSticker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"
        fill="currentColor"
        stroke="#fffefb"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </svg>
  );
}
