"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 화면 세로 가운데 선을 지나고 있는 섹션의 `data-section` 값.
 * 스크롤 이벤트 대신 IntersectionObserver를 써서, 섹션이 바뀔 때만 한 번 렌더한다.
 */
export function useActiveSection<T extends string>(rootRef: RefObject<HTMLElement | null>, initial: T) {
  const [active, setActive] = useState<T>(initial);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = root.querySelectorAll<HTMLElement>("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-section") as T);
        }
      },
      // 위아래를 50%씩 잘라 가운데 한 줄에 걸친 섹션만 잡는다
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [rootRef]);

  return active;
}
