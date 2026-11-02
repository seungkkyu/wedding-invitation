"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// 매거진 버전 팔레트: 종이(#f4f1ec) · 잉크(#171513) · 옥스블러드(#7a2430) 하나만 포인트로
export const ISSUE_TITLE = "THE WEDDING ISSUE";

type PageProps = {
  id: string;
  folio: number;
  kicker: string;
  children: ReactNode;
  className?: string;
};

/** 잡지 한 페이지: 상단 러닝 헤더 + 하단 페이지 번호 */
export function Page({ id, folio, kicker, children, className = "" }: PageProps) {
  return (
    <section id={id} className={`scroll-mt-4 px-6 pt-10 pb-8 ${className}`}>
      <p className="flex items-center justify-between border-b border-[#171513]/80 pb-2 text-[9px] tracking-[0.3em] text-[#171513]/70">
        <span>{ISSUE_TITLE}</span>
        <span>{kicker}</span>
      </p>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <p className="mt-14 flex items-center gap-3 font-display text-[11px] text-[#171513]/60 lining-nums">
        <span className="h-px flex-1 bg-[#171513]/15" />
        {String(folio).padStart(2, "0")}
      </p>
    </section>
  );
}

/** 섹션 제목: 영문 대제목 + 굵은 한글 부제 */
export function Headline({ en, ko, lead }: { en: string; ko: string; lead?: string }) {
  return (
    <header className="mt-10 mb-10">
      <h2 className="font-display text-[2.6rem] leading-[0.95] tracking-tight text-[#171513] italic">{en}</h2>
      <p className="mt-4 font-headline text-lg font-extrabold text-[#171513]">{ko}</p>
      {lead && <p className="mt-3 text-[13px] leading-6 text-[#171513]/60">{lead}</p>}
    </header>
  );
}

/** 작은 대문자 라벨 */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[10px] tracking-[0.28em] text-[#7a2430] uppercase ${className}`}>{children}</span>;
}

// 복사 버튼 모양 (CopyButton에 넘긴다)
export const COPY_CLASS = "border-b border-[#171513]/40 pb-px text-[10px] tracking-[0.2em] text-[#171513]";
