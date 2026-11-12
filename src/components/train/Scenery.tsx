"use client";

import { AnimatePresence, motion } from "motion/react";
import { Backdrop } from "@/components/ambient/blocks";

export type Stop = "manam" | "insa" | "chueok" | "hall" | "maeum" | "hamkke";
export const STOPS: Stop[] = ["manam", "insa", "chueok", "hall", "maeum", "hamkke"];

const svg = (body: string, w = 960, h = 240) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${body}</svg>`,
  )}")`;

/** 0~960 사이에 같은 간격으로 반복되는 x 좌표 (타일 양 끝이 이어지도록) */
const xs = (step: number) => Array.from({ length: Math.floor(960 / step) }, (_, i) => i * step);

// 건물 실루엣: 높이를 고정 패턴으로 돌려 매번 같은 모양
const skyline = (fill: string, base: number, heights: number[], width: number, windows?: string) =>
  svg(
    xs(width)
      .map((x, i) => {
        const h = heights[i % heights.length];
        const lit = windows
          ? Array.from({ length: Math.floor(h / 22) }, (_, r) =>
              (i + r) % 3 === 0 ? `<rect x='${x + 8}' y='${240 - base - h + 10 + r * 22}' width='6' height='8' fill='${windows}'/>` : "",
            ).join("")
          : "";
        return `<rect x='${x}' y='${240 - base - h}' width='${width - 4}' height='${h + base}' fill='${fill}'/>${lit}`;
      })
      .join(""),
  );

const hills = (fill: string, amp: number, y: number) =>
  svg(`<path d='M0 ${y} C160 ${y - amp} 320 ${y - amp} 480 ${y} S800 ${y + amp * 0.4} 960 ${y} V240 H0Z' fill='${fill}'/>`);

const trees = (fill: string) =>
  svg(
    xs(60)
      .map((x, i) => {
        const r = 14 + (i % 3) * 6;
        return `<rect x='${x + 27}' y='${200 - r}' width='4' height='${r + 40}' fill='${fill}'/><circle cx='${x + 29}' cy='${196 - r}' r='${r}' fill='${fill}'/>`;
      })
      .join("") + `<rect y='212' width='960' height='28' fill='${fill}'/>`,
  );

const water = (fill: string, glint: string) =>
  svg(
    `<rect y='150' width='960' height='90' fill='${fill}'/>` +
      xs(80)
        .map((x, i) => `<rect x='${x + (i % 2) * 30}' y='${165 + (i % 4) * 16}' width='${18 + (i % 3) * 10}' height='2' fill='${glint}'/>`)
        .join(""),
  );

const lamps = (post: string, light: string) =>
  svg(
    xs(160)
      .map((x) => `<rect x='${x + 78}' y='120' width='3' height='120' fill='${post}'/><circle cx='${x + 80}' cy='118' r='5' fill='${light}'/><circle cx='${x + 80}' cy='118' r='16' fill='${light}' fill-opacity='.18'/>`)
      .join(""),
  );

/** 바로 앞을 휙휙 지나가는 전봇대와 늘어진 전선 */
const poles = (fill: string) =>
  svg(
    `<rect x='119' y='20' width='4' height='220' fill='${fill}'/><rect x='108' y='34' width='26' height='3' fill='${fill}'/>` +
      `<path d='M-2 40 Q60 70 121 40 T242 40 M-2 52 Q60 82 121 52 T242 52' stroke='${fill}' stroke-width='0.8' fill='none'/>`,
    240,
    240,
  );

type Scene = { sky: string; far: string; mid: string; ground: string; pole: string };

const SCENES: Record<Stop, Scene> = {
  // 도시의 아침
  manam: {
    sky: "linear-gradient(180deg,#c8dceb 0%,#efe6d6 100%)",
    far: skyline("#b7c3cc", 30, [60, 110, 80, 140, 70, 95, 120, 55], 48),
    mid: skyline("#8794a0", 10, [40, 70, 55, 90, 35, 60], 80),
    ground: "#6e7670",
    pole: "#3b3f42",
  },
  // 들판
  insa: {
    sky: "linear-gradient(180deg,#b9dbee 0%,#eef2e2 100%)",
    far: hills("#a5bca0", 60, 150),
    mid: trees("#5f7d57"),
    ground: "#8ea86c",
    pole: "#3b3f36",
  },
  // 강
  chueok: {
    sky: "linear-gradient(180deg,#a6c9e2 0%,#e8eef0 100%)",
    far: hills("#93a6b8", 80, 140),
    mid: water("#7fa3c0", "#e9f2f8"),
    ground: "#6a7f93",
    pole: "#34404a",
  },
  // 예식장이 있는 동네의 한낮
  hall: {
    sky: "linear-gradient(180deg,#8cc0e4 0%,#e2eff6 100%)",
    far: skyline("#a9b9c7", 40, [90, 150, 120, 180, 100, 140], 56),
    mid: trees("#6a8a6a"),
    ground: "#7b8790",
    pole: "#36404a",
  },
  // 노을 지는 바닷가
  maeum: {
    sky: "linear-gradient(180deg,#6f5a8f 0%,#d98a74 55%,#f4c995 100%)",
    far: svg(`<path d='M0 150 H960 V240 H0Z' fill='#8a6d8a'/><path d='M120 150 q60-40 120 0Z M620 150 q40-24 90 0Z' fill='#6a5576'/>`),
    mid: water("#7a5f7f", "#ffd9a8"),
    ground: "#4d4260",
    pole: "#2b2433",
  },
  // 불 켜진 밤의 도시
  hamkke: {
    sky: "linear-gradient(180deg,#0f1632 0%,#262c58 100%)",
    far: skyline("#1d2347", 30, [80, 140, 100, 170, 90, 130, 150], 52, "#f2cf78"),
    mid: lamps("#141832", "#ffd98c"),
    ground: "#0d1126",
    pole: "#05070f",
  },
};

const FADE = { duration: 1.4, ease: [0.4, 0, 0.2, 1] } as const;

/**
 * 기차 창밖 풍경. 지금 정차(스크롤)한 역의 풍경만 그려서, 흐르는 띠(합성 레이어)가 늘 몇 장뿐이다.
 * 먼 풍경은 느리게, 가까운 것은 빠르게 흘러 깊이가 생긴다.
 */
export function Scenery({ stop }: { stop: Stop }) {
  const scene = SCENES[stop];

  return (
    <Backdrop>
      <AnimatePresence initial={false}>
        <motion.div
          key={stop}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE}
        >
          <div className="absolute inset-0" style={{ backgroundImage: scene.sky }} />
          <div className="absolute inset-x-0 bottom-[16%] h-[30%] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-[400%] animate-pan bg-repeat-x"
              style={{ backgroundImage: scene.far, backgroundSize: "50% 100%", animationDuration: "90s" }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-[14%] h-[22%] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-[400%] animate-pan bg-repeat-x"
              style={{ backgroundImage: scene.mid, backgroundSize: "50% 100%", animationDuration: "26s" }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[15%]" style={{ backgroundColor: scene.ground }} />
          {/* 전봇대: 늘이지 않고 240px 타일 그대로. 띠 너비 1920px의 절반(=타일 4장)만큼 흘러 이음매가 없다 */}
          <div className="absolute inset-x-0 bottom-[8%] h-[240px] overflow-hidden opacity-80">
            <div
              className="absolute inset-y-0 left-0 w-[1920px] animate-pan bg-repeat-x"
              style={{ backgroundImage: poles(scene.pole), backgroundSize: "240px 240px", animationDuration: "2.4s" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 창틀: 둥근 창 바깥을 객실 벽색으로 덮고, 유리에 옅은 반사 */}
      <div className="absolute inset-2.5 rounded-[34px] shadow-[0_0_0_60px_#38332e,inset_0_0_24px_rgba(0,0,0,0.25)]" />
      <div className="absolute inset-2.5 rounded-[34px] bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,transparent_28%,transparent_62%,rgba(255,255,255,0.06)_70%,transparent_78%)]" />
    </Backdrop>
  );
}
