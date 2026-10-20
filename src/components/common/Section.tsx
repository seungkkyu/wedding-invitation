"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

/** 스크롤 시 페이드인 되는 공통 섹션 */
export function Section({ eyebrow, title, children, className = "" }: SectionProps) {
  return (
    <motion.section
      className={`px-8 py-20 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {(eyebrow || title) && (
        <header className="mb-12 flex flex-col items-center text-center">
          {eyebrow && <p className="font-display text-[1.7rem] leading-none text-accent italic">{eyebrow}</p>}
          <span className="mt-4 h-px w-6 bg-accent/40" />
          {title && <h2 className="mt-4 font-serif text-base tracking-wide text-ink">{title}</h2>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
