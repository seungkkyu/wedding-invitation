"use client";

import { AmbientPage } from "@/components/ambient/blocks";
import { Afternoon, Ceremony, Dawn, Dusk, Morning, Night } from "./HaruSections";
import { Sky } from "./Sky";
import type { TimeOfDay } from "./times";

/** 하루 버전: 스크롤을 내리면 예식 날 새벽부터 밤까지 하늘이 흘러간다 */
export function HaruInvitation() {
  return (
    <AmbientPage<TimeOfDay> initial="dawn" className="bg-[#1f2547]" backdrop={(time) => <Sky time={time} />}>
      <Dawn />
      <Morning />
      <Ceremony />
      <Afternoon />
      <Dusk />
      <Night />
    </AmbientPage>
  );
}
