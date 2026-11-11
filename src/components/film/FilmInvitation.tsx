"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Credits } from "./Credits";
import { FilmAccount, FilmCast, FilmLocation } from "./FilmInfo";
import { FilmEnding } from "./FilmEnding";
import { FilmLeader } from "./FilmLeader";
import { FilmStrip } from "./FilmStrip";
import { FrameMark } from "./parts";
import { Premiere } from "./Premiere";
import { Subtitles } from "./Subtitles";
import { TitleCard } from "./TitleCard";

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

// 그레인이 프레임마다 툭툭 자리를 옮기도록 (부드럽게 흐르지 않고 끊어지게)
const GRAIN_JUMPS = { x: [0, -24, 16, -8, 20, 0], y: [0, 12, -20, 18, -6, 0] };
const jump = (t: number) => (t < 1 ? 0 : 1);

/** 필름 그레인 + 비네팅. 화면에 고정되어 콘텐츠 위에 얇게 깔린다 */
function FilmOverlay() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 mx-auto max-w-[480px] overflow-hidden">
      <motion.div
        className="absolute -inset-10 opacity-[0.09] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
        animate={reduceMotion ? undefined : GRAIN_JUMPS}
        transition={{ duration: 0.5, repeat: Infinity, ease: jump }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.5))]" />
    </div>
  );
}

/** 양옆 가장자리의 필름 퍼포레이션. 스크롤과 함께 흘러간다 */
function EdgeSprockets() {
  const strip =
    "absolute inset-y-0 w-1.5 bg-[linear-gradient(180deg,rgba(239,230,214,0.13)_50%,transparent_0)] bg-size-[100%_16px]";
  return (
    <div aria-hidden className="pointer-events-none">
      <span className={`${strip} left-2`} />
      <span className={`${strip} right-2`} />
    </div>
  );
}

/** 영화 필름 버전: 필름 리더 → 타이틀 → 장면별로 이어지는 청첩장 */
export function FilmInvitation() {
  const reduceMotion = useReducedMotion();
  const [leaderDone, setLeaderDone] = useState(false);

  // 페이지가 열리면 리더를 돌리고, 리더가 끝나면 타이틀이 열린다
  const showLeader = !leaderDone && !reduceMotion;
  const ready = leaderDone || !!reduceMotion;

  return (
    <main className="relative mx-auto min-h-dvh max-w-[480px] overflow-x-clip bg-[#0e0d0c] font-sans text-[#efe6d6]">
      <TitleCard ready={ready} />
      <EdgeSprockets />
      <FrameMark n={12} />
      <Subtitles />
      <FrameMark n={14} />
      <Credits />
      <FrameMark n={16} />
      <FilmStrip />
      <FrameMark n={18} />
      <Premiere />
      <FrameMark n={20} />
      <FilmLocation />
      <FrameMark n={22} />
      <FilmCast />
      <FrameMark n={24} />
      <FilmAccount />
      <FilmEnding />

      <FilmOverlay />
      <AnimatePresence>{showLeader && <FilmLeader key="leader" onDone={() => setLeaderDone(true)} />}</AnimatePresence>
    </main>
  );
}
