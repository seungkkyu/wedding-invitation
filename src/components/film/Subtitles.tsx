"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { wedding } from "@/data/wedding";
import { SceneTitle } from "./parts";

/** SCENE 01: 어두운 스틸컷 위에 인사말이 자막처럼 한 줄씩 떠오른다 */
export function Subtitles() {
  const still = wedding.gallery[1] ?? wedding.gallery[0];
  let lineIndex = 0;

  return (
    <section className="relative overflow-hidden px-8 py-24">
      {still && (
        <>
          <Image
            src={still.src}
            alt=""
            fill
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover opacity-30 blur-[1px] saturate-[0.6] sepia-[0.3]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0e0d0c,rgba(14,13,12,0.55)_30%,rgba(14,13,12,0.55)_70%,#0e0d0c)]" />
        </>
      )}
      <div className="relative">
        <SceneTitle no="01" en="INVITATION" title="초대의 글" />
        <div className="space-y-2 text-center font-sans text-[15px] leading-7 text-[#f3e3a0] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
          {wedding.greeting.map((text, i) => {
            if (!text) return <div key={i} className="h-5" />;
            const delay = lineIndex++ * 0.45;
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay }}
              >
                {text}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
