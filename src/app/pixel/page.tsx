import type { Viewport } from "next";
import { IntroGate } from "@/components/intro/IntroSequence";
import { Invitation } from "@/components/invitation/Invitation";
import { VersionTabs } from "@/components/versions/VersionTabs";

// 도트 버전에서만 도트 인트로(날수 카운트 → 궁전 입장)를 재생한다
export default function PixelPage() {
  return (
    <>
      <Invitation />
      <VersionTabs />
      <IntroGate />
    </>
  );
}

// 모바일 브라우저 상단 바도 밤하늘 색으로
export const viewport: Viewport = { themeColor: "#1c1b33" };
