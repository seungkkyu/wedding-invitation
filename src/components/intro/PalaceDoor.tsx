// 40x48 임시 도트 궁전 문 (대리석 기둥 + 금장 아치 + 꽃 장식)

const CX = 20;
const ARCH_Y = 22; // 아치 곡선이 끝나고 직선 벽이 시작되는 y
const OPENING_R = 9; // 문 개구부 반폭
const BOTTOM = 45; // 계단 시작 y

const C = {
  marble: "#f4efe6",
  marbleShade: "#d8cfc0",
  gold: "#e2b85c",
  goldDark: "#b8893a",
  leaf: "#fffaf0",
  leafPanel: "#ecdfc8",
  fanlight: "#f7d6e0",
  light: "#fff3c4",
  green: "#6fb07a",
  pink: "#f7a8c4",
  rose: "#e5577a",
  white: "#ffffff",
  yellow: "#ffd76a",
};

type Rect = { x: number; y: number; w: number; h: number };

/** 반폭 r짜리 아치 + 직선 개구부를 픽셀 행으로 쪼갠다 */
function archRects(r: number, top: number = ARCH_Y): Rect[] {
  const rows: Rect[] = [];
  for (let y = top - r; y < top; y++) {
    const dy = top - y - 0.5;
    const half = Math.round(Math.sqrt(Math.max(r * r - dy * dy, 0)));
    if (half > 0) rows.push({ x: CX - half, y, w: half * 2, h: 1 });
  }
  return rows;
}

function Rects({ rects, fill, opacity }: { rects: Rect[]; fill: string; opacity?: number }) {
  return rects.map((r) => (
    <rect key={`${r.x}-${r.y}-${r.w}-${r.h}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={fill} opacity={opacity} />
  ));
}

const opening = (r: number): Rect[] => [...archRects(r), { x: CX - r, y: ARCH_Y, w: r * 2, h: BOTTOM - ARCH_Y }];

// 지붕: 위로 갈수록 좁아지는 계단형 박공
const PEDIMENT: Rect[] = Array.from({ length: 5 }, (_, i) => {
  const half = 7 + i * 3;
  return { x: CX - half, y: i + 1, w: half * 2, h: 1 };
});

// 아치 위 꽃 장식 위치 (반원 위 9개)
const GARLAND = Array.from({ length: 9 }, (_, k) => {
  const angle = (Math.PI * k) / 8;
  return {
    x: Math.round(CX - 0.5 + Math.cos(angle) * 10.5),
    y: Math.round(ARCH_Y - 0.5 - Math.sin(angle) * 10.5),
    color: [C.pink, C.white, C.rose][k % 3],
  };
});

function Column({ x }: { x: number }) {
  return (
    <>
      <rect x={x} y={8} width={5} height={BOTTOM - 8} fill={C.marble} />
      <rect x={x + 1} y={10} width={1} height={BOTTOM - 12} fill={C.marbleShade} />
      <rect x={x + 3} y={10} width={1} height={BOTTOM - 12} fill={C.marbleShade} />
      <rect x={x - 1} y={8} width={7} height={2} fill={C.gold} />
      <rect x={x - 1} y={BOTTOM - 2} width={7} height={2} fill={C.gold} />
    </>
  );
}

function Flower({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <>
      <rect x={x - 1} y={y} width={3} height={1} fill={color} />
      <rect x={x} y={y - 1} width={1} height={3} fill={color} />
      <rect x={x} y={y} width={1} height={1} fill={C.yellow} />
      <rect x={x + 1} y={y + 1} width={1} height={1} fill={C.green} />
    </>
  );
}

type PalaceDoorProps = {
  open: boolean;
  className?: string;
};

export function PalaceDoor({ open, className = "" }: PalaceDoorProps) {
  return (
    <svg viewBox="0 0 40 48" shapeRendering="crispEdges" className={className} aria-hidden>
      {/* 지붕 */}
      <rect x={CX - 4} y={0} width={8} height={1} fill={C.gold} />
      <Rects rects={PEDIMENT} fill={C.marble} />
      <rect x={CX - 1} y={2} width={2} height={2} fill={C.rose} />
      <rect x={0} y={6} width={40} height={1} fill={C.gold} />
      <rect x={1} y={7} width={38} height={1} fill={C.marbleShade} />

      {/* 벽 + 기둥 */}
      <rect x={3} y={8} width={34} height={BOTTOM - 8} fill={C.marble} />
      <Column x={3} />
      <Column x={32} />

      {/* 금장 아치 테두리 */}
      <Rects rects={opening(OPENING_R + 1)} fill={C.gold} />

      {open ? (
        <>
          <Rects rects={opening(OPENING_R)} fill={C.light} />
          <Rects rects={opening(OPENING_R - 2)} fill={C.white} opacity={0.85} />
          {/* 양쪽으로 열린 문짝 */}
          <rect x={CX - OPENING_R} y={ARCH_Y} width={2} height={BOTTOM - ARCH_Y} fill={C.leafPanel} />
          <rect x={CX + OPENING_R - 2} y={ARCH_Y} width={2} height={BOTTOM - ARCH_Y} fill={C.leafPanel} />
        </>
      ) : (
        <>
          <Rects rects={archRects(OPENING_R)} fill={C.fanlight} />
          <rect x={CX - OPENING_R} y={ARCH_Y} width={OPENING_R * 2} height={BOTTOM - ARCH_Y} fill={C.leaf} />
          <rect x={CX - OPENING_R} y={ARCH_Y - 1} width={OPENING_R * 2} height={1} fill={C.gold} />
          <rect x={CX - 1} y={ARCH_Y - OPENING_R} width={1} height={OPENING_R} fill={C.gold} />
          <rect x={CX - 1} y={ARCH_Y} width={2} height={BOTTOM - ARCH_Y} fill={C.goldDark} />
          {[12, 22].map((x) => (
            <g key={x}>
              <rect x={x} y={ARCH_Y + 3} width={6} height={7} fill={C.leafPanel} />
              <rect x={x} y={ARCH_Y + 12} width={6} height={9} fill={C.leafPanel} />
            </g>
          ))}
          <rect x={CX - 3} y={ARCH_Y + 11} width={1} height={2} fill={C.gold} />
          <rect x={CX + 2} y={ARCH_Y + 11} width={1} height={2} fill={C.gold} />
        </>
      )}

      {/* 아치 꽃 장식 + 양옆으로 늘어진 꽃 */}
      {GARLAND.map((f) => (
        <Flower key={`${f.x}-${f.y}`} {...f} />
      ))}
      {[ARCH_Y + 4, ARCH_Y + 9].flatMap((y, i) => [
        <Flower key={`l${y}`} x={CX - OPENING_R - 2} y={y} color={i ? C.pink : C.rose} />,
        <Flower key={`r${y}`} x={CX + OPENING_R + 1} y={y} color={i ? C.rose : C.pink} />,
      ])}

      {/* 계단 */}
      <rect x={2} y={BOTTOM} width={36} height={1} fill={C.marble} />
      <rect x={1} y={BOTTOM + 1} width={38} height={1} fill={C.marbleShade} />
      <rect x={0} y={BOTTOM + 2} width={40} height={1} fill={C.marble} />
    </svg>
  );
}
