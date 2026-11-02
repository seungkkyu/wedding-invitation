"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Fragment } from "react";
import { Lightbox } from "@/components/common/Lightbox";
import { wedding, type Photo } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";
import { Headline, Page } from "./parts";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.22, 1, 0.36, 1] as const;

// 사진 순서대로 돌아가며 쓰는 배치: 꽉 찬 컷 → 왼쪽 인셋 → 오른쪽 인셋
const LAYOUTS = [
  { frame: "-mx-6", caption: "px-6 text-right" },
  { frame: "mr-[18%]", caption: "text-left" },
  { frame: "ml-[30%]", caption: "text-right" },
];
// 세로 사진은 꽉 찬 컷으로 쓰면 화면을 넘치므로 가운데 인셋으로
const PORTRAIT_FULL = { frame: "mx-[12%]", caption: "text-right" };

function FigurePhoto({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const portrait = photo.height > photo.width;
  const layout = portrait && index % LAYOUTS.length === 0 ? PORTRAIT_FULL : LAYOUTS[index % LAYOUTS.length];

  // 화면 진입 감지는 잘리지 않은 figure에서 한다. 크롬의 IntersectionObserver는 요소 자신의 clip-path까지 반영해서,
  // 완전히 잘린(inset 100%) 요소에 whileInView를 걸면 끝내 보이지 않는 것으로 판정된다.
  return (
    <motion.figure className={layout.frame} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`${photo.caption} 크게 보기`}
        className="relative block w-full overflow-hidden bg-[#e4ded4]"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <motion.span
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.18 }, shown: { scale: 1 } }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image src={photo.src} alt={photo.caption} fill sizes="480px" className="object-cover" />
        </motion.span>
      </motion.button>
      <figcaption className={`mt-2.5 text-[11px] text-[#171513]/60 ${layout.caption}`}>
        <span className="font-display text-[#7a2430] italic lining-nums">Fig. {pad(index + 1)}</span>
        <span className="mx-1.5">—</span>
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}

function PullQuote() {
  return (
    <blockquote className="border-y border-[#171513] py-8 text-center">
      <span className="block font-display text-5xl leading-none text-[#7a2430]">&ldquo;</span>
      <p className="mt-1 font-headline text-xl leading-relaxed font-extrabold text-[#171513]">
        평범한 날들이 모여
        <br />
        가장 특별한 하루가 되었습니다
      </p>
    </blockquote>
  );
}

export function Feature() {
  const photos = wedding.gallery;
  const lightbox = useLightbox(photos.length);

  return (
    <>
      <Page id="mag-feature" folio={4} kicker="THE FEATURE">
        <Headline en="The Feature" ko="우리의 순간" lead="계절과 도시를 지나 함께 걸어온 장면들" />
        <div className="space-y-14">
          {photos.map((photo, i) => (
            <Fragment key={photo.src}>
              <FigurePhoto photo={photo} index={i} onOpen={() => lightbox.open(i)} />
              {/* 두 번째 컷 뒤에 인용문 한 번 */}
              {i === 1 && <PullQuote />}
            </Fragment>
          ))}
        </div>
      </Page>
      <Lightbox
        photos={photos}
        index={lightbox.index}
        onMove={lightbox.move}
        onClose={lightbox.close}
        className="bg-[#0e0d0c]/97 text-white"
        renderCounter={(i, total) => (
          <span className="font-display text-sm tracking-[0.2em] lining-nums">
            Fig. {pad(i + 1)} <span className="text-white/40">/ {pad(total)}</span>
          </span>
        )}
        renderCaption={(photo) => <span className="font-display italic">{photo.caption}</span>}
      />
    </>
  );
}
