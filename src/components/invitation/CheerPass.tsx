"use client";

import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { PixelSprite } from "@/components/pixel/PixelSprite";
import { PLANE_FRAMES, PLANE_PALETTE } from "@/components/pixel/sprites";
import { wedding } from "@/data/wedding";
import { useScrollLock } from "@/hooks/useScrollLock";
import { type Cheer, Departure } from "./Departure";

// 현수막 한 줄에 들어가도록 길이를 제한한다
const NAME_MAX = 10;
const MESSAGE_MAX = 20;
const PRESETS = ["결혼 축하해!", "행복하게 잘 살아", "여행 잘 다녀와!", "평생 사랑해요"];

type Step = "folded" | "composing" | "departing" | "issued";

function Composer({ initial, onCancel, onSend }: { initial?: Cheer; onCancel: () => void; onSend: (cheer: Cheer) => void }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [message, setMessage] = useState(initial?.message ?? "");
  useScrollLock();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (message.trim()) onSend({ name: name.trim(), message: message.trim() });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[480px] bg-paper px-8 pt-8 pb-10"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-xl text-accent italic">Cheer Pass</p>
        <h3 className="mt-2 font-serif text-base text-ink">두 사람의 비행기에 실을 축하 한마디</h3>

        <label className="mt-8 block">
          <span className="text-[10px] tracking-[0.2em] text-muted">NAME</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={NAME_MAX}
            placeholder="이름 (선택)"
            className="mt-1 w-full border-b border-line bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-accent"
          />
        </label>

        <label className="mt-6 block">
          <span className="flex justify-between text-[10px] tracking-[0.2em] text-muted">
            MESSAGE
            <span className="lining-nums">
              {message.length}/{MESSAGE_MAX}
            </span>
          </span>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={MESSAGE_MAX}
            placeholder="축하 한마디"
            className="mt-1 w-full border-b border-line bg-transparent py-2 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-accent"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setMessage(preset)}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                message === preset ? "border-accent bg-accent text-white" : "border-line text-ink"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-[1fr_2fr] gap-2">
          <button type="button" onClick={onCancel} className="border border-line py-3.5 text-[13px] text-muted">
            취소
          </button>
          <button
            type="submit"
            disabled={!message.trim()}
            className="flex items-center justify-center gap-2 bg-night py-3.5 font-pixel text-sm text-white disabled:opacity-40"
          >
            <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-2.5 w-[26px]" />
            보내기
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}

/** 축하가 끝나면 펼쳐지는 하객 전용 탑승권 */
function IssuedPass({ cheer, onReplay, onRewrite }: { cheer: Cheer; onReplay: () => void; onRewrite: () => void }) {
  const { groom, bride, honeymoon } = wedding;
  return (
    <div className="perspective-[900px]">
      <motion.article
        className="relative origin-top bg-ivory shadow-[0_14px_36px_-16px_rgba(47,42,37,0.35)] ring-1 ring-line"
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="px-6 pt-5 pb-6">
          <p className="flex justify-between text-[10px] tracking-[0.25em] text-muted">
            <span>CHEER PASS</span>
            <span className="lining-nums">{honeymoon.flight}</span>
          </p>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted">PASSENGER</dt>
              <dd className="mt-1 font-serif text-lg text-ink">{cheer.name ? `${cheer.name} 님` : "소중한 하객 님"}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted">MESSAGE</dt>
              <dd className="mt-1 font-serif text-base text-ink">“{cheer.message}”</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] text-muted">DELIVERED TO</dt>
              <dd className="mt-1 text-sm text-ink">
                {groom.name} · {bride.name} <span className="text-muted">— {honeymoon.to.city}</span>
              </dd>
            </div>
          </dl>
        </div>
        {/* 도장 */}
        <span className="absolute top-14 right-6 flex size-20 rotate-[-14deg] items-center justify-center rounded-full border-2 border-accent/70 text-center font-display text-[11px] leading-tight tracking-widest text-accent/80 italic">
          Cheered
          <br />
          with love
        </span>
        <div className="mx-4 border-t border-dashed border-line" />
        <div className="grid grid-cols-2 divide-x divide-line text-[13px]">
          <button type="button" onClick={onReplay} className="py-3.5 text-ink">
            장면 다시 보기
          </button>
          <button type="button" onClick={onRewrite} className="py-3.5 text-muted">
            다시 쓰기
          </button>
        </div>
      </motion.article>
    </div>
  );
}

/** 접힌 티켓 → 축하 한마디 입력 → 현수막을 단 비행기 출국 → 하객 전용 탑승권 발급 */
export function CheerPass() {
  const [step, setStep] = useState<Step>("folded");
  const [cheer, setCheer] = useState<Cheer>();
  const { honeymoon } = wedding;

  return (
    <div className="mt-16">
      <p className="text-center text-[13px] leading-6 text-muted">
        두 사람의 비행기에
        <br />
        축하 한마디를 실어 보내주세요
      </p>

      <div className="mt-6">
        {step === "issued" && cheer ? (
          <IssuedPass cheer={cheer} onReplay={() => setStep("departing")} onRewrite={() => setStep("composing")} />
        ) : (
          // 접힌 티켓: 위쪽 반만 보이고 아래는 접혀 들어간 모양
          <button type="button" onClick={() => setStep("composing")} className="group block w-full text-left">
            <span className="block bg-ivory px-6 pt-4 pb-5 ring-1 ring-line">
              <span className="flex justify-between text-[10px] tracking-[0.25em] text-muted">
                <span>CHEER PASS</span>
                <span className="lining-nums">{honeymoon.flight}</span>
              </span>
              <span className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted/70">PASSENGER · ———</span>
                <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-2.5 w-[26px] opacity-60" />
              </span>
            </span>
            <span className="mx-1 block h-2 bg-linear-to-b from-line to-transparent" />
            <span className="mt-4 flex items-center justify-center gap-2 border border-ink/80 py-3.5 text-[13px] text-ink transition-colors group-active:bg-line/40">
              <PixelSprite frames={PLANE_FRAMES} palette={PLANE_PALETTE} className="h-2.5 w-[26px]" />
              축하 보내기
            </span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {step === "composing" && (
          <Composer
            initial={cheer}
            onCancel={() => setStep(cheer ? "issued" : "folded")}
            onSend={(next) => {
              setCheer(next);
              setStep("departing");
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === "departing" && <Departure cheer={cheer} onClose={() => setStep("issued")} />}
      </AnimatePresence>
    </div>
  );
}
