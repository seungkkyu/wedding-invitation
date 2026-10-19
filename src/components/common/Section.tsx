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
      className={`px-6 py-16 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {(eyebrow || title) && (
        <header className="mb-10 text-center">
          {eyebrow && <p className="text-xs tracking-[0.3em] text-accent uppercase">{eyebrow}</p>}
          {title && <h2 className="mt-2 font-serif text-xl text-ink">{title}</h2>}
        </header>
      )}
      {children}
    </motion.section>
  );
}
