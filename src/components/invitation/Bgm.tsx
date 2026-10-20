"use client";

import { useEffect, useRef, useState } from "react";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { SPEAKER_OFF_FRAMES, SPEAKER_ON_FRAMES, SPEAKER_PALETTE } from "@/components/pixel/sprites";
import { type Chiptune, createChiptune } from "@/lib/chiptune";

// 모바일 브라우저는 사용자 제스처 전에는 소리를 막으므로, 첫 터치/키 입력 때 재생을 시작한다
const GESTURE_EVENTS = ["pointerup", "touchend", "keydown"] as const;

/** 8비트 결혼행진곡 BGM + 우측 상단 스피커 토글 */
export function Bgm() {
  const tune = useRef<Chiptune | null>(null);
  const [wanted, setWanted] = useState(true);
  const [playing, setPlaying] = useState(false);

  const getTune = () => (tune.current ??= createChiptune());

  useEffect(() => {
    if (!wanted || playing) return;
    const start = () => {
      getTune().play();
      setPlaying(true);
    };
    GESTURE_EVENTS.forEach((event) => window.addEventListener(event, start, { once: true }));
    return () => GESTURE_EVENTS.forEach((event) => window.removeEventListener(event, start));
  }, [wanted, playing]);

  // 다른 앱으로 나가면 멈추고 돌아오면 이어서
  useEffect(() => {
    if (!playing) return;
    const onVisibility = () => (document.hidden ? tune.current?.pause() : tune.current?.play());
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing]);

  useEffect(() => () => tune.current?.dispose(), []);

  const toggle = () => {
    if (playing) {
      tune.current?.pause();
      setPlaying(false);
      setWanted(false);
    } else {
      getTune().play();
      setPlaying(true);
      setWanted(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "배경음악 끄기" : "배경음악 켜기"}
      aria-pressed={playing}
      className="fixed top-4 right-[max(1rem,calc((100vw-480px)/2+1rem))] z-30 flex size-9 items-center justify-center rounded-full bg-ivory/80 text-ink/70 ring-1 ring-line backdrop-blur-sm"
    >
      <PixelSprite
        frames={playing ? SPEAKER_ON_FRAMES : SPEAKER_OFF_FRAMES}
        palette={SPEAKER_PALETTE}
        className={`h-3.5 w-4 ${playing ? "animate-flicker" : ""}`}
      />
    </button>
  );
}
