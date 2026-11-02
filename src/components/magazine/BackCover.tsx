"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/common/Icon";
import { ReplayIntroButton } from "@/components/common/ReplayIntroButton";
import { wedding } from "@/data/wedding";
import { useShare } from "@/hooks/useShare";
import { formatWeddingDateDots } from "@/lib/date";
import { ISSUE_TITLE } from "./parts";

export function BackCover() {
  const { share, copyLink, copied } = useShare();
  const { groom, bride } = wedding;

  return (
    <footer className="bg-[#171513] px-6 pt-20 pb-24 text-[#f4f1ec]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="text-[9px] tracking-[0.4em] text-white/50">{ISSUE_TITLE} — END</p>
        <p className="mt-8 font-display text-[4.2rem] leading-[0.9] tracking-tight italic">
          Thank
          <br />
          you.
        </p>
        <p className="mt-8 font-headline text-[15px] leading-8 text-white/80">
          함께해 주시는 모든 걸음이
          <br />
          저희에게는 가장 큰 축복입니다.
        </p>
        <p className="mt-10 flex items-center justify-between border-y border-white/25 py-3 text-xs text-white/70">
          <span>
            {groom.name} &amp; {bride.name}
          </span>
          <span className="font-display tracking-[0.2em] lining-nums">{formatWeddingDateDots()}</span>
        </p>

        <div className="mt-10 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={share}
            className="flex items-center justify-center gap-1.5 bg-[#f4f1ec] py-3.5 text-[13px] text-[#171513]"
          >
            <Icon name="share" />
            공유하기
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="flex items-center justify-center gap-1.5 border border-white/50 py-3.5 text-[13px]"
          >
            <Icon name="link" />
            {copied ? "복사되었습니다" : "링크 복사"}
          </button>
        </div>
        <ReplayIntroButton className="mx-auto mt-12 text-white/55" />
      </motion.div>
    </footer>
  );
}
