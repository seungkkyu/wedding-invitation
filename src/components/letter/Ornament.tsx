"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** 가는 선 + 가운데 잎사귀 한 줄기 (섹션 구분선) */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={`h-4 w-28 text-[#a3ad97] ${className}`} aria-hidden>
      <g stroke="currentColor" strokeWidth={0.8} strokeLinecap="round">
        <path d="M2 10h40M78 10h40" />
        <path d="M60 3c-3 4-3 9 0 14 3-5 3-10 0-14Z" />
        <path d="M58 11c-5-4-10-4-13-1 3 3 8 4 13 1ZM62 11c5-4 10-4 13-1-3 3-8 4-13 1Z" />
        <circle cx="42" cy="10" r="1" fill="currentColor" />
        <circle cx="78" cy="10" r="1" fill="currentColor" />
      </g>
    </svg>
  );
}

type LetterSectionProps = {
  /** 영문 캘리그래피 제목 */
  script?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** 스크롤 시 부드럽게 떠오르는 섹션 + 캘리그래피 제목 */
export function LetterSection({ script, title, children, className = "" }: LetterSectionProps) {
  return (
    <motion.section
      className={`px-7 py-20 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {(script || title) && (
        <header className="mb-12 flex flex-col items-center text-center">
          {script && <p className="font-script text-[2.4rem] leading-none text-[#b7867a]">{script}</p>}
          {title && <h2 className="mt-3 font-serif text-[13px] tracking-[0.3em] text-[#8f8078]">{title}</h2>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
