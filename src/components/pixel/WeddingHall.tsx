// 단체사진 배경: 밤의 예식홀 (120x90 도트).
// 아치형 창 두 개, 위쪽 커튼 장식, 가운데 꽃 아치와 꽃 받침대, 버진로드가 깔린 마루.
// 칸마다 rect를 만들지 않고 색별로 path 하나에 모아 그린다.

const W = 120;
const H = 90;
const FLOOR_Y = 64;

type Cells = Map<string, string>;

function paint(cells: Cells, x: number, y: number, color: string) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  cells.set(`${x},${y}`, color);
}

function fill(cells: Cells, x0: number, y0: number, w: number, h: number, color: string) {
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) paint(cells, x, y, color);
}

/** 좌표마다 늘 같은 0~1 값 (꽃 배치가 매번 같도록) */
function noise(x: number, y: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

const LEAVES = ["#3f7a55", "#4f9064", "#356a4a"];
const FLOWERS = ["#f4a6b8", "#fff6f0", "#f2c38a", "#e88aa6"];

function bloom(x: number, y: number) {
  const r = noise(x, y);
  return r < 0.38 ? FLOWERS[Math.floor(r * 100) % FLOWERS.length] : LEAVES[Math.floor(r * 10) % LEAVES.length];
}

/** 아치형 창: 위는 반원, 가운데 십자 창살, 아래 창턱 */
function windowAt(cells: Cells, left: number, withMoon: boolean) {
  const w = 16;
  const cx = left + w / 2;
  const top = 20;
  const bottom = 50;
  for (let y = 10; y <= bottom; y++) {
    for (let x = left - 1; x <= left + w; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - top;
      const inside = y >= top ? x >= left && x < left + w : Math.hypot(dx, dy) <= w / 2;
      const frame = y >= top ? x >= left - 1 && x <= left + w : Math.hypot(dx, dy) <= w / 2 + 1;
      if (inside) paint(cells, x, y, y < 28 ? "#4f5fa0" : "#3f4c8a");
      else if (frame) paint(cells, x, y, "#1c1b38");
    }
  }
  // 창살
  fill(cells, Math.floor(cx), 12, 1, bottom - 11, "#1c1b38");
  fill(cells, left, 33, w, 1, "#1c1b38");
  // 창턱
  fill(cells, left - 2, bottom + 1, w + 4, 2, "#4a4782");
  // 별 · 달
  paint(cells, left + 3, 24, "#ffffff");
  paint(cells, left + 12, 38, "#e8c879");
  paint(cells, left + 4, 43, "#ffffff");
  if (withMoon) {
    // 초승달: 큰 원에서 오른쪽 위로 비낀 원을 덜어낸다
    for (let y = 13; y < 21; y++) {
      for (let x = left + 7; x < left + 14; x++) {
        const lit = Math.hypot(x + 0.5 - (left + 10.5), y + 0.5 - 17) <= 3.2;
        const shadow = Math.hypot(x + 0.5 - (left + 12), y + 0.5 - 16) <= 2.8;
        if (lit && !shadow) paint(cells, x, y, "#f5e6b0");
      }
    }
  }
}

function buildHall() {
  const cells: Cells = new Map();

  // 벽 · 천장 몰딩 · 아래쪽 징두리 판벽
  fill(cells, 0, 0, W, FLOOR_Y, "#2a2853");
  fill(cells, 0, 0, W, 3, "#211f45");
  fill(cells, 0, 3, W, 1, "#3b3874");
  fill(cells, 0, 54, W, FLOOR_Y - 54, "#312e62");
  fill(cells, 0, 54, W, 1, "#45428a");
  for (let x = 3; x < W; x += 13) {
    fill(cells, x, 57, 10, 1, "#3a3772");
    fill(cells, x, 61, 10, 1, "#3a3772");
  }

  windowAt(cells, 6, true);
  windowAt(cells, W - 22, false);

  // 위쪽 커튼 장식 (물결 모양으로 늘어진 천)
  for (let x = 0; x < W; x++) {
    const sag = Math.round(Math.sin(((x % 20) / 20) * Math.PI) * 3);
    fill(cells, x, 4, 1, 2 + sag, "#7a2f4a");
    paint(cells, x, 6 + sag, "#5c2238");
  }
  for (let x = 0; x <= W; x += 20) fill(cells, x - 1, 4, 2, 4, "#e8c879");

  // 꽃 아치 안쪽의 은은한 빛
  const cx = 60;
  const cy = 40;
  for (let y = 22; y < FLOOR_Y; y++) {
    for (let x = 40; x < 80; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      if (y >= cy || d < 18) paint(cells, x, y, y < 54 ? "#36336f" : "#3a3775");
    }
  }
  // 꽃 아치: 위는 반원 고리, 양쪽 기둥은 바닥까지
  for (let y = 16; y < FLOOR_Y; y++) {
    for (let x = 34; x < 86; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const ring = y < cy && d >= 18 && d <= 22;
      const post = y >= cy && ((x >= 38 && x < 42) || (x >= 78 && x < 82));
      if (ring || post) paint(cells, x, y, bloom(x, y));
    }
  }

  // 꽃 받침대
  for (const px of [24, 93]) {
    fill(cells, px, 50, 3, FLOOR_Y - 50, "#d9d0c4");
    fill(cells, px - 1, 50, 5, 1, "#efe8dc");
    fill(cells, px - 2, FLOOR_Y - 1, 7, 1, "#b8ad9e");
    for (let y = 44; y < 50; y++) {
      for (let x = px - 3; x < px + 6; x++) {
        if (Math.hypot(x + 0.5 - (px + 1.5), (y + 0.5 - 48) * 1.3) <= 4.2) paint(cells, x, y, bloom(x, y));
      }
    }
  }

  // 마루: 멀어질수록 촘촘한 판자 줄
  fill(cells, 0, FLOOR_Y, W, H - FLOOR_Y, "#211f45");
  fill(cells, 0, FLOOR_Y, W, 1, "#45428a");
  for (const y of [67, 71, 76, 82, 89]) fill(cells, 0, y, W, 1, "#29275a");

  // 버진로드: 아치에서 앞으로 넓어지는 붉은 융단 + 금색 테두리 + 꽃잎
  for (let y = FLOOR_Y + 1; y < H; y++) {
    const half = Math.round(9 + ((y - FLOOR_Y) * 9) / (H - FLOOR_Y));
    fill(cells, cx - half, y, half * 2, 1, "#7a2f45");
    paint(cells, cx - half, y, "#c9a45a");
    paint(cells, cx + half - 1, y, "#c9a45a");
  }
  for (const [x, y] of [
    [55, 68],
    [64, 72],
    [52, 79],
    [67, 84],
    [58, 87],
  ]) {
    paint(cells, x, y, "#f4a6b8");
  }

  // 색별로 path 하나씩
  const paths = new Map<string, string>();
  for (const [key, color] of cells) {
    const [x, y] = key.split(",");
    paths.set(color, `${paths.get(color) ?? ""}M${x} ${y}h1v1h-1z`);
  }
  return [...paths];
}

const HALL = buildHall();

export function WeddingHall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" className={className} aria-hidden>
      {HALL.map(([color, d]) => (
        <path key={color} d={d} fill={color} />
      ))}
    </svg>
  );
}
