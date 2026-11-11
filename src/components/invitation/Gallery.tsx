"use client";

import Image from "next/image";
import { Lightbox } from "@/components/common/Lightbox";
import { PixelSection } from "@/components/pixel/PixelSection";
import { wedding } from "@/data/wedding";
import { useLightbox } from "@/hooks/useLightbox";

const PLACEHOLDER_COUNT = 9;

const TILE = "relative aspect-square overflow-hidden bg-ivory pixel-corners";

export function Gallery() {
  const photos = wedding.gallery;
  const lightbox = useLightbox(photos.length);

  return (
    <PixelSection title="우리의 순간">
      <div className="-mx-2 grid grid-cols-3 gap-1.5">
        {photos.length === 0
          ? Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
              <div key={i} className={`${TILE} flex items-center justify-center font-pixel text-xs text-muted`}>
                {String(i + 1).padStart(2, "0")}
              </div>
            ))
          : photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => lightbox.open(i)}
                className={`${TILE} outline-offset-2 outline-accent focus-visible:outline-2`}
              >
                <Image src={photo.src} alt={`웨딩 사진 ${i + 1}`} fill sizes="160px" className="object-cover" />
              </button>
            ))}
      </div>

      <Lightbox photos={photos} index={lightbox.index} onMove={lightbox.move} onClose={lightbox.close} />
    </PixelSection>
  );
}
