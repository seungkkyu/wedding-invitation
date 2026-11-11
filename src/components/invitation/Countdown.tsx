"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCountdown } from "@/hooks/useCountdown";

const UNITS = [
  { label: "일", key: "days" },
  { label: "시간", key: "hours" },
  { label: "분", key: "minutes" },
  { label: "초", key: "seconds" },
] as const;

function Unit({ label, value, pad }: { label: string; value: number; pad: boolean }) {
  const text = pad ? String(value).padStart(2, "0") : String(value);
  return (
    <div className="flex flex-col items-center">
      <span className="relative flex h-12 w-full items-center justify-center overflow-hidden bg-ivory pixel-box [--pixel-border:var(--color-line)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="font-pixel text-xl leading-none text-accent tabular-nums"
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.25, ease: "linear" }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-2.5 font-pixel text-[11px] text-muted">{label}</span>
    </div>
  );
}

/** 예식 시작까지 실시간 카운트다운. 예식이 시작되면 숨긴다. */
export function Countdown() {
  // 서버 렌더 시점과 접속 시점의 시간이 달라 클라이언트에서만 계산
  const remaining = useCountdown();
  if (remaining === "started") return null;

  // 날짜 차이로 세는 D-day(아래 문장)와 달리 예식 시각까지 남은 실제 시간이라, 무엇을 세는지 함께 적는다
  return (
    <div className={`mt-10 ${remaining === null ? "invisible" : ""}`}>
      <p className="mb-3 text-center font-pixel text-xs text-muted">예식 시작까지</p>
      <div className="grid grid-cols-4 gap-3 px-1">
        {UNITS.map(({ label, key }) => (
          <Unit key={label} label={label} value={remaining?.[key] ?? 0} pad={key !== "days"} />
        ))}
      </div>
    </div>
  );
}
