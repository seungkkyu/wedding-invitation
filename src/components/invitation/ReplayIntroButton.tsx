"use client";

import { features } from "@/lib/env";
import { useIntroStore } from "@/store/introStore";
import { Icon } from "@/components/common/Icon";

/** '인트로 다시 보기': 맨 위로 올린 뒤 인트로를 처음부터 재생. 인트로를 끈 경우(NEXT_PUBLIC_INTRO_ENABLED=false) 숨긴다 */
export function ReplayIntroButton({ className = "" }: { className?: string }) {
  const replay = useIntroStore((s) => s.replay);
  if (!features.intro) return null;

  const replayIntro = () => {
    window.scrollTo({ top: 0 });
    replay();
  };

  return (
    <button type="button" onClick={replayIntro} className={`flex items-center gap-1.5 text-xs ${className}`}>
      <Icon name="replay" className="size-3.5" />
      인트로 다시 보기
    </button>
  );
}
