"use client";

import type { MouseEvent } from "react";
import { Page } from "./parts";

export const SECTIONS = [
  { id: "mag-letter", en: "Editor's Letter", ko: "초대의 글" },
  { id: "mag-feature", en: "The Feature", ko: "우리의 순간" },
  { id: "mag-details", en: "The Details", ko: "예식 안내" },
  { id: "mag-location", en: "Location", ko: "오시는 길" },
  { id: "mag-contributors", en: "Contributors", ko: "연락하기" },
  { id: "mag-account", en: "With Gratitude", ko: "마음 전하실 곳" },
];

export function Contents() {
  // 주소창에 #해시를 남기지 않고 부드럽게 이동 (?v= 쿼리를 유지하기 위해)
  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Page id="mag-contents" folio={2} kicker="CONTENTS">
      <h2 className="mt-10 font-display text-[3.4rem] leading-none tracking-tight text-[#171513]">Contents</h2>
      <p className="mt-3 font-headline text-sm text-[#171513]/70">이번 호에 담은 이야기</p>
      <ol className="mt-10">
        {SECTIONS.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(event) => jump(event, section.id)}
              className="flex items-baseline gap-3 py-3.5 text-[#171513] active:opacity-60"
            >
              <span className="w-6 font-display text-sm text-[#7a2430] italic lining-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg italic">{section.en}</span>
              <span className="mb-1 flex-1 border-b border-dotted border-[#171513]/35" />
              <span className="text-xs text-[#171513]/65">{section.ko}</span>
            </a>
          </li>
        ))}
      </ol>
    </Page>
  );
}
