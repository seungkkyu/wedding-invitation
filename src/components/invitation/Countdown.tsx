"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCountdown } from "@/hooks/useCountdown";

const UNITS = [
  { label: "DAYS", key: "days" },
  { label: "HOURS", key: "hours" },
  { label: "MINS", key: "minutes" },
  { label: "SECS", key: "seconds" },
] as const;

function Unit({ label, value }: { label: string; value: number }) {
  const text = label === "DAYS" ? String(value) : String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center px-4">
      <span className="relative flex h-10 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="font-display text-[1.9rem] leading-none text-ink lining-nums tabular-nums"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-2 text-[10px] tracking-[0.2em] text-muted">{label}</span>
    </div>
  );
}

/** 예식 시작까지 실시간 카운트다운. 예식이 시작되면 숨긴다. */
export function Countdown() {
  // 서버 렌더 시점과 접속 시점의 시간이 달라 클라이언트에서만 계산
  const remaining = useCountdown();
  if (remaining === "started") return null;

  return (
    <div className={`mt-12 flex justify-center divide-x divide-line ${remaining === null ? "invisible" : ""}`}>
      {UNITS.map(({ label, key }) => (
        <Unit key={label} label={label} value={remaining?.[key] ?? 0} />
      ))}
    </div>
  );
}
