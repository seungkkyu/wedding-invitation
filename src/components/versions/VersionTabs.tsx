"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { VERSIONS, versionHref } from "@/lib/versions";
import { useIntroStore } from "@/store/introStore";

// 이만큼 내려간 뒤부터는 아래로 스크롤하면 숨기고, 위로 올리면 다시 보여 준다
const HIDE_AFTER_PX = 120;

/** 상단 플로팅 탭: 다른 청첩장 디자인 페이지로 이동 */
export function VersionTabs() {
  const pathname = usePathname();
  // 도트 버전은 인트로가 끝난 뒤에 탭을 보여 준다
  const introPlaying = useIntroStore((s) => s.phase !== "done");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const listRef = useRef<HTMLUListElement>(null);

  // 탭이 화면보다 넓어 가로로 스크롤될 때, 지금 디자인 탭이 보이도록 가운데로 옮긴다
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>("[aria-current=page]");
    if (!list || !current) return;
    list.scrollLeft = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
  }, [pathname, introPlaying]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > HIDE_AFTER_PX && y > previous);
  });

  if (pathname === versionHref("pixel") && introPlaying) return null;

  return (
    <motion.nav
      aria-label="청첩장 디자인"
      className="fixed top-3 left-1/2 z-30 w-max max-w-[calc(100vw-1.5rem)] -translate-x-1/2"
      animate={{ y: hidden ? -72 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ul ref={listRef} className="scrollbar-none relative flex gap-0.5 overflow-x-auto rounded-full bg-neutral-900/55 p-1 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/15 backdrop-blur-md">
        <li>
          <Link
            href="/"
            aria-label="디자인 고르기"
            className="relative flex h-full items-center px-2.5 text-white/70 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" fill="currentColor" />
            </svg>
          </Link>
        </li>
        {VERSIONS.map(({ id, label }) => {
          const href = versionHref(id);
          const current = pathname === href;
          return (
            <li key={id}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className="relative block px-3 py-1.5 text-xs whitespace-nowrap tracking-wide text-white/70 transition-colors aria-[current=page]:text-neutral-900"
              >
                {current && (
                  <motion.span
                    layoutId="version-tab"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
