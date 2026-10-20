"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { wedding } from "@/data/wedding";

const PLACEHOLDER_COUNT = 9;
const SWIPE_THRESHOLD = 60;

function Photo({ index, sizes }: { index: number; sizes: string }) {
  const src = wedding.gallery[index];
  if (!src) {
    return (
      <div className="flex size-full items-center justify-center bg-[#e8e1d6] font-display text-xs text-muted italic lining-nums">
        {String(index + 1).padStart(2, "0")}
      </div>
    );
  }
  return <Image src={src} alt={`웨딩 사진 ${index + 1}`} fill sizes={sizes} className="object-cover" />;
}

export function Gallery() {
  const count = wedding.gallery.length || PLACEHOLDER_COUNT;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const move = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + count) % count));

  return (
    <Section eyebrow="Gallery" title="우리의 순간">
      <div className="-mx-4 grid grid-cols-3 gap-0.5">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative aspect-square overflow-hidden"
          >
            <Photo index={i} sizes="160px" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80">
              <span className="font-display tracking-widest lining-nums">
                {String(openIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => setOpenIndex(null)} aria-label="닫기" className="-mr-2 p-2">
                <Icon name="close" className="size-5" />
              </button>
            </div>
            <motion.div
              key={openIndex}
              className="relative mx-auto w-full max-w-[480px] flex-1"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) move(1);
                else if (info.offset.x > SWIPE_THRESHOLD) move(-1);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Photo index={openIndex} sizes="480px" />
            </motion.div>
            <div className="flex justify-between px-4 py-4 text-white/70">
              <button type="button" onClick={() => move(-1)} aria-label="이전 사진" className="p-2">
                <Icon name="chevronLeft" className="size-6" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="다음 사진" className="p-2">
                <Icon name="chevronRight" className="size-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
