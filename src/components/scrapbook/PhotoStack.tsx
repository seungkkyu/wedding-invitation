"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/common/Icon";
import { Lightbox } from "@/components/common/Lightbox";
import { type Photo, wedding } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";
import { Page, Polaroid, TILTS, Tape, type TapeTone } from "./parts";

// 겹쳐서 보여 줄 장 수 (나머지는 뒤에 숨어 있다)
const VISIBLE = 3;
// 이만큼 끌거나 이 속도 이상으로 튕기면 맨 뒤로 넘긴다
const FLING_OFFSET = 90;
const FLING_VELOCITY = 600;
const TAPE_CYCLE: TapeTone[] = ["pink", "mint", "yellow", "blue"];

type StackCardProps = {
  photo: Photo;
  index: number;
  depth: number;
  hint: boolean;
  onSend: () => void;
  onOpen: () => void;
};

/** 쌓인 폴라로이드 한 장. 맨 위 장만 좌우로 끌 수 있다 */
function StackCard({ photo, index, depth, hint, onSend, onOpen }: StackCardProps) {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-240, 240], [-12, 12]);
  const isTop = depth === 0;

  // 처음 보일 때 맨 위 장을 살짝 흔들어 넘길 수 있다는 걸 알려 준다
  useEffect(() => {
    if (!hint) return;
    const controls = animate(x, [0, -22, 14, 0], { duration: 1.1, delay: 0.5, ease: "easeInOut" });
    return () => controls.stop();
  }, [hint, x]);

  return (
    <motion.div
      className="col-start-1 row-start-1 touch-pan-y"
      style={{ zIndex: VISIBLE - depth, x, rotate: dragRotate }}
      initial={false}
      animate={{ y: depth * 12, scale: 1 - depth * 0.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      drag={isTop ? "x" : false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const flung = Math.abs(info.offset.x) > FLING_OFFSET || Math.abs(info.velocity.x) > FLING_VELOCITY;
        if (!flung) {
          animate(x, 0, { type: "spring", stiffness: 420, damping: 30 });
          return;
        }
        const direction = info.offset.x > 0 ? 1 : -1;
        animate(x, direction * 520, { duration: 0.3, ease: "easeIn" }).then(() => {
          onSend();
          x.set(0);
        });
      }}
      onTap={isTop ? onOpen : undefined}
    >
      <div className={`relative ${TILTS[index % TILTS.length]}`}>
        <Tape
          tone={TAPE_CYCLE[index % TAPE_CYCLE.length]}
          className={`absolute -top-3 left-1/2 z-10 w-24 -translate-x-1/2 ${index % 2 ? "rotate-3" : "-rotate-3"}`}
        />
        <Polaroid photo={photo} sizes="(max-width: 480px) 76vw, 360px" />
      </div>
    </motion.div>
  );
}

/** 우리의 기록: 손으로 넘기는 폴라로이드 더미 + 크게 보기 */
export function PhotoStack() {
  const photos = wedding.gallery;
  const count = photos.length;
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [touched, setTouched] = useState(false);
  const lightbox = useLightbox(count);
  const reduceMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stackRef, { once: true, amount: 0.6 });

  const top = order[0];
  const next = () => {
    setTouched(true);
    setOrder((o) => [...o.slice(1), o[0]]);
  };
  const previous = () => {
    setTouched(true);
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  };

  return (
    <Page no="02" title="우리의 기록" sub="옆으로 휙 넘겨 보세요">
      {count === 0 ? (
        <Polaroid caption="사진이 곧 채워질 예정이에요" sizes="76vw" className="mx-auto w-[76%] -rotate-2" />
      ) : (
        <>
          <div ref={stackRef} className="mx-auto grid w-[76%] pb-8">
            {order
              .slice(0, VISIBLE)
              .map((photoIndex, depth) => (
                <StackCard
                  key={photoIndex}
                  photo={photos[photoIndex]}
                  index={photoIndex}
                  depth={depth}
                  hint={depth === 0 && inView && !touched && !reduceMotion}
                  onSend={next}
                  onOpen={() => lightbox.open(photoIndex)}
                />
              ))
              .reverse()}
          </div>

          <div className="mt-2 flex items-center justify-center gap-5 text-ink/70">
            <button type="button" onClick={previous} aria-label="이전 사진" className="p-2">
              <Icon name="chevronLeft" className="size-5" />
            </button>
            <span className="min-w-14 text-center font-hand-en text-2xl">
              {top + 1} / {count}
            </span>
            <button type="button" onClick={next} aria-label="다음 사진" className="p-2">
              <Icon name="chevronRight" className="size-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => lightbox.open(top)}
            className="mx-auto mt-3 block rounded-full border border-dashed border-ink/30 px-5 py-1.5 font-hand text-xl text-ink/70"
          >
            크게 펼쳐 보기
          </button>

          <Lightbox
            photos={photos}
            index={lightbox.index}
            onMove={lightbox.move}
            onClose={lightbox.close}
            className="bg-[#2b2622]/95 text-[#f6efe2]"
            renderCounter={(i, total) => (
              <span className="font-hand-en text-xl">
                {i + 1} / {total}
              </span>
            )}
            renderCaption={(photo) => <span className="font-hand-en text-2xl">{photo.caption}</span>}
          />
        </>
      )}
    </Page>
  );
}
