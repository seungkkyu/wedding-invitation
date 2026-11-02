"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { VERSIONS, useVersionStore } from "@/store/versionStore";

// 이만큼 내려간 뒤부터는 아래로 스크롤하면 숨기고, 위로 올리면 다시 보여 준다
const HIDE_AFTER_PX = 120;

/** 상단 플로팅 탭: 청첩장 디자인 버전 전환 */
export function VersionTabs() {
  const version = useVersionStore((s) => s.version);
  const setVersion = useVersionStore((s) => s.setVersion);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > HIDE_AFTER_PX && y > previous);
  });

  const select = (id: (typeof VERSIONS)[number]["id"]) => {
    if (id === version) return;
    setVersion(id);
    const url = new URL(window.location.href);
    url.searchParams.set("v", id);
    history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  };

  return (
    <motion.nav
      aria-label="청첩장 디자인"
      className="fixed top-3 left-1/2 z-30 w-max -translate-x-1/2"
      animate={{ y: hidden ? -72 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ul className="flex gap-0.5 rounded-full bg-neutral-900/55 p-1 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/15 backdrop-blur-md">
        {VERSIONS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => select(id)}
              aria-current={id === version ? "page" : undefined}
              className="relative px-3 py-1.5 text-xs tracking-wide text-white/70 transition-colors aria-[current=page]:text-neutral-900"
            >
              {id === version && (
                <motion.span
                  layoutId="version-tab"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
