"use client";

import { motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/common/Icon";
import { Bride, Groom } from "@/components/pixel/Characters";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import {
  CLOUD_FRAMES,
  CLOUD_PALETTE,
  PALM_FRAMES,
  PALM_PALETTE,
  PLANE_FRAMES,
  PLANE_PALETTE,
} from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";
import { useScrollLock } from "@/hooks/useScrollLock";

const STARS = [
  { top: "6%", left: "14%" },
  { top: "12%", left: "72%" },
  { top: "20%", left: "38%" },
  { top: "9%", left: "88%" },
  { top: "26%", left: "8%" },
];

const CLOUDS = [
  { top: "18%", delay: "0s", duration: "2.6s", size: "h-4 w-12" },
  { top: "34%", delay: "0.9s", duration: "3.4s", size: "h-6 w-18" },
  { top: "52%", delay: "0.4s", duration: "2.2s", size: "h-3 w-9" },
  { top: "64%", delay: "1.6s", duration: "3s", size: "h-5 w-15" },
];

// 하객이 축하를 보냈을 때 공항에 흩날리는 꽃가루
const CONFETTI_COLORS = ["#ff8fab", "#f5d88a", "#ffffff", "#a5d8ff"];
const CONFETTI = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 5) * 0.35}s`,
  duration: `${3 + (i % 4) * 0.6}s`,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
}));

/** 하객이 보낸 축하. 비행기 현수막과 마지막 인사에 들어간다 */
export type Cheer = { name: string; message: string };

// 활주로 가장자리 유도등
const RUNWAY_LIGHTS = Array.from({ length: 12 }, (_, i) => i);

class Cancelled extends Error {}

/** 탑승 → 이륙 → 구름 위 비행 → 신혼여행지 도착까지의 도트 장면 */
export function Departure({ onClose, cheer }: { onClose: () => void; cheer?: Cheer }) {
  const [scope, animate] = useAnimate();
  const [walking, setWalking] = useState(false);
  const reduceMotion = useReducedMotion();
  const { groom, bride, honeymoon } = wedding;
  useScrollLock();

  useEffect(() => {
    let cancelled = false;
    const guard = () => {
      if (cancelled) throw new Cancelled();
    };
    const el = (name: string) => `[data-scene="${name}"]`;
    const { clientWidth: w, clientHeight: h } = scope.current as HTMLElement;

    const run = async () => {
      if (reduceMotion) {
        await Promise.all([
          animate(el("sea"), { opacity: 1 }, { duration: 0 }),
          animate(el("final"), { opacity: 1 }, { duration: 0 }),
        ]);
        return;
      }

      // 1. 두 사람이 걸어와 비행기에 오른다 (문은 비행기 앞쪽, 화면 52% + 24px 지점)
      if (cheer) animate(el("confetti"), { opacity: 1 }, { duration: 0.6 });
      setWalking(true);
      await animate(el("couple"), { x: [-90, w * 0.52 - 12] }, { duration: 2.4, ease: "linear" });
      guard();
      setWalking(false);
      await animate(el("couple"), { opacity: 0, scale: 0.7, y: -6 }, { duration: 0.5 });
      guard();

      // 2. 활주 후 이륙 (축하를 보냈다면 현수막을 달고)
      if (cheer) animate(el("banner"), { opacity: 1, scaleX: [0, 1] }, { duration: 0.5 });
      await animate(el("plane"), { x: w * 0.12 }, { duration: 1, ease: "easeIn" });
      guard();
      animate(el("airport"), { opacity: 0 }, { duration: 1, delay: 0.6 });
      await animate(el("plane"), { x: w * 0.7, y: -h * 0.5, rotate: -14 }, { duration: 1.6, ease: "easeIn" });
      guard();

      // 3. 구름 위 비행: 화면 왼쪽에서 다시 들어와 살짝 흔들리며 난다
      await animate(el("plane"), { x: -w * 0.7, y: -h * 0.3, rotate: 0 }, { duration: 0 });
      animate(el("clouds"), { opacity: 1 }, { duration: 0.5 });
      // 현수막(꼬리 뒤쪽)이 잘리지 않도록 가운데보다 살짝 오른쪽에서 난다
      await animate(el("plane"), { x: -w * 0.08 }, { duration: 1.2, ease: "easeOut" });
      guard();
      await animate(el("plane"), { y: [-h * 0.3, -h * 0.3 - 8, -h * 0.3 + 4, -h * 0.3] }, { duration: 2, ease: "easeInOut" });
      guard();

      // 4. 노을 진 바다와 섬이 나타나고 비행기가 섬으로 내려간다
      animate(el("clouds"), { opacity: 0 }, { duration: 1 });
      if (cheer) animate(el("confetti"), { opacity: 0 }, { duration: 1 });
      await animate(el("sea"), { opacity: [0, 1] }, { duration: 1.2 });
      guard();
      await animate(el("plane"), { x: w * 0.22, y: -h * 0.06, scale: 0.4, opacity: [1, 1, 0] }, { duration: 2.4, ease: "easeInOut" });
      guard();

      // 5. 인사
      await animate(el("final"), { opacity: [0, 1], y: [10, 0] }, { duration: 0.8 });
    };

    run().catch((error) => {
      if (!(error instanceof Cancelled)) throw error;
    });
    return () => {
      cancelled = true;
      scope.animations.forEach((animation) => animation.stop());
    };
  }, [animate, cheer, reduceMotion, scope]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-night"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="dialog"
      aria-label={`${honeymoon.to.name}로 떠나는 신혼여행`}
    >
      <div
        ref={scope}
        className="relative mx-auto h-full max-w-[480px] overflow-hidden bg-linear-to-b from-night via-[#4b3a72] to-[#e89a7c]"
      >
        {STARS.map((star, i) => (
          <span key={i} className="absolute size-1 animate-twinkle bg-white" style={{ ...star, animationDelay: `${i * 0.3}s` }} />
        ))}

        {/* 공항 */}
        <div data-scene="airport" className="absolute inset-0">
          {/* 관제탑 */}
          <div className="absolute bottom-[22%] left-[10%] flex flex-col items-center">
            <span className="h-5 w-12 bg-[#2b2944] shadow-[inset_0_-6px_0_#f5d88a55]" />
            <span className="h-28 w-5 bg-[#2b2944]" />
          </div>
          {/* 활주로 */}
          <div className="absolute inset-x-0 bottom-0 h-[22%] border-t-4 border-[#4a4760] bg-[#2f2d3d]">
            <div className="absolute inset-x-0 top-1/2 h-1 bg-[repeating-linear-gradient(90deg,#f5d88a_0_18px,transparent_18px_36px)]" />
            <div className="absolute inset-x-0 top-1 flex justify-around">
              {RUNWAY_LIGHTS.map((i) => (
                <span key={i} className="size-1 animate-twinkle bg-amber-200" style={{ animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          </div>
        </div>

        {/* 신혼여행지: 노을 진 바다와 야자수 섬 */}
        <div data-scene="sea" className="absolute inset-0 bg-linear-to-b from-[#2b2a5c] via-[#e66b7d] to-[#ffb37a] opacity-0">
          <span className="absolute top-[62%] left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd27a] shadow-[0_0_60px_20px_rgba(255,210,122,0.45)]" />
          <div className="absolute inset-x-0 top-[62%] bottom-0 bg-linear-to-b from-[#2d6fa3] to-[#173a63]">
            <div className="absolute inset-0 animate-wave bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.35)_0_6px,transparent_6px_32px)] bg-size-[32px_3px] bg-repeat-x opacity-70 [background-position-y:12px]" />
            <div className="absolute inset-0 animate-wave bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0_4px,transparent_4px_32px)] bg-size-[32px_2px] bg-repeat-x [animation-delay:0.4s] [background-position-y:40px]" />
          </div>
          <div className="absolute top-[62%] right-[10%] flex -translate-y-full items-end">
            <PixelSprite frames={PALM_FRAMES} palette={PALM_PALETTE} className="h-[52px] w-11" />
            <PixelSprite frames={PALM_FRAMES} palette={PALM_PALETTE} className="-ml-3 h-[39px] w-[33px] -scale-x-100" />
          </div>
          <span className="absolute top-[62%] right-[6%] h-3 w-32 -translate-y-1/2 rounded-full bg-[#f2d49b]" />
        </div>

        {/* 구름 위 비행 */}
        <div data-scene="clouds" className="absolute inset-0 opacity-0">
          {CLOUDS.map((cloud) => (
            <div
              key={cloud.top}
              className="absolute left-0 animate-drift opacity-90"
              style={{ top: cloud.top, animationDelay: cloud.delay, animationDuration: cloud.duration }}
            >
              <PixelSprite frames={CLOUD_FRAMES} palette={CLOUD_PALETTE} className={cloud.size} />
            </div>
          ))}
        </div>

        {cheer && (
          <div data-scene="confetti" className="pointer-events-none absolute inset-0 z-30 opacity-0">
            {CONFETTI.map((piece) => (
              <span
                key={piece.left}
                className="absolute -top-4 size-1.5 animate-petal"
                style={{ left: piece.left, backgroundColor: piece.color, animationDelay: piece.delay, animationDuration: piece.duration }}
              />
            ))}
          </div>
        )}

        <div data-scene="plane" className="absolute bottom-[22%] left-[52%] z-10 origin-center">
          {cheer && (
            // 꼬리 뒤로 매단 축하 현수막
            <div data-scene="banner" className="absolute top-[30%] right-full flex origin-right items-center opacity-0">
              <span className="border-2 border-[#e5577a] bg-[#fff6e0] px-2 py-0.5 font-pixel text-[11px] whitespace-nowrap text-[#b8323f]">
                {cheer.name ? `${cheer.name}: ` : ""}
                {cheer.message} ♥
              </span>
              <span className="h-px w-5 bg-white/80" />
            </div>
          )}
          <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-10 w-26" />
        </div>

        <div data-scene="couple" className="absolute bottom-[22%] left-0 z-20 flex gap-px" style={{ transform: "translateX(-90px)" }}>
          <Groom walking={walking} className="h-12 w-9" />
          <Bride walking={walking} className="h-12 w-9" />
        </div>

        {/* 인사 */}
        <div data-scene="final" className="absolute inset-x-0 top-[16%] z-30 px-8 text-center font-pixel text-white opacity-0">
          <p className="text-3xl text-[#ffe9a8] drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">{honeymoon.to.greeting}</p>
          <p className="mt-5 text-sm leading-6">
            {groom.name.slice(1)} ♥ {bride.name.slice(1)}
            <br />
            {cheer
              ? `${cheer.name ? `${cheer.name}님의` : "보내주신"} 축하를 싣고 ${honeymoon.to.name}로 떠납니다`
              : `${honeymoon.to.name}로 신혼여행 다녀오겠습니다`}
          </p>
          <p className="mt-3 text-xs text-white/80">{cheer ? "축하해 주셔서 고마워요!" : "배웅해 주셔서 고마워요!"}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 border-2 border-white/80 px-5 py-2 text-xs text-white hover:bg-white/10"
          >
            청첩장으로 돌아가기
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 z-40 p-2 text-white/70 hover:text-white"
        >
          <Icon name="close" className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}
