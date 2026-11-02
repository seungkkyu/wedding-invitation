"use client";

import { motion, useAnimate } from "motion/react";
import { useRef } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { wedding } from "@/data/wedding";

/** 이름에서 성을 뺀 첫 글자 (박승규 → 승). 두 글자 이하면 첫 글자 */
const initialOf = (name: string) => (name.length >= 3 ? name[1] : name[0]);

const EASE = [0.22, 1, 0.36, 1] as const;

/** 레터 버전 오프닝: 봉투를 누르면 실링이 떨어지고 덮개가 열리며 편지가 올라온다 */
export function Envelope({ onOpened }: { onOpened: () => void }) {
  useScrollLock();
  const [scope, animate] = useAnimate();
  const opening = useRef(false);

  const open = async () => {
    if (opening.current) return;
    opening.current = true;
    animate("[data-env=hint]", { opacity: 0 }, { duration: 0.2 });
    await animate(
      "[data-env=seal]",
      { scale: [1, 1.15, 0], rotate: [0, -8, 12], opacity: [1, 1, 0] },
      { duration: 0.35 },
    );
    await animate("[data-env=flap]", { rotateX: 180 }, { duration: 0.45, ease: "easeInOut" });
    // 열린 덮개는 편지 뒤로 보낸다
    animate("[data-env=flap]", { zIndex: 0 }, { duration: 0 });
    await animate("[data-env=letter]", { y: "-58%" }, { duration: 0.45, ease: EASE });
    await animate(scope.current, { opacity: 0, scale: 1.04 }, { duration: 0.35 });
    onOpened();
  };

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#f6efe6]"
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        onClick={open}
        aria-label="청첩장 봉투 열기"
        className="relative aspect-[4/3] w-[78%] max-w-[340px] perspective-[900px]"
      >
        {/* 봉투 안쪽 */}
        <span className="absolute inset-0 rounded-md bg-[#eadccb] shadow-[0_24px_48px_-20px_rgba(90,60,40,0.45)]" />
        {/* 편지 */}
        <span
          data-env="letter"
          className="absolute inset-x-[7%] top-[8%] bottom-[6%] z-[1] flex flex-col items-center justify-center rounded-sm bg-[#fffdf9] shadow-sm"
        >
          <span className="font-script text-2xl text-[#b7867a]">You&apos;re invited</span>
          <span className="mt-1 font-garamond text-[11px] tracking-[0.3em] text-[#9a8b82] italic">to our wedding</span>
        </span>
        {/* 앞주머니 (위가 V자로 파인 모양) */}
        <span className="absolute inset-0 z-[2] rounded-md bg-[#f2e7da] [clip-path:polygon(0_0,50%_52%,100%_0,100%_100%,0_100%)]" />
        <span className="absolute inset-0 z-[2] rounded-md bg-linear-to-t from-black/[0.04] to-transparent [clip-path:polygon(0_100%,50%_48%,100%_100%)]" />
        {/* 덮개 */}
        <span
          data-env="flap"
          className="absolute inset-x-0 top-0 z-[3] h-[58%] origin-top bg-[#efe2d2] [clip-path:polygon(0_0,100%_0,50%_100%)] backface-hidden"
        />
        {/* 왁스 실링 */}
        <span
          data-env="seal"
          className="absolute top-[58%] left-1/2 z-[4] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d9a99d,#a8695e_60%,#8c5248)] font-serif text-sm text-[#fbefe9] shadow-[0_3px_8px_rgba(90,40,30,0.35),inset_0_-2px_4px_rgba(0,0,0,0.25)]"
        >
          <span className="flex size-12 items-center justify-center rounded-full border border-[#f3d9d1]/50">
            {initialOf(wedding.groom.name)}
            <span className="mx-0.5 font-script text-xs">&amp;</span>
            {initialOf(wedding.bride.name)}
          </span>
        </span>
      </button>

      <motion.p
        data-env="hint"
        className="mt-12 font-garamond text-sm tracking-[0.35em] text-[#9a8b82] italic"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  );
}
