import { Backdrop } from "@/components/ambient/blocks";

export type LightTime = "morning" | "forenoon" | "noon" | "afternoon" | "evening" | "night";
export const LIGHT_TIMES: LightTime[] = ["morning", "forenoon", "noon", "afternoon", "evening", "night"];

type Light = {
  /** 벽 색 */
  wall: string;
  /** 창 모양 볕 조각의 위치·기울기 (벽 기준). 해가 낮을수록 길게 눕는다 */
  patch: string;
  /** 볕 색 */
  sun: string;
  /** 볕 세기 */
  strength: number;
  /** 밤에 켜는 스탠드 불빛 */
  lamp: number;
};

const LIGHTS: Record<LightTime, Light> = {
  morning: {
    wall: "#dcdcd8",
    patch: "translate(-6%, 34%) skewY(-14deg) scale(0.9, 1.1)",
    sun: "#f7f3ea",
    strength: 0.75,
    lamp: 0,
  },
  forenoon: {
    wall: "#e3e1db",
    patch: "translate(4%, 22%) skewY(-8deg) scale(0.95, 1)",
    sun: "#fff8ea",
    strength: 0.9,
    lamp: 0,
  },
  noon: {
    wall: "#e8e4dc",
    patch: "translate(14%, 8%) skewY(-2deg) scale(0.9, 0.8)",
    sun: "#fffaf0",
    strength: 1,
    lamp: 0,
  },
  afternoon: {
    wall: "#e6dccb",
    patch: "translate(22%, 18%) skewY(8deg) scale(1, 1)",
    sun: "#ffefc9",
    strength: 0.95,
    lamp: 0,
  },
  evening: {
    wall: "#cdb79c",
    patch: "translate(30%, 34%) skewY(16deg) scale(1.15, 1.2)",
    sun: "#ffc887",
    strength: 0.85,
    lamp: 0,
  },
  night: {
    wall: "#2b2723",
    patch: "translate(40%, 40%) skewY(20deg) scale(1.2, 1.2)",
    sun: "#ffc887",
    strength: 0,
    lamp: 1,
  },
};

const FADE = "duration-[2200ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

// 나뭇잎 그림자: 흐림 필터를 SVG 안에 미리 구워 둔 이미지라, 흔들어도(transform) 다시 그리지 않는다
const LEAF_POSITIONS: [x: number, y: number, rotate: number, size: number][] = [
  [300, 10, 140, 1.2], [270, 40, 110, 1], [320, 60, 170, 1.1], [240, 80, 95, 0.9], [290, 100, 150, 1.2],
  [210, 120, 80, 1], [260, 140, 130, 0.9], [330, 150, 190, 1], [180, 160, 70, 1.1], [230, 190, 120, 1],
  [300, 210, 165, 0.8], [150, 210, 60, 0.9], [200, 240, 100, 1.1], [270, 260, 140, 0.9], [120, 260, 50, 1],
];
const LEAVES = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 340'><filter id='b'><feGaussianBlur stdDeviation='3.2'/></filter><g filter='url(#b)' fill='#5a4a38' fill-opacity='.5'><path d='M360 0 C300 60 240 140 110 280' stroke='#5a4a38' stroke-opacity='.45' stroke-width='3' fill='none'/>${LEAF_POSITIONS.map(
    ([x, y, r, s]) => `<path transform='translate(${x} ${y}) rotate(${r}) scale(${s})' d='M0 0C10-12 30-12 42 0 30 12 10 12 0 0Z'/>`,
  ).join("")}</g></svg>`,
)}")`;

/** 창틀 네 칸 (두 줄 두 칸, 사이 창살은 볕이 비지 않는 틈) */
const PANES = [
  "top-0 left-0 h-[48%] w-[47%]",
  "top-0 right-0 h-[48%] w-[47%]",
  "bottom-0 left-0 h-[48%] w-[47%]",
  "bottom-0 right-0 h-[48%] w-[47%]",
];

/**
 * 창가 버전의 배경: 벽과, 창을 지나 벽에 떨어진 볕 한 조각.
 * 섹션이 바뀌면 해가 움직인 것처럼 볕이 자리를 옮기고 기울며 색이 바뀐다.
 * 볕 안에는 바깥 나무의 잎 그림자가 흔들린다. 밤에는 볕 대신 스탠드 불빛.
 */
export function Room({ time }: { time: LightTime }) {
  const light = LIGHTS[time];

  return (
    <Backdrop>
      {/* 벽: 시간 순서로 쌓은 층을 차례로 켠다 (전환 중 틈 없이) */}
      {LIGHT_TIMES.map((t, i) => (
        <div
          key={t}
          className={`absolute inset-0 transition-opacity ${FADE}`}
          style={{ backgroundColor: LIGHTS[t].wall, opacity: i <= LIGHT_TIMES.indexOf(time) ? 1 : 0 }}
        />
      ))}
      {/* 벽면 질감 */}
      <div className="absolute inset-0 bg-paper opacity-50 mix-blend-multiply" />

      {/* 볕 조각 */}
      <div
        className={`absolute top-[6%] left-[8%] h-[52%] w-[62%] origin-top-left transition-[transform,opacity] ${FADE}`}
        style={{ transform: light.patch, opacity: light.strength }}
      >
        {PANES.map((pane, i) => (
          <div key={pane} className={`absolute overflow-hidden ${pane}`}>
            <div
              className={`absolute inset-0 transition-colors ${FADE}`}
              style={{ backgroundColor: light.sun, boxShadow: `0 0 18px 6px ${light.sun}` }}
            />
            {/* 잎 그림자: 볕 전체 크기로 깔고 칸 위치만큼 당겨 네 칸이 한 장처럼 보이게 */}
            <div
              className="absolute h-[208%] w-[213%] origin-top-right animate-leaves bg-no-repeat"
              style={{
                backgroundImage: LEAVES,
                backgroundSize: "100% 100%",
                top: i < 2 ? "0" : "-108%",
                left: i % 2 === 0 ? "0" : "-113%",
              }}
            />
          </div>
        ))}
      </div>

      {/* 스탠드 불빛 (밤) */}
      <div
        className={`absolute -right-24 -bottom-24 size-[28rem] rounded-full transition-opacity ${FADE}`}
        style={{
          opacity: light.lamp,
          backgroundImage: "radial-gradient(closest-side, rgba(255,196,128,0.5), rgba(255,170,90,0.18) 55%, transparent)",
        }}
      />
    </Backdrop>
  );
}
