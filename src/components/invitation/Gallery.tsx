"use client";

import Image from "next/image";
import { Lightbox } from "@/components/common/Lightbox";
import { Section } from "@/components/common/Section";
import { wedding } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";

const PLACEHOLDER_COUNT = 9;

function Placeholder({ index }: { index: number }) {
  return (
    <div className="flex size-full items-center justify-center bg-[#e8e1d6] font-display text-xs text-muted italic lining-nums">
      {String(index + 1).padStart(2, "0")}
    </div>
  );
}

export function Gallery() {
  const photos = wedding.gallery;
  const lightbox = useLightbox(photos.length);

  return (
    <Section eyebrow="Gallery" title="우리의 순간">
      <div className="-mx-4 grid grid-cols-3 gap-0.5">
        {photos.length === 0
          ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <Placeholder index={i} />
              </div>
            ))
          : photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => lightbox.open(i)}
                className="relative aspect-square overflow-hidden"
              >
                <Image src={photo.src} alt={`웨딩 사진 ${i + 1}`} fill sizes="160px" className="object-cover" />
              </button>
            ))}
      </div>

      <Lightbox photos={photos} index={lightbox.index} onMove={lightbox.move} onClose={lightbox.close} />
    </Section>
  );
}
