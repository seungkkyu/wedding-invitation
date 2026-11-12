"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/common/Icon";
import { useShare } from "@/hooks/useShare";
import { FILM } from "./parts";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 1.4, delay },
});

/** 엔딩: THE END → 새로운 시작. 공유 버튼과 인트로 다시 보기 */
export function FilmEnding() {
  const { share, copyLink, copied } = useShare();

  return (
    <footer className="bg-black px-8 pt-28 pb-28 text-center">
      <motion.p {...fadeIn(0)} className={`font-cinema text-[4.5rem] leading-none tracking-[0.18em] ${FILM.cream}`}>
        THE END
      </motion.p>
      <motion.p {...fadeIn(1.2)} className={`mt-6 font-display text-lg italic ${FILM.amber}`}>
        and a new beginning
      </motion.p>
      <motion.p {...fadeIn(2)} className={`mt-8 font-serif text-[13px] leading-6 ${FILM.muted}`}>
        저희의 다음 장면을 함께 지켜봐 주세요.
        <br />
        함께해 주셔서 감사합니다.
      </motion.p>

      <div className="mt-14 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-1.5 bg-[#efe6d6] py-3.5 text-[13px] text-[#1c1915]"
        >
          <Icon name="share" />
          공유하기
        </button>
        <button
          type="button"
          onClick={copyLink}
          className={`flex items-center justify-center gap-1.5 border border-[#efe6d6]/60 py-3.5 text-[13px] ${FILM.cream}`}
        >
          <Icon name="link" />
          {copied ? "복사되었습니다" : "링크 복사"}
        </button>
      </div>

      <p className={`mt-16 font-display text-2xl italic ${FILM.muted}`}>Fin.</p>
    </footer>
  );
}
