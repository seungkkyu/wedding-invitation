import { wedding } from "@/data/wedding";

export type TimeOfDay = "dawn" | "morning" | "ceremony" | "afternoon" | "dusk" | "night";

type Sky = {
  /** 위에서 아래로 하늘 그라데이션 */
  gradient: string;
  /** 해(또는 달)의 위치. 하늘 영역 기준 % */
  sun: [x: number, y: number];
  sunColor: string;
  moon: boolean;
  stars: number;
  clouds: number;
  /** 먼 산 능선 색 */
  ridge: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const { hour, minute } = wedding.date;

/** 섹션별 시각 (예식 시각은 실제 예식 시간) */
export const CLOCK: Record<TimeOfDay, string> = {
  dawn: "05:40",
  morning: "08:20",
  ceremony: `${pad(hour)}:${pad(minute)}`,
  afternoon: `${pad(Math.min(Math.max(hour + 3, 14), 17))}:30`,
  dusk: "19:10",
  night: "22:40",
};

export const SKY: Record<TimeOfDay, Sky> = {
  dawn: {
    gradient: "linear-gradient(180deg,#1f2547 0%,#3f4173 42%,#a7727f 78%,#e9a983 100%)",
    sun: [20, 96],
    sunColor: "#ffb27a",
    moon: false,
    stars: 0.7,
    clouds: 0.08,
    ridge: "#2a2848",
  },
  morning: {
    gradient: "linear-gradient(180deg,#9ec3dc 0%,#cfe0e6 55%,#f2e1c4 100%)",
    sun: [26, 34],
    sunColor: "#fff3d2",
    moon: false,
    stars: 0,
    clouds: 0.85,
    ridge: "#8fa3a8",
  },
  ceremony: {
    gradient: "linear-gradient(180deg,#5f9fcf 0%,#9cc6e2 55%,#d9eaf1 100%)",
    sun: [52, 10],
    sunColor: "#fffbea",
    moon: false,
    stars: 0,
    clouds: 1,
    ridge: "#7f9aa8",
  },
  afternoon: {
    gradient: "linear-gradient(180deg,#86b2d2 0%,#c8d8dc 55%,#eed6a6 100%)",
    sun: [72, 26],
    sunColor: "#ffe7ad",
    moon: false,
    stars: 0,
    clouds: 0.8,
    ridge: "#8c9590",
  },
  dusk: {
    gradient: "linear-gradient(180deg,#2c2c5a 0%,#5d4474 38%,#a85a6a 72%,#d9784f 100%)",
    sun: [82, 90],
    sunColor: "#ff9455",
    moon: false,
    stars: 0.25,
    clouds: 0.2,
    ridge: "#3a2846",
  },
  night: {
    gradient: "linear-gradient(180deg,#0c1330 0%,#17214a 60%,#262d5e 100%)",
    sun: [96, 120],
    sunColor: "#ff9455",
    moon: true,
    stars: 1,
    clouds: 0,
    ridge: "#0f1630",
  },
};

export const TIMES = Object.keys(SKY) as TimeOfDay[];
