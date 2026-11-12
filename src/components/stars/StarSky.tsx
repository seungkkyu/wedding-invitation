"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Backdrop } from "@/components/ambient/blocks";

/** 페이지 끝까지 내렸을 때 하늘이 도는 각도 (일주운동처럼 시계 반대 방향) */
const TOTAL_TURN = (-110 * Math.PI) / 180;
/** 오작교가 놓이기 시작하는 스크롤 위치 (0~1) */
const BRIDGE_FROM = 0.8;
const MAGPIES = 15;

// 늘 같은 하늘이 그려지도록 고정 시드 난수
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

type Star = { x: number; y: number; r: number; a: number; twinkle: number };

/** 하늘 좌표(극 기준, 화면 대각선 = 1)의 별들. 화면 크기와 무관하게 한 번만 만든다 */
function makeSky() {
  const rand = seeded(20150718);
  const stars: Star[] = [];
  for (let i = 0; i < 620; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * 1.2;
    const bright = rand() ** 3;
    stars.push({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      r: 0.4 + bright * 1.4,
      a: 0.25 + bright * 0.75,
      twinkle: rand() < 0.25 ? rand() * Math.PI * 2 : -1,
    });
  }
  return { stars, rand };
}

const SKY = makeSky();

/**
 * 견우·직녀 별과 은하수가 마지막 장면에서 놓일 화면 위치(비율).
 * 그 위치에서 마지막 회전각만큼 거꾸로 돌려 하늘 좌표를 얻는다.
 */
const VEGA_END = { x: 0.22, y: 0.2 };
const ALTAIR_END = { x: 0.8, y: 0.36 };

type Geometry = { w: number; h: number; diag: number; poleX: number; poleY: number };

function toSky(g: Geometry, p: { x: number; y: number }) {
  const dx = (p.x * g.w - g.poleX) / g.diag;
  const dy = (p.y * g.h - g.poleY) / g.diag;
  const c = Math.cos(-TOTAL_TURN);
  const s = Math.sin(-TOTAL_TURN);
  return { x: dx * c - dy * s, y: dx * s + dy * c };
}

/** 은하수: 두 별 사이를 지나는 띠를 따라 흩뿌린 희미한 별들 */
function makeMilkyWay(g: Geometry) {
  const rand = seeded(7);
  const vega = toSky(g, VEGA_END);
  const altair = toSky(g, ALTAIR_END);
  const mid = { x: (vega.x + altair.x) / 2, y: (vega.y + altair.y) / 2 };
  // 두 별을 잇는 선에 수직인 방향으로 띠를 놓는다
  const len = Math.hypot(altair.x - vega.x, altair.y - vega.y);
  const dir = { x: -(altair.y - vega.y) / len, y: (altair.x - vega.x) / len };
  const dust: { x: number; y: number; a: number }[] = [];
  for (let i = 0; i < 1400; i++) {
    const t = (rand() - 0.5) * 3;
    // 가운데로 몰리는 분포 (세 번 더한 평균)
    const off = ((rand() + rand() + rand()) / 3 - 0.5) * 0.2;
    dust.push({ x: mid.x + dir.x * t - dir.y * off, y: mid.y + dir.y * t + dir.x * off, a: 0.12 + rand() * 0.4 });
  }
  return { vega, altair, mid, dir, dust };
}

/** 처음 만난 밤부터 돌아온 하늘. 스크롤만큼 별이 극을 중심으로 돈다 */
export function StarSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let g: Geometry;
    let milky: ReturnType<typeof makeMilkyWay>;
    let frame = 0;
    let lastDraw = 0;
    let lastProgress = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g = { w, h, diag: Math.hypot(w, h), poleX: w * 0.5, poleY: -h * 0.12 };
      milky = makeMilkyWay(g);
      lastProgress = -1;
    };

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const draw = (time: number) => {
      const p = progress();
      const angle = TOTAL_TURN * p;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const at = (x: number, y: number) => [g.poleX + (x * c - y * s) * g.diag, g.poleY + (x * s + y * c) * g.diag] as const;

      ctx.clearRect(0, 0, g.w, g.h);

      // 은하수 띠의 뿌연 빛: 띠 방향으로 길게 늘인 타원
      const [mx, my] = at(milky.mid.x, milky.mid.y);
      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(Math.atan2(milky.dir.y, milky.dir.x) + angle);
      ctx.scale(1, 0.16);
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, g.diag * 0.9);
      glow.addColorStop(0, "rgba(190,196,255,0.22)");
      glow.addColorStop(0.5, "rgba(170,180,255,0.08)");
      glow.addColorStop(1, "rgba(170,180,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(-g.diag, -g.diag, g.diag * 2, g.diag * 2);
      ctx.restore();

      ctx.fillStyle = "#dfe4ff";
      for (const d of milky.dust) {
        const [x, y] = at(d.x, d.y);
        if (x < -2 || y < -2 || x > g.w + 2 || y > g.h + 2) continue;
        ctx.globalAlpha = d.a;
        ctx.fillRect(x, y, 1.2, 1.2);
      }

      ctx.fillStyle = "#ffffff";
      for (const star of SKY.stars) {
        const [x, y] = at(star.x, star.y);
        if (x < -4 || y < -4 || x > g.w + 4 || y > g.h + 4) continue;
        const flicker = star.twinkle >= 0 && !reduceMotion ? 0.65 + 0.35 * Math.sin(time / 700 + star.twinkle) : 1;
        ctx.globalAlpha = star.a * flicker;
        // 작은 별은 사각형 한 점으로 (원 그리기보다 훨씬 싸다)
        if (star.r < 0.9) {
          ctx.fillRect(x - star.r, y - star.r, star.r * 2, star.r * 2);
          continue;
        }
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 직녀(베가)와 견우(알타이르)
      const label = Math.min(1, Math.max(0, (p - 0.5) / 0.2));
      for (const [star, name, color] of [
        [milky.vega, "직녀", "#e9ecff"],
        [milky.altair, "견우", "#fff1dc"],
      ] as const) {
        const [x, y] = at(star.x, star.y);
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 16);
        halo.addColorStop(0, color);
        halo.addColorStop(0.25, `${color}88`);
        halo.addColorStop(1, `${color}00`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.fillRect(x - 16, y - 16, 32, 32);
        if (label > 0) {
          ctx.globalAlpha = label * 0.8;
          ctx.fillStyle = color;
          ctx.font = "12px serif";
          ctx.textAlign = "center";
          ctx.fillText(name, x, y + 34);
        }
      }

      // 오작교: 까치들이 직녀 쪽부터 하나씩 날아와 다리를 놓는다
      const bridge = Math.min(1, Math.max(0, (p - BRIDGE_FROM) / (1 - BRIDGE_FROM - 0.04)));
      const count = Math.round(bridge * MAGPIES);
      ctx.strokeStyle = "#f5f2ea";
      ctx.lineWidth = 1.3;
      ctx.lineCap = "round";
      for (let i = 1; i <= count; i++) {
        const t = 0.04 + (i / (MAGPIES + 1)) * 0.92;
        // 은하수 위로 살짝 휘어 오르는 다리
        const bend = -Math.sin(t * Math.PI) * 0.07;
        const sx = milky.vega.x + (milky.altair.x - milky.vega.x) * t + milky.dir.x * bend;
        const sy = milky.vega.y + (milky.altair.y - milky.vega.y) * t + milky.dir.y * bend;
        const [x, y] = at(sx, sy);
        const flap = reduceMotion ? 0 : Math.sin(time / 180 + i) * 1.5;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 1 + flap);
        ctx.quadraticCurveTo(x - 1.5, y - 3, x, y);
        ctx.quadraticCurveTo(x + 1.5, y - 3, x + 4, y - 1 + flap);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      lastProgress = p;
      lastDraw = time;
    };

    const loop = (time: number) => {
      // 스크롤이 움직일 때는 매 프레임, 가만히 있을 땐 반짝임만 초당 12번쯤
      const moved = Math.abs(progress() - lastProgress) > 0.0002;
      if (moved || (!reduceMotion && time - lastDraw > 80)) draw(time);
      frame = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    frame = requestAnimationFrame(loop);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return (
    <Backdrop className="bg-[linear-gradient(180deg,#05081a_0%,#0c1230_55%,#18183a_100%)]">
      <canvas ref={canvasRef} className="size-full" />
    </Backdrop>
  );
}
