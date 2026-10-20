"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/common/Icon";
import { Bride, Groom } from "@/components/pixel/Characters";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { type Outfit, type SimpleDate, type StoryChapter, type StoryMoment, wedding } from "@/data/wedding";
import { useScrollLock } from "@/hooks/useScrollLock";
import { dateOfDayNumber, dayNumberOf, formatDots, formatFirstDayDots } from "@/lib/date";
import { useIntroStore } from "@/store/introStore";
import { EasterEgg } from "./EasterEgg";

type TimelineItem =
  | ({ kind: "moment" } & StoryMoment)
  | { kind: "anniversary"; date: SimpleDate; days: number }
  | { kind: "wedding"; date: SimpleDate };

type Chapter = StoryChapter & { numeral: string; items: TimelineItem[] };

const ANNIVERSARY_STEP = 1000;
const NUMERALS = ["I", "II", "III", "IV", "V"];
// 시트 높이의 이 지점을 지난 마지막 항목에 두 사람이 서 있는다
const ACTIVE_LINE = 0.45;
// 노드 위에 발이 닿도록 보정
const FEET_OFFSET = 10;
// 각 항목에 도착하면 이만큼(px) 스크롤하는 동안은 멈춰 서 있다
const DWELL_PX = 70;
const WALK_IDLE_MS = 160;

/**
 * 스크롤 위치 → 두 사람의 y. 항목이 기준선에 닿는 스크롤 지점(anchors)마다 그 항목 위에 서 있고,
 * 항목 사이에서는 스크롤에 비례해 조금씩 걸어간다.
 */
function walkerY(scroll: number, anchors: number[], stops: number[]) {
  if (scroll <= anchors[0]) return { y: stops[0], index: 0 };
  for (let i = 0; i < anchors.length - 1; i++) {
    const from = anchors[i];
    const to = anchors[i + 1];
    if (scroll >= to) continue;
    const gap = to - from;
    const dwell = Math.min(DWELL_PX, gap * 0.3);
    const t = Math.min(Math.max((scroll - from - dwell) / (gap - dwell * 2), 0), 1);
    return { y: stops[i] + (stops[i + 1] - stops[i]) * t, index: t < 1 ? i : i + 1 };
  }
  return { y: stops[stops.length - 1], index: stops.length - 1 };
}

/** 직접 넣은 순간 + 1,000일 단위 기념일 + 예식일을 날짜순으로 정렬해 챕터별로 나눈다 */
function buildChapters(): Chapter[] {
  const { year, month, day } = wedding.date;
  const weddingDate = { year, month, day };
  const weddingDay = dayNumberOf(weddingDate);

  const anniversaries: TimelineItem[] = [];
  for (let n = ANNIVERSARY_STEP; n < weddingDay; n += ANNIVERSARY_STEP) {
    anniversaries.push({ kind: "anniversary", date: dateOfDayNumber(n), days: n });
  }

  const items = [
    ...wedding.story.map((moment): TimelineItem => ({ kind: "moment", ...moment })),
    ...anniversaries,
    { kind: "wedding" as const, date: weddingDate },
  ].sort((a, b) => dayNumberOf(a.date) - dayNumberOf(b.date));

  const chapters: Chapter[] = wedding.storyChapters.map((chapter, i) => ({ ...chapter, numeral: NUMERALS[i], items: [] }));
  for (const item of items) {
    const chapter = chapters.find((c) => c.until === undefined || item.date.year <= c.until) ?? chapters[chapters.length - 1];
    chapter.items.push(item);
  }
  return chapters.filter((chapter) => chapter.items.length > 0);
}

const CHAPTERS = buildChapters();
const OUTFIT_BY_INDEX: Outfit[] = CHAPTERS.flatMap((chapter) => chapter.items.map(() => chapter.outfit));
const WEDDING_DAY_NUMBER = dayNumberOf(wedding.date);

function yearRange(chapter: Chapter) {
  const first = chapter.items[0].date.year;
  const last = chapter.items[chapter.items.length - 1].date.year;
  return first === last ? `${first}` : `${first} — ${last}`;
}

function Photo({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative mt-5 aspect-4/3 overflow-hidden bg-white/6 pixel-corners">
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 480px) 75vw, 360px" className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-pixel text-[11px] tracking-widest text-white/30">
          PHOTO
        </span>
      )}
    </div>
  );
}

function Marker({ kind, lit }: { kind: TimelineItem["kind"]; lit: boolean }) {
  const size = kind === "anniversary" ? "size-2" : "size-3";
  return (
    <span
      className={`absolute top-2 -left-10 -translate-x-1/2 ${size} transition-all duration-500 ${
        lit ? "bg-gold shadow-[0_0_10px_rgba(232,200,121,0.8)]" : "bg-white/20"
      }`}
    />
  );
}

function Entry({ item }: { item: TimelineItem }) {
  if (item.kind === "anniversary") {
    return (
      <p className="flex items-baseline gap-3 text-white/60">
        <span className="font-display text-lg text-white/85 italic lining-nums">{item.days.toLocaleString("ko-KR")}일</span>
        <span className="font-display text-xs tracking-widest lining-nums">{formatDots(item.date)}</span>
      </p>
    );
  }

  if (item.kind === "wedding") {
    return (
      <div>
        <p className="font-display text-xs tracking-[0.25em] text-white/55 lining-nums">{formatDots(item.date)}</p>
        <h3 className="mt-3 flex items-center gap-3 font-serif text-2xl leading-snug text-white">
          우리, 결혼합니다
          <EasterEgg>
            <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-4 w-[18px]" />
          </EasterEgg>
        </h3>
        <p className="mt-2 text-sm text-white/55">
          {WEDDING_DAY_NUMBER.toLocaleString("ko-KR")}번째 날, 둘이 함께하는 새로운 1일을 시작합니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="flex items-baseline justify-between gap-3">
        <span className="font-display text-xs tracking-[0.25em] text-white/55 lining-nums">{formatDots(item.date)}</span>
        <span className="font-pixel text-[11px] text-gold/90">{dayNumberOf(item.date).toLocaleString("ko-KR")}일째</span>
      </p>
      <h3 className="mt-3 font-serif text-xl text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
      <Photo src={item.photo} alt={item.title} />
    </div>
  );
}

/** 지금 보고 있는 항목 옆에 두 사람이 서 있고, 항목이 바뀌면 그 자리까지 걸어간다 */
function Timeline({ container }: { container: RefObject<HTMLDivElement | null> }) {
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [walking, setWalking] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastY = useRef<number | null>(null);
  const targetY = useMotionValue(0);
  const y = useSpring(targetY, { stiffness: 260, damping: 34 });
  const { scrollY } = useScroll({ container });

  const locate = () => {
    const box = container.current;
    const list = nodes.current.filter((node): node is HTMLLIElement => node !== null);
    if (!box || list.length === 0) return;

    // 항목이 기준선에 닿는 스크롤 값. 화면 기준이 아닌 콘텐츠 기준이라 시트 등장 애니메이션에 흔들리지 않는다
    const boxTop = box.getBoundingClientRect().top;
    const maxScroll = box.scrollHeight - box.clientHeight;
    const anchors = list.map((node) => node.getBoundingClientRect().top - boxTop + box.scrollTop - box.clientHeight * ACTIVE_LINE);
    // 끝까지 내려도 기준선에 닿지 못하는 마지막 항목들은 남은 스크롤 구간에 고르게 나눠 배치
    const firstUnreachable = anchors.findIndex((anchor) => anchor >= maxScroll - 1);
    if (firstUnreachable !== -1) {
      const start = firstUnreachable > 0 ? anchors[firstUnreachable - 1] : 0;
      const count = anchors.length - firstUnreachable;
      for (let i = 0; i < count; i++) anchors[firstUnreachable + i] = start + ((maxScroll - start) * (i + 1)) / count;
    }
    const stops = list.map((node) => node.offsetTop + FEET_OFFSET);

    const next = walkerY(box.scrollTop, anchors, stops);
    targetY.set(next.y);
    setActive(next.index);

    // 실제로 움직인 동안만 걷는 모션
    if (lastY.current !== null && Math.abs(next.y - lastY.current) > 0.5) {
      setWalking(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setWalking(false), WALK_IDLE_MS);
    }
    lastY.current = next.y;
  };

  useMotionValueEvent(scrollY, "change", locate);
  useEffect(() => {
    const id = requestAnimationFrame(locate);
    return () => cancelAnimationFrame(id);
    // 처음 열렸을 때 한 번만 자리를 잡는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const outfit = OUTFIT_BY_INDEX[active] ?? "wedding";
  let flatIndex = 0;

  return (
    <div className="relative mt-4 pl-20">
      {/* 길 */}
      <div className="absolute inset-y-0 left-10 w-px -translate-x-1/2 bg-linear-to-b from-white/0 via-white/25 to-white/0" />

      {/* 두 사람 */}
      <motion.div className="absolute top-0 left-10 z-10" style={{ y }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={outfit}
            className="flex -translate-x-1/2 -translate-y-full gap-px"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
          >
            <Groom outfit={outfit} walking={walking} className="h-10 w-7.5" />
            <Bride outfit={outfit} walking={walking} className="h-10 w-7.5" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {CHAPTERS.map((chapter) => (
        <section key={chapter.numeral} className="pt-24">
          <header className="relative">
            <span className="absolute top-4 -left-10 size-1.5 -translate-x-1/2 rotate-45 bg-gold/60" />
            <p className="font-display text-5xl leading-none text-gold/80 italic">{chapter.numeral}</p>
            <h2 className="mt-4 font-serif text-lg text-white">{chapter.title}</h2>
            <p className="mt-1 font-display text-xs tracking-[0.3em] text-white/40 lining-nums">{yearRange(chapter)}</p>
          </header>

          <ol className="mt-12 space-y-16">
            {chapter.items.map((item) => {
              const index = flatIndex++;
              return (
                <li
                  key={`${item.kind}-${formatDots(item.date)}`}
                  ref={(node) => {
                    nodes.current[index] = node;
                  }}
                  className="relative"
                >
                  <Marker kind={item.kind} lit={index <= active} />
                  <Entry item={item} />
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

function StorySheet({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  useScrollLock();

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-40 mx-auto max-w-[480px] scrollbar-none overflow-y-auto overscroll-contain bg-night"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label="우리의 이야기"
    >
      <div className="sticky top-0 z-20 bg-night/85 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-display text-base text-white/85 italic">Our Story</span>
          <button type="button" onClick={onClose} aria-label="닫기" className="-mr-2 p-2 text-white/70 hover:text-white">
            <Icon name="close" className="size-5" />
          </button>
        </div>
        {/* 읽은 만큼 차오르는 진행선 (스크롤바 대신) */}
        <motion.div className="h-px origin-left bg-gold/70" style={{ scaleX: scrollYProgress }} />
      </div>

      <div className="px-6 pt-12 pb-32 text-white">
        <p className="font-pixel text-[11px] tracking-[0.3em] text-pink-200/80">SINCE {formatFirstDayDots()}</p>
        <h1 className="mt-4 font-serif text-[1.75rem] leading-snug">
          함께 걸어온
          <br />
          {WEDDING_DAY_NUMBER.toLocaleString("ko-KR")}일의 길
        </h1>
        <Timeline container={containerRef} />
      </div>
    </motion.div>
  );
}

/** 우측 하단 아이콘 버튼으로 여는 러브 스토리 타임라인 */
export function Story() {
  const introDone = useIntroStore((s) => s.phase === "done");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // 내려 읽는 동안에는 버튼이 내용을 가리지 않도록 숨기고, 올리면 다시 보여준다
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    if (delta > 4 && y > 80) setHidden(true);
    else if (delta < -4) setHidden(false);
  });

  return (
    <>
      <AnimatePresence>
        {introDone && !open && !hidden && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="우리의 이야기 보기"
            className="fixed right-[max(1rem,calc((100vw-480px)/2+1rem))] bottom-5 z-30 flex size-13 items-center justify-center rounded-full bg-night shadow-[0_8px_24px_-6px_rgba(28,27,51,0.55)] ring-1 ring-gold/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <Groom className="h-5 w-[15px]" />
            <Bride className="h-5 w-[15px]" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>{open && <StorySheet onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
