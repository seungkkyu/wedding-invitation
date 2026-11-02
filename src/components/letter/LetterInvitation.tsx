"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Envelope } from "./Envelope";
import { LetterCalendar } from "./LetterCalendar";
import { LetterCover } from "./LetterCover";
import { LetterGallery } from "./LetterGallery";
import { LetterGreeting } from "./LetterGreeting";
import { LetterAccount, LetterClosing, LetterContact, LetterLocation } from "./LetterInfo";
import { Sprig } from "./Ornament";

/** 레터 버전: 봉투를 열면 아치 액자·벨럼·캘리그래피로 꾸민 편지가 펼쳐진다 */
export function LetterInvitation() {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative mx-auto min-h-dvh max-w-[480px] overflow-x-clip bg-paper text-[#4a3f3a] shadow-[0_0_40px_rgba(74,63,58,0.08)]">
      {/* 위쪽에 은은한 블러시 빛 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70dvh] bg-[radial-gradient(ellipse_at_top,#f3dcd4_0%,transparent_70%)]" />
      <div className="relative">
        <LetterCover />
        <LetterGreeting />
        <LetterGallery />
        <Sprig className="mx-auto" />
        <LetterCalendar />
        <Sprig className="mx-auto" />
        <LetterLocation />
        <Sprig className="mx-auto" />
        <LetterContact />
        <LetterAccount />
        <LetterClosing />
      </div>
      <AnimatePresence>{!opened && !reduceMotion && <Envelope onOpened={() => setOpened(true)} />}</AnimatePresence>
    </main>
  );
}
