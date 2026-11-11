"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type PixelSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** 도트 버전 섹션: 금색 도트 제목 + 양옆 픽셀 장식. 스크롤해 들어오면 한 번 나타난다 */
export function PixelSection({ title, children, className = "" }: PixelSectionProps) {
  return (
    <motion.section
      className={`px-7 py-16 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="mb-10 flex items-center justify-center gap-3 font-pixel text-lg text-accent">
        <PixelDiamond />
        {title}
        <PixelDiamond />
      </h2>
      {children}
    </motion.section>
  );
}

/** 3x3 픽셀 마름모 */
export function PixelDiamond({ className = "text-accent/70" }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 3" shapeRendering="crispEdges" className={`size-2 ${className}`} aria-hidden>
      <path d="M1 0h1v1h1v1H2v1H1V2H0V1h1z" fill="currentColor" />
    </svg>
  );
}

/** 대화창: 남색 바탕 + 깎인 모서리의 밝은 픽셀 테두리 */
export function PixelWindow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-ivory pixel-box ${className}`}>{children}</div>;
}
