"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bride, Groom } from "@/components/pixel/Characters";
import { PixelSection } from "@/components/pixel/PixelSection";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { guestLook, hashSeed } from "@/components/pixel/guestSprite";
import { HEART_FRAMES, HEART_PALETTE } from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";
import { dialogProps, useDialog } from "@/hooks/useDialog";
import { useGuests } from "@/hooks/useGuests";
import { formatWeddingDateDots } from "@/lib/date";
import { GUEST_NAME_MAX } from "@/lib/guests";

// ── 자리 배치 ──
// 좌표는 사진 너비를 100으로 둔 단위. 사진은 4:3이라 높이는 75.
const PHOTO_H = 75;
const FLOOR = 7;
/** 뒷줄 머리가 이 높이를 넘지 않게 (위쪽 현수막 자리) */
const CEILING = 57;
const EDGE = 47;

type Slot = { x: number; bottom: number; row: number };
type Layout = { size: number; couple: [Slot, Slot]; slots: Slot[] };

/** 한 줄의 자리: 가운데에서 가까운 순서로, 왼쪽 → 오른쪽 번갈아 */
function rowOffsets(row: number, step: number, size: number) {
  const half = row % 2 === 0 ? 0.5 : 0;
  const offsets: number[] = half ? [] : [0];
  for (let k = 1 - half; Math.abs(k * step) + size / 2 <= EDGE; k++) offsets.push(-k, k);
  // 맨 앞줄 가운데 두 자리는 신랑·신부
  return row === 0 ? offsets.filter((o) => Math.abs(o) !== 0.5) : offsets;
}

/** 인원이 늘면 줄을 뒤로 쌓고, 더 못 쌓으면 모두 조금씩 작게 그린다 */
function layout(count: number): Layout {
  let size = 11;
  for (;;) {
    const height = (size * 4) / 3;
    const step = size * 0.92;
    const rise = height * 0.4;
    const slots: Slot[] = [];
    for (let row = 0; slots.length < count; row++) {
      const bottom = FLOOR + row * rise;
      if (bottom + height > CEILING) break;
      for (const o of rowOffsets(row, step, size)) slots.push({ x: 50 + o * step, bottom, row });
    }
    if (slots.length >= count || size < 3) {
      return {
        size,
        couple: [
          { x: 50 - step / 2, bottom: FLOOR, row: 0 },
          { x: 50 + step / 2, bottom: FLOOR, row: 0 },
        ],
        slots: slots.slice(0, count),
      };
    }
    size *= 0.9;
  }
}

const place = (slot: Slot, size: number) => ({
  left: `${slot.x - size / 2}%`,
  bottom: `${(slot.bottom / PHOTO_H) * 100}%`,
  width: `${size}%`,
});

const depth = (row: number) => ({ zIndex: 20 - row, filter: `brightness(${1 - row * 0.07})` });

// ── 사진 배경: 벽, 전구 줄, 바닥 ──
const BULB_COLORS = ["#e8c879", "#ff8fab", "#a5d8ff", "#ffffff"];

function Backdrop() {
  return (
    <svg viewBox="0 0 120 90" preserveAspectRatio="none" shapeRendering="crispEdges" className="absolute inset-0 size-full" aria-hidden>
      <rect width="120" height="90" fill="#2c2a5c" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={i * 8 + 3} y="0" width="2" height="66" fill="#312f66" />
      ))}
      <rect y="9" width="120" height="0.6" fill="#1c1b33" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={i * 8 + 3.5} y="9.5" width="1.6" height="2" fill={BULB_COLORS[i % BULB_COLORS.length]} />
      ))}
      <rect y="66" width="120" height="24" fill="#1f1e44" />
      <rect y="66" width="120" height="1.2" fill="#3d3b6e" />
      <rect x="40" y="67.2" width="40" height="22.8" fill="#6b2a3a" opacity="0.55" />
    </svg>
  );
}

// ── 사진 속 하객 ──
function PhotoGuest({
  seed,
  name,
  slot,
  size,
  entering,
  onArrive,
}: {
  seed: number;
  name: string;
  slot: Slot;
  size: number;
  entering: boolean;
  onArrive: () => void;
}) {
  const look = useMemo(() => guestLook(seed), [seed]);
  const [walking, setWalking] = useState(entering);
  const target = place(slot, size);
  // 가까운 쪽 가장자리에서 걸어 들어온다
  const from = slot.x < 50 ? `${-size}%` : "100%";

  return (
    <motion.div
      className="absolute"
      style={depth(slot.row)}
      initial={entering ? { ...target, left: from } : false}
      animate={target}
      transition={
        entering ? { left: { duration: 0.6 + Math.abs(slot.x - 50) / 40, ease: "linear", delay: 0.4 } } : { duration: 0.6 }
      }
      onAnimationComplete={() => {
        if (!walking) return;
        setWalking(false);
        onArrive();
      }}
      title={name}
    >
      <PixelSprite {...look} animated={walking} className="aspect-[3/4] w-full" />
    </motion.div>
  );
}

// ── 이름 입력 창 ──
function JoinSheet({ onCancel, onJoin }: { onCancel: () => void; onJoin: (name: string, seed: number) => void }) {
  const [name, setName] = useState("");
  const [reroll, setReroll] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onCancel);

  const trimmed = name.trim();
  const seed = hashSeed(`${trimmed}#${reroll}`);
  const look = useMemo(() => guestLook(seed), [seed]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (trimmed) onJoin(trimmed, seed);
  };

  return (
    <motion.div
      ref={dialogRef}
      {...dialogProps}
      aria-label="단체사진에 함께하기"
      className="fixed inset-0 z-50 flex items-end justify-center bg-night/70 overscroll-contain outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[480px] bg-ivory px-8 pt-8 pb-10 font-pixel"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-lg text-accent">Group Photo</p>
        <h3 className="mt-2 text-sm text-ink">단체사진에 들어갈 내 캐릭터</h3>

        {/* 미리보기: 이름을 바꾸면 모습도 바뀐다 */}
        <div className="mt-6 flex items-end gap-5">
          <div className="flex h-24 w-20 shrink-0 items-end justify-center border-b-4 border-line">
            <PixelSprite {...look} animated className="h-20 w-15" />
          </div>
          <button
            type="button"
            onClick={() => setReroll((n) => n + 1)}
            className="mb-1 border border-line px-3 py-1.5 text-xs text-ink"
          >
            다른 모습
          </button>
        </div>

        <label className="mt-6 block">
          <span className="flex justify-between text-[11px] tracking-[0.2em] text-muted">
            NAME
            <span className="lining-nums">
              {name.length}/{GUEST_NAME_MAX}
            </span>
          </span>
          <input
            value={name}
            name="name"
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            maxLength={GUEST_NAME_MAX}
            placeholder="이름"
            className="mt-1 w-full border-b-2 border-line bg-transparent py-2 text-base text-ink outline-none placeholder:text-muted focus:border-accent"
          />
        </label>

        <div className="mt-10 grid grid-cols-[1fr_2fr] gap-2">
          <button type="button" onClick={onCancel} className="border border-line py-3.5 text-[13px] text-muted">
            취소
          </button>
          <button type="submit" disabled={!trimmed} className="bg-accent py-3.5 text-sm text-night disabled:opacity-40">
            사진 찍으러 가기
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/** 마지막 순서 단체사진: 참석하기를 누를 때마다 하객 캐릭터가 한 명씩 걸어 들어와 자리를 잡는다 */
export function GroupPhoto() {
  const { guests, newestId, join } = useGuests();
  const [joining, setJoining] = useState(false);
  const [shot, setShot] = useState(0);
  const [tagId, setTagId] = useState<string>();
  const photoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { groom, bride } = wedding;

  const { size, couple, slots } = useMemo(() => layout(guests.length), [guests.length]);
  const newest = guests.find((g) => g.id === newestId);
  const newestSlot = newest ? slots[guests.indexOf(newest)] : undefined;

  const snap = (id: string) => {
    setShot((n) => n + 1);
    setTagId(id);
  };

  // 새 하객의 이름표는 잠시 뒤 사라진다
  useEffect(() => {
    if (!tagId) return;
    const timer = setTimeout(() => setTagId(undefined), 3500);
    return () => clearTimeout(timer);
  }, [tagId]);

  const onJoin = async (name: string, seed: number) => {
    setJoining(false);
    photoRef.current?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    const guest = await join(name, seed);
    if (reduceMotion) snap(guest.id);
  };

  return (
    <PixelSection title="다 함께 찰칵">
      <p className="text-center text-[13px] leading-6 text-muted">
        예식의 마지막 순서는 단체사진이죠.
        <br />
        참석하기를 누르면 사진 속에 함께 서게 돼요.
      </p>

      {/* 액자 */}
      <figure className="mt-8 bg-ivory p-3 pb-4 pixel-box">
        <div ref={photoRef} className="relative aspect-[4/3] overflow-hidden">
          <Backdrop />

          <div className="absolute inset-x-0 top-[19%] z-30 flex items-center justify-center gap-2 font-pixel text-[11px] tracking-[0.3em] text-accent">
            <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-2 w-[9px]" />
            JUST MARRIED
            <PixelSprite frames={HEART_FRAMES} palette={HEART_PALETTE} className="h-2 w-[9px]" />
          </div>

          {guests.map((guest, i) => (
            <PhotoGuest
              key={guest.id}
              seed={guest.seed}
              name={guest.name}
              slot={slots[i]}
              size={size}
              entering={guest.id === newestId && !reduceMotion}
              onArrive={() => snap(guest.id)}
            />
          ))}

          {/* 신랑·신부는 맨 앞줄 가운데 */}
          <motion.div className="absolute" style={depth(0)} animate={place(couple[0], size)} initial={false}>
            <Groom className="aspect-[3/4] w-full" />
          </motion.div>
          <motion.div className="absolute" style={depth(0)} animate={place(couple[1], size)} initial={false}>
            <Bride className="aspect-[3/4] w-full" />
          </motion.div>

          {/* 막 들어온 하객 이름표 */}
          <AnimatePresence>
            {tagId === newestId && newest && newestSlot && (
              <motion.span
                key={newest.id}
                className="absolute z-40 -translate-x-1/2 bg-night px-1.5 py-0.5 font-pixel text-[10px] whitespace-nowrap text-ink"
                style={{
                  left: `${newestSlot.x}%`,
                  bottom: `${((newestSlot.bottom + (size * 4) / 3 + 1.5) / PHOTO_H) * 100}%`,
                }}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {newest.name}
              </motion.span>
            )}
          </AnimatePresence>

          {/* 플래시 */}
          <AnimatePresence>
            {shot > 0 && (
              <motion.div
                key={shot}
                className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-white font-pixel text-lg text-night"
                initial={{ opacity: reduceMotion ? 0 : 0.95 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                찰칵!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <figcaption className="mt-3 flex justify-between font-pixel text-[11px] text-muted">
          <span>
            {groom.name} ♥ {bride.name}
            {guests.length > 0 && ` & 친구들 ${guests.length}명`}
          </span>
          <span className="lining-nums">{formatWeddingDateDots()}</span>
        </figcaption>
      </figure>

      <p className="sr-only" aria-live="polite">
        {newest ? `${newest.name}님이 단체사진에 함께했어요` : ""}
      </p>

      {guests.length > 0 && (
        <p className="mt-6 text-center text-xs leading-6 text-muted">
          함께한 친구들 · {guests.map((g) => g.name).join(", ")}
        </p>
      )}

      <button
        type="button"
        onClick={() => setJoining(true)}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-accent py-4 font-pixel text-sm text-night pixel-btn [--pixel-border:var(--color-accent)]"
      >
        <PixelSprite frames={HEART_FRAMES} palette={{ h: "#1c1b33" }} className="h-2.5 w-[11px]" />
        참석하기
      </button>

      <AnimatePresence>{joining && <JoinSheet onCancel={() => setJoining(false)} onJoin={onJoin} />}</AnimatePresence>
    </PixelSection>
  );
}
