"use client";

import { AnimatePresence, motion } from "motion/react";
import { Backdrop } from "@/components/ambient/blocks";
import type { Season } from "@/lib/years";

/** 해마다 한 장의 계절 + 예식이 있는 초여름 낮 */
export type Mood = Season | "wedding";

type Weather = {
  sky: string;
  /** 떨어지거나 떠다니는 것 */
  particle: "petal" | "firefly" | "leaf" | "snow";
  colors: string[];
  count: number;
};

const WEATHER: Record<Mood, Weather> = {
  spring: { sky: "linear-gradient(180deg,#f4e4e4 0%,#eef0e2 100%)", particle: "petal", colors: ["#f1b6c1", "#f6ccd3", "#eaa3b2"], count: 16 },
  summer: { sky: "linear-gradient(180deg,#0d2622 0%,#173a31 70%,#1f4637 100%)", particle: "firefly", colors: ["#e8f59a", "#f4f9c4"], count: 18 },
  autumn: { sky: "linear-gradient(180deg,#efd2a6 0%,#e0a978 100%)", particle: "leaf", colors: ["#b5532f", "#d98b3a", "#9c3f24"], count: 12 },
  winter: { sky: "linear-gradient(180deg,#c9d4de 0%,#a9b8c7 100%)", particle: "snow", colors: ["#ffffff"], count: 26 },
  wedding: { sky: "linear-gradient(180deg,#e6f0e0 0%,#fbf6e6 100%)", particle: "petal", colors: ["#ffffff", "#f7efe0"], count: 10 },
};

// 위치·속도는 고정 패턴 (렌더할 때마다 같게)
const spread = (i: number, salt: number) => ((i * 37 + salt * 11) % 97) / 97;

function Particles({ weather }: { weather: Weather }) {
  return Array.from({ length: weather.count }, (_, i) => {
    const left = `${spread(i, 3) * 100}%`;
    const color = weather.colors[i % weather.colors.length];
    const delay = `${-spread(i, 7) * 12}s`;
    switch (weather.particle) {
      case "petal":
      case "leaf": {
        const leaf = weather.particle === "leaf";
        return (
          <span
            key={i}
            className="absolute -top-8 animate-petal"
            style={{ left, animationDelay: delay, animationDuration: `${(leaf ? 11 : 9) + (i % 5) * 1.6}s` }}
          >
            <span
              className={leaf ? "block h-3.5 w-2.5 rounded-[60%_10%_60%_10%]" : "block h-2.5 w-2 rounded-[70%_0_70%_0]"}
              style={{ backgroundColor: color, rotate: `${i * 47}deg` }}
            />
          </span>
        );
      }
      case "snow":
        return (
          <span
            key={i}
            className="absolute top-0 block animate-snow rounded-full bg-white/90"
            style={{
              left,
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              animationDelay: delay,
              animationDuration: `${9 + (i % 6) * 1.5}s`,
            }}
          />
        );
      case "firefly":
        return (
          <span
            key={i}
            className="absolute block size-1.5 animate-firefly rounded-full"
            style={{
              left,
              top: `${20 + spread(i, 5) * 75}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px 3px ${color}66`,
              animationDelay: `${-spread(i, 9) * 6}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        );
    }
  });
}

/**
 * 계절 배경. 지금 읽고 있는 해의 계절만 그려(지난 계절은 사라지며 정리) 움직이는 요소가 늘 스무 개 안팎이다.
 * 계절은 앞뒤로 오가므로 층을 쌓지 않고 겹쳐 바꾼다.
 */
export function Weather({ mood }: { mood: Mood }) {
  const weather = WEATHER[mood];

  return (
    <Backdrop>
      <AnimatePresence initial={false}>
        <motion.div
          key={mood}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: weather.sky }} />
          <Particles weather={weather} />
        </motion.div>
      </AnimatePresence>
    </Backdrop>
  );
}
