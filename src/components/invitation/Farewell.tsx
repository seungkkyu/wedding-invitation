"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { PixelSection } from "@/components/pixel/PixelSection";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { PLANE_FRAMES, PLANE_PALETTE } from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";
import { formatDots } from "@/lib/date";
import { CheerPass } from "./CheerPass";
import { Departure } from "./Departure";

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-[11px] tracking-[0.15em] text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}

/** 청첩장 마지막: 신혼여행 탑승권 + '배웅하기'로 출국 장면 재생, 아래에 하객 축하 탑승권 */
export function Farewell() {
  const [departing, setDeparting] = useState(false);
  const { groom, bride, honeymoon } = wedding;

  return (
    <PixelSection title="신혼여행을 떠납니다">
      <article className="bg-ivory font-pixel pixel-box">
        <div className="px-6 pt-5 pb-6">
          <p className="flex justify-between text-[11px] tracking-[0.25em] text-muted">
            <span>BOARDING PASS</span>
            <span className="lining-nums">{honeymoon.flight}</span>
          </p>
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <p className="text-3xl leading-none text-ink">{honeymoon.from.code}</p>
              <p className="mt-2 text-xs text-muted">{honeymoon.from.city}</p>
            </div>
            <div className="flex items-center gap-1.5 text-accent/50">
              <span className="w-6 border-t border-dashed border-current" />
              <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-2.5 w-[26px]" />
              <span className="w-6 border-t border-dashed border-current" />
            </div>
            <div className="text-right">
              <p className="text-3xl leading-none text-ink">{honeymoon.to.code}</p>
              <p className="mt-2 text-xs text-muted">{honeymoon.to.city}</p>
            </div>
          </div>
        </div>

        {/* 절취선 */}
        <div className="mx-4 border-t-2 border-dashed border-line" />

        <dl className="grid grid-cols-3 gap-y-4 px-6 pt-5 pb-6">
          <Field label="PASSENGER" value={`${groom.name} · ${bride.name}`} className="col-span-3" />
          <Field label="DATE" value={formatDots(honeymoon.date)} />
          <Field label="SEAT" value="1A · 1B" />
          <Field label="CLASS" value="Forever" />
        </dl>

        <button
          type="button"
          onClick={() => setDeparting(true)}
          className="flex w-full items-center justify-center gap-2 bg-accent py-4 text-sm text-night"
        >
          <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-2.5 w-[26px]" />
          배웅하기
        </button>
      </article>

      <CheerPass />

      <AnimatePresence>{departing && <Departure onClose={() => setDeparting(false)} />}</AnimatePresence>
    </PixelSection>
  );
}
