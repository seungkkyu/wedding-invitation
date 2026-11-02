"use client";

import { useSyncExternalStore } from "react";
import { daysUntilWedding, msUntilWedding } from "@/lib/date";

const noopSubscribe = () => () => {};
const subscribeSeconds = (onTick: () => void) => {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
};
// 같은 초 안에서는 같은 값을 돌려줘야 불필요한 렌더가 없다
const currentSecond = () => Math.floor(Date.now() / 1000);

export type Remaining = { days: number; hours: number; minutes: number; seconds: number };

/**
 * 예식 시작까지 남은 시간 (1초마다 갱신).
 * 서버 렌더 시점과 접속 시점의 시간이 달라 서버에서는 null, 예식이 시작됐으면 "started".
 */
export function useCountdown(): Remaining | "started" | null {
  const second = useSyncExternalStore(subscribeSeconds, currentSecond, () => null);
  if (second === null) return null;
  const ms = msUntilWedding(second * 1000);
  if (ms <= 0) return "started";
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

/** 오늘(KST)부터 예식일까지 남은 일수 (당일 0, 지나면 음수). 서버에서는 null */
export function useDday() {
  return useSyncExternalStore(noopSubscribe, () => daysUntilWedding(), () => null);
}
