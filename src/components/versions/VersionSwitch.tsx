"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Invitation } from "@/components/invitation/Invitation";
import { useIntroStore } from "@/store/introStore";
import { isVersionId, useVersionStore } from "@/store/versionStore";
import { VersionTabs } from "./VersionTabs";

// 기본(도트) 외의 버전은 탭을 눌렀을 때 내려받는다
const FilmInvitation = dynamic(() => import("@/components/film/FilmInvitation").then((m) => m.FilmInvitation));
const MagazineInvitation = dynamic(() =>
  import("@/components/magazine/MagazineInvitation").then((m) => m.MagazineInvitation),
);
const LetterInvitation = dynamic(() => import("@/components/letter/LetterInvitation").then((m) => m.LetterInvitation));
const ScrapbookInvitation = dynamic(() =>
  import("@/components/scrapbook/ScrapbookInvitation").then((m) => m.ScrapbookInvitation),
);

/** 선택된 버전의 청첩장 + 상단 버전 탭 (인트로가 끝난 뒤 노출) */
export function VersionSwitch() {
  const version = useVersionStore((s) => s.version);
  const setVersion = useVersionStore((s) => s.setVersion);
  const introDone = useIntroStore((s) => s.phase === "done");

  // ?v=film 처럼 링크로 특정 버전을 바로 열 수 있게 한다 (정적 페이지라 클라이언트에서 읽음)
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("v");
    if (isVersionId(requested)) setVersion(requested);
  }, [setVersion]);

  return (
    <>
      {version === "pixel" && <Invitation />}
      {version === "film" && <FilmInvitation />}
      {version === "magazine" && <MagazineInvitation />}
      {version === "letter" && <LetterInvitation />}
      {version === "scrapbook" && <ScrapbookInvitation />}
      {introDone && <VersionTabs />}
    </>
  );
}
