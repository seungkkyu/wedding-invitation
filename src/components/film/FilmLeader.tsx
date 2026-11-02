"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";

const NUMBERS = [3, 2, 1];
const SWEEP_SECONDS = 0.8;

/** 영화 시작 전 필름 리더: 3·2·1 원이 한 바퀴씩 돌고 컷. 화면을 누르면 건너뛴다 */
export function FilmLeader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  useScrollLock();

  const next = () => (step < NUMBERS.length - 1 ? setStep(step + 1) : onDone());

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#26221e]"
      onClick={onDone}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="button"
      aria-label="오프닝 건너뛰기"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75))]" />
      {/* 십자선 */}
      <span className="absolute inset-x-0 top-1/2 h-px bg-[#efe6d6]/25" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-[#efe6d6]/25" />

      <div className="relative size-[min(72vw,320px)]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90">
          <motion.circle
            key={step}
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="rgba(239,230,214,0.14)"
            strokeWidth="50"
            pathLength={1}
            strokeDasharray="1 1"
            initial={{ strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: SWEEP_SECONDS, ease: "linear" }}
            onAnimationComplete={next}
          />
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(239,230,214,0.5)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(239,230,214,0.35)" strokeWidth="0.6" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-cinema text-[9rem] leading-none text-[#efe6d6]">
          {NUMBERS[step]}
        </span>
      </div>

      <p className="absolute bottom-10 font-typewriter text-[10px] tracking-[0.3em] text-[#efe6d6]/45">TAP TO SKIP</p>
    </motion.div>
  );
}
