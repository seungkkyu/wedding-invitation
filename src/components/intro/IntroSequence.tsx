"use client";

import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { daysTogether, formatFirstDayDots, formatTodayDots, formatWeddingDateDots } from "@/lib/date";
import { useIntroStore } from "@/store/introStore";
import { PalaceDoor } from "./PalaceDoor";
import { PalaceFloor } from "./PalaceFloor";
import { PixelSprite } from "./PixelSprite";
import { Ring } from "./Ring";
import {
  BRIDE_FRAMES,
  BRIDE_PALETTE,
  BUSH_FRAMES,
  BUSH_PALETTE,
  GROOM_FRAMES,
  GROOM_PALETTE,
  HEART_FRAMES,
  HEART_PALETTE,
} from "./sprites";

const STARS = [
  { top: "8%", left: "12%" },
  { top: "14%", left: "78%" },
  { top: "22%", left: "40%" },
  { top: "6%", left: "56%" },
  { top: "30%", left: "88%" },
  { top: "34%", left: "8%" },
  { top: "18%", left: "26%" },
  { top: "40%", left: "64%" },
];

const PETALS = [
  { left: "10%", delay: "0s", duration: "5s" },
  { left: "28%", delay: "1.6s", duration: "6s" },
  { left: "46%", delay: "0.8s", duration: "5.5s" },
  { left: "64%", delay: "2.4s", duration: "6.5s" },
  { left: "82%", delay: "0.4s", duration: "5s" },
  { left: "92%", delay: "3s", duration: "6s" },
];

// 시퀀스가 어딘가에서 멈춰도 청첩장으로 넘어가도록 하는 안전장치
const SAFETY_TIMEOUT_MS = 22000;

// 날수 카운트: 처음엔 빠르게 올라가다 마지막 숫자들은 천천히 (easeOutQuint)
const COUNT_DURATION = 3.2;
const COUNT_EASE = [0.22, 1, 0.36, 1] as const;

class Cancelled extends Error {}

export function IntroGate() {
  const playing = useIntroStore((s) => s.phase !== "done");
  return <AnimatePresence>{playing && <IntroSequence key="intro" />}</AnimatePresence>;
}

function IntroSequence() {
  const phase = useIntroStore((s) => s.phase);
  const setPhase = useIntroStore((s) => s.setPhase);
  const skip = useIntroStore((s) => s.skip);
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate();

  // 인트로 전체 타임라인. 각 단계는 이전 애니메이션이 끝나야 시작된다.
  useEffect(() => {
    if (reduceMotion) {
      skip();
      return;
    }

    let cancelled = false;
    const guard = () => {
      if (cancelled) throw new Cancelled();
    };
    const el = (name: string) => `[data-intro="${name}"]`;

    const run = async () => {
      // 0. 함께한 날수 1 → 오늘까지 카운트
      // 오늘 날짜는 프리렌더 시점이 아닌 접속 시점 기준이어야 해서 클라이언트에서 채운다
      const counter = scope.current.querySelector(el("count-number"));
      const todayLabel = scope.current.querySelector(el("count-today-date"));
      if (todayLabel) todayLabel.textContent = formatTodayDots();
      const total = daysTogether();
      await animate(el("count"), { opacity: [0, 1], y: [12, 0] }, { duration: 0.8 });
      guard();
      animate(el("count-line"), { scaleX: [0, 1] }, { duration: COUNT_DURATION, ease: COUNT_EASE });
      await animate(1, total, {
        duration: COUNT_DURATION,
        ease: COUNT_EASE,
        onUpdate: (value) => {
          if (counter) counter.textContent = Math.round(value).toLocaleString("ko-KR");
        },
      });
      guard();
      animate(el("count-today"), { opacity: [0, 1] }, { duration: 0.6 });
      await animate(el("count-number"), { scale: [1, 1.12, 1] }, { duration: 0.6, ease: "easeOut" });
      await animate(el("count"), { opacity: 0, y: -16, filter: "blur(6px)" }, { duration: 0.7, delay: 0.9 });
      guard();
      setPhase("ring");

      // 1. 반지 회전
      await animate(el("ring"), { opacity: [0, 1], scale: [0.6, 1], rotateY: [0, 720] }, { duration: 1.5, ease: "easeInOut" });
      guard();

      // 2. 바닥이 나타나고 반지가 떨어지며 한 번 튕김
      animate(el("floor"), { opacity: [0, 1] }, { duration: 0.5 });
      await animate(
        el("ring"),
        { y: ["0vh", "36vh", "30vh", "36vh"], scale: 0.6 },
        { duration: 0.9, times: [0, 0.55, 0.78, 1], ease: "easeIn" },
      );
      guard();

      // 3. 반지가 사라지고 궁전 문 + 꽃잎 등장
      animate(el("ring"), { opacity: 0, scale: 0.2 }, { duration: 0.4 });
      animate(el("petals"), { opacity: [0, 1] }, { duration: 1 });
      await animate(el("palace"), { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.6 });
      guard();

      // 4. 신랑·신부가 양쪽에서 걸어옴
      setPhase("walk");
      animate(el("caption"), { opacity: [0, 1], y: [8, 0] }, { duration: 0.6 });
      await Promise.all([
        animate(el("groom"), { x: [-240, -36] }, { duration: 2, ease: "linear" }),
        animate(el("bride"), { x: [240, 36] }, { duration: 2, ease: "linear" }),
      ]);
      guard();

      // 5. 문이 열리고 둘이 들어감
      setPhase("enter");
      const enter = { y: -8, scale: 0.7, opacity: 0 };
      await Promise.all([
        animate(el("groom"), { ...enter, x: -6 }, { duration: 0.9, delay: 0.4, ease: "easeIn" }),
        animate(el("bride"), { ...enter, x: 6 }, { duration: 0.9, delay: 0.4, ease: "easeIn" }),
      ]);
      guard();

      // 6. 문이 닫히고 하트
      setPhase("close");
      await animate(el("heart"), { opacity: [0, 1, 1], y: [0, -24] }, { duration: 0.9 });
      guard();

      // 7. 화이트 플래시 후 청첩장
      await animate(el("flash"), { opacity: [0, 1] }, { duration: 0.5 });
      guard();
      setPhase("done");
    };

    run().catch((error) => {
      if (!(error instanceof Cancelled)) skip();
    });
    const safety = setTimeout(skip, SAFETY_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      scope.animations.forEach((animation) => animation.stop());
    };
  }, [animate, reduceMotion, scope, setPhase, skip]);

  // 인트로 동안 뒤의 청첩장 스크롤 잠금
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const walking = phase === "walk" || phase === "enter";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-night"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div ref={scope} className="relative mx-auto h-full max-w-[480px] perspective-[600px]">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute size-1 animate-twinkle bg-white"
            style={{ ...star, animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* 떨어지는 꽃잎 */}
        <div data-intro="petals" className="absolute inset-0 opacity-0">
          {PETALS.map((petal) => (
            <span
              key={petal.left}
              className="absolute -top-4 size-1.5 animate-petal bg-pink-200"
              style={{ left: petal.left, animationDelay: petal.delay, animationDuration: petal.duration }}
            />
          ))}
        </div>

        {/* 함께한 날수 */}
        <div
          data-intro="count"
          className="absolute inset-x-0 top-[30%] flex flex-col items-center text-center text-white opacity-0"
        >
          <p className="font-display text-base font-medium tracking-[0.35em] text-pink-100 lining-nums">
            SINCE {formatFirstDayDots()}
          </p>
          <p className="mt-3 font-serif text-xl text-white">우리가 함께한 시간</p>
          <span
            data-intro="count-number"
            className="mt-5 inline-block bg-linear-to-b from-[#fffaea] via-[#f5d88a] to-[#c0913a] bg-clip-text font-display text-[5.5rem] leading-none font-medium text-transparent lining-nums tabular-nums drop-shadow-[0_0_22px_rgba(255,214,130,0.5)]"
          >
            1
          </span>
          <p className="mt-3 font-display text-sm font-medium tracking-[0.6em] text-[#f5d88a]">DAYS</p>
          <span data-intro="count-line" className="mt-4 h-px w-48 origin-left bg-linear-to-r from-transparent via-[#f5d88a] to-transparent" />
          <p data-intro="count-today" className="mt-4 font-display text-base tracking-[0.3em] text-white/85 lining-nums opacity-0">
            TODAY · <span data-intro="count-today-date" />
          </p>
        </div>

        {/* 문구 */}
        <div data-intro="caption" className="absolute inset-x-0 top-[14%] text-center font-pixel text-white opacity-0">
          <p className="text-lg tracking-widest">WE&apos;RE GETTING MARRIED</p>
          <p className="mt-2 text-sm text-pink-200">{formatWeddingDateDots()}</p>
        </div>

        {/* 바닥 */}
        <div data-intro="floor" className="absolute inset-x-0 bottom-0 h-[28%] opacity-0">
          <PalaceFloor lit={phase === "enter"} />
        </div>

        {/* 궁전 문 + 꽃덤불 + 새어 나오는 빛 */}
        <div data-intro="palace" className="absolute bottom-[28%] left-1/2 origin-bottom -translate-x-1/2 opacity-0">
          <PalaceDoor open={phase === "enter"} className="h-48 w-40" />
          <PixelSprite frames={BUSH_FRAMES} palette={BUSH_PALETTE} className="absolute right-full bottom-0 -mr-3 h-9 w-14" />
          <PixelSprite
            frames={BUSH_FRAMES}
            palette={BUSH_PALETTE}
            className="absolute bottom-0 left-full -ml-3 h-9 w-14 -scale-x-100"
          />
          <div
            className={`absolute top-full left-1/2 h-6 w-32 -translate-x-1/2 bg-amber-100/40 blur-md transition-opacity duration-300 ${
              phase === "enter" ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* 하트 */}
        <div data-intro="heart" className="absolute bottom-[calc(28%+12.5rem)] left-1/2 -translate-x-1/2 opacity-0">
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-6 w-7" />
        </div>

        {/* 신랑·신부 (시작 위치는 화면 밖) */}
        <div data-intro="groom" className="absolute bottom-[28%] left-1/2 z-10 -ml-7.5" style={{ transform: "translateX(-240px)" }}>
          <PixelSprite frames={GROOM_FRAMES} palette={GROOM_PALETTE} animated={walking} className="h-20 w-15" />
        </div>
        <div data-intro="bride" className="absolute bottom-[28%] left-1/2 z-10 -ml-7.5" style={{ transform: "translateX(240px)" }}>
          <PixelSprite frames={BRIDE_FRAMES} palette={BRIDE_PALETTE} animated={walking} className="h-20 w-15" />
        </div>

        {/* 반지 */}
        <div
          data-intro="ring"
          className="absolute top-[30%] left-1/2 -ml-12 size-24 opacity-0 drop-shadow-[0_0_14px_rgba(255,226,150,0.75)]"
        >
          <Ring className="size-full" />
        </div>

        {/* 화이트 플래시 */}
        <div data-intro="flash" className="pointer-events-none absolute inset-0 bg-ivory opacity-0" />

        <button
          type="button"
          onClick={skip}
          className="absolute top-4 right-4 z-20 px-3 py-1 font-pixel text-xs text-white/70 hover:text-white"
        >
          SKIP ▶
        </button>
      </div>
    </motion.div>
  );
}
