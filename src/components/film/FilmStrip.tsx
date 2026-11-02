"use client";

import Image from "next/image";
import { Lightbox } from "@/components/common/Lightbox";
import { wedding } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";
import { FILM, SceneTitle } from "./parts";

const pad = (n: number) => String(n).padStart(2, "0");

/** 필름 위아래의 퍼포레이션(구멍) 줄 */
function Sprockets() {
  return (
    <div
      aria-hidden
      className="h-2 bg-[linear-gradient(90deg,rgba(239,230,214,0.55)_50%,transparent_0)] bg-size-[14px_100%] opacity-70"
    />
  );
}

/** SCENE 03: 가로로 넘기는 필름 스트립 갤러리 */
export function FilmStrip() {
  const photos = wedding.gallery;
  const lightbox = useLightbox(photos.length);

  return (
    <section className="py-24">
      <div className="px-8">
        <SceneTitle no="03" en="FOOTAGE" title="우리가 지나온 장면들" />
      </div>

      <div className="flex snap-x snap-mandatory scrollbar-none scroll-px-8 gap-1 overflow-x-auto bg-black px-8 py-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => lightbox.open(i)}
            className="w-[78%] shrink-0 snap-start bg-[#0a0908] px-1.5 text-left"
            aria-label={`${photo.caption} 크게 보기`}
          >
            <Sprockets />
            <p className={`flex justify-between py-1.5 font-typewriter text-[9px] tracking-[0.2em] ${FILM.amber} opacity-70`}>
              <span>▸ {i * 2 + 12}A</span>
              <span>400TX</span>
            </p>
            <span className="relative block aspect-4/5 overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 480px) 75vw, 360px"
                className="object-cover brightness-[0.92] contrast-[1.06] saturate-[0.85] sepia-[0.2]"
              />
            </span>
            <p className={`flex justify-between py-1.5 font-typewriter text-[10px] tracking-[0.12em] ${FILM.cream} opacity-80`}>
              <span>{pad(i + 1)}</span>
              <span className="truncate pl-3">{photo.caption}</span>
            </p>
            <Sprockets />
          </button>
        ))}
      </div>
      <p className={`mt-4 text-center font-typewriter text-[10px] tracking-[0.35em] ${FILM.muted}`}>SWIPE ⟷ TAP</p>

      <Lightbox
        photos={photos}
        index={lightbox.index}
        onMove={lightbox.move}
        onClose={lightbox.close}
        className={`bg-black/95 ${FILM.cream}`}
        imageClassName="sepia-[0.12]"
        renderCounter={(i, total) => (
          <span className="font-typewriter text-xs tracking-[0.2em]">
            FRAME {pad(i + 1)} / {pad(total)}
          </span>
        )}
        renderCaption={(photo) => (
          <span className={`font-typewriter text-xs tracking-[0.15em] ${FILM.muted}`}>{photo.caption}</span>
        )}
      />
    </section>
  );
}
