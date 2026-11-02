"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/common/Lightbox";
import { wedding } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";
import { LetterSection } from "./Ornament";

/** 가운데 사진이 크게, 양옆 사진이 살짝 보이는 스와이프 갤러리 */
export function LetterGallery() {
  const photos = wedding.gallery;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lightbox = useLightbox(photos.length);

  if (photos.length === 0) return null;

  const slideWidth = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    // 슬라이드 폭 + gap(12px)
    return first ? first.offsetWidth + 12 : 1;
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.min(photos.length - 1, Math.max(0, Math.round(track.scrollLeft / slideWidth()))));
  };

  const goTo = (i: number) => trackRef.current?.scrollTo({ left: i * slideWidth(), behavior: "smooth" });

  return (
    <LetterSection script="Moments" title="우리의 순간들" className="px-0">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-[16%]"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => (i === active ? lightbox.open(i) : goTo(i))}
            className={`w-full shrink-0 snap-center transition-[opacity,scale] duration-500 ${
              i === active ? "scale-100 opacity-100" : "scale-[0.92] opacity-55"
            }`}
          >
            <span className="relative block aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-[#eadfd3]">
              <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 480px) 68vw, 330px" className="object-cover" />
            </span>
            <span className="mt-4 block font-garamond text-[15px] text-[#8f8078] italic">{photo.caption}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${i + 1}번째 사진`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-[#b7867a]" : "w-1.5 bg-[#dccbc0]"
            }`}
          />
        ))}
      </div>
      <p className="mt-5 text-center text-[11px] text-[#a99a90]">사진을 누르면 크게 볼 수 있어요</p>

      <Lightbox
        photos={photos}
        index={lightbox.index}
        onMove={lightbox.move}
        onClose={lightbox.close}
        className="bg-[#211c19]/95 text-white"
        renderCounter={(i, total) => (
          <span className="font-garamond text-sm tracking-[0.3em] italic lining-nums">
            {i + 1} / {total}
          </span>
        )}
        renderCaption={(photo) => <span className="font-garamond italic">{photo.caption}</span>}
      />
    </LetterSection>
  );
}
