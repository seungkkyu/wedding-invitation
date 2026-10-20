"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Bride, Groom } from "@/components/pixel/Characters";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";

// 탭 사이 간격이 TAP_GAP_MS 이내로 TAPS번 이어지면 열린다
const TAPS = 5;
const TAP_GAP_MS = 800;
const AUTO_CLOSE_MS = 7000;

const FIREWORK_COLORS = ["#ff8fab", "#f5d88a", "#ffffff", "#a5d8ff"];
const BURSTS = [
  { top: "18%", left: "22%", delay: 0.2 },
  { top: "12%", left: "70%", delay: 0.8 },
  { top: "30%", left: "48%", delay: 1.4 },
  { top: "24%", left: "84%", delay: 2 },
  { top: "34%", left: "14%", delay: 2.6 },
];
const PARTICLES = 12;
const RADIUS = 56;

function Firework({ top, left, delay }: (typeof BURSTS)[number]) {
  return (
    <div className="absolute" style={{ top, left }}>
      {Array.from({ length: PARTICLES }, (_, i) => {
        const angle = (Math.PI * 2 * i) / PARTICLES;
        return (
          <motion.span
            key={i}
            className="absolute size-1.5"
            style={{ backgroundColor: FIREWORK_COLORS[i % FIREWORK_COLORS.length] }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * RADIUS,
              y: [0, Math.sin(angle) * RADIUS, Math.sin(angle) * RADIUS + 18],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.3, delay, ease: "easeOut", repeat: Infinity, repeatDelay: 1.6 }}
          />
        );
      })}
    </div>
  );
}

function Celebration({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [onClose]);

  const { groom, bride } = wedding;

  return (
    <motion.div
      className="fixed inset-0 z-50 mx-auto max-w-[480px] cursor-pointer overflow-hidden bg-night/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {BURSTS.map((burst) => (
        <Firework key={`${burst.top}-${burst.left}`} {...burst} />
      ))}

      <div className="absolute inset-x-0 top-[52%] flex justify-center">
        {/* 양쪽에서 다가와 살짝 기대는 두 사람 */}
        <motion.div
          initial={{ x: -120 }}
          animate={{ x: 4, rotate: [0, 0, 8] }}
          transition={{ duration: 1.6, times: [0, 0.8, 1], ease: "easeOut" }}
        >
          <Groom walking className="h-20 w-15" />
        </motion.div>
        <motion.div
          initial={{ x: 120 }}
          animate={{ x: -4, rotate: [0, 0, -8] }}
          transition={{ duration: 1.6, times: [0, 0.8, 1], ease: "easeOut" }}
        >
          <Bride walking className="h-20 w-15" />
        </motion.div>
        <motion.div
          className="absolute -top-10"
          initial={{ opacity: 0, scale: 0, y: 8 }}
          animate={{ opacity: 1, scale: [0, 1.4, 1], y: [8, -4, 0] }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-6 w-7" />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 top-[70%] text-center font-pixel text-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <p className="text-lg">♥ 비밀을 찾았어요! ♥</p>
        <p className="mt-2 text-sm text-pink-200">
          {groom.name.slice(1)} & {bride.name.slice(1)}의 결혼을 축하해 주세요
        </p>
        <p className="mt-6 text-[11px] text-white/50">화면을 누르면 닫혀요</p>
      </motion.div>
    </motion.div>
  );
}

const noopSubscribe = () => () => {};

/**
 * children을 연속으로 여러 번 누르면 도트 축하 화면이 열리는 숨은 장치.
 * 문단 안에도 넣을 수 있도록 span으로 감싸고, 축하 화면은 body에 포털로 띄운다.
 */
export function EasterEgg({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const tapCount = useRef(0);
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = performance.now();
    tapCount.current = now - lastTap.current < TAP_GAP_MS ? tapCount.current + 1 : 1;
    lastTap.current = now;
    if (tapCount.current >= TAPS) {
      tapCount.current = 0;
      setOpen(true);
    }
  };

  return (
    <>
      <span onClick={handleTap} className={`cursor-pointer touch-manipulation select-none ${className}`}>
        {children}
      </span>
      {mounted &&
        createPortal(<AnimatePresence>{open && <Celebration onClose={() => setOpen(false)} />}</AnimatePresence>, document.body)}
    </>
  );
}
