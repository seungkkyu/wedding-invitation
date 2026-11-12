"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/data/wedding";
import { dialogProps, useDialog } from "@/hooks/useDialog";
import { Icon } from "./Icon";

const SWIPE_THRESHOLD = 60;

type LightboxProps = {
  photos: Photo[];
  /** 열린 사진 번호. null이면 닫힘 (닫힐 때 페이드아웃) */
  index: number | null;
  onMove: (delta: number) => void;
  onClose: () => void;
  /** 배경·글자색 등 테마 스타일 (기본: 검정 배경) */
  className?: string;
  /** 상단 왼쪽 (기본: "01 / 05") */
  renderCounter?: (index: number, total: number) => ReactNode;
  /** 하단 가운데 (기본: 사진 설명) */
  renderCaption?: (photo: Photo) => ReactNode;
  /** 사진에 덧입힐 필터 등 */
  imageClassName?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");
const noopSubscribe = () => () => {};

/**
 * 전체 화면 사진 보기 (스와이프·이전/다음·Esc·방향키).
 * body로 포털을 띄워서, transform이 걸린 섹션 안에서 열어도 fixed가 화면 기준으로 잡힌다.
 */
export function Lightbox({ index, ...props }: LightboxProps) {
  // 포털은 서버 HTML에 없으므로 하이드레이션이 끝난 뒤에만 띄운다
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>{index !== null && <LightboxView key="lightbox" index={index} {...props} />}</AnimatePresence>,
    document.body,
  );
}

function LightboxView({
  photos,
  index,
  onMove,
  onClose,
  className = "bg-black/95 text-white",
  renderCounter = (i, total) => (
    <span className="font-display tracking-widest lining-nums">
      {pad(i + 1)} / {pad(total)}
    </span>
  ),
  renderCaption = (photo) => photo.caption,
  imageClassName = "",
}: Omit<LightboxProps, "index"> & { index: number }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog(dialogRef, onClose);
  const photo = photos[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onMove(-1);
      else if (event.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onMove]);

  return (
    <motion.div
      ref={dialogRef}
      {...dialogProps}
      aria-label="사진 크게 보기"
      className={`fixed inset-0 z-40 flex flex-col outline-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-5 py-3 text-sm opacity-80">
        {renderCounter(index, photos.length)}
        <button type="button" onClick={onClose} aria-label="닫기" className="-mr-2 p-2">
          <Icon name="close" className="size-5" />
        </button>
      </div>
      <motion.div
        key={index}
        className="relative mx-auto w-full max-w-[480px] flex-1"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -SWIPE_THRESHOLD) onMove(1);
          else if (info.offset.x > SWIPE_THRESHOLD) onMove(-1);
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image src={photo.src} alt={photo.caption} fill sizes="480px" draggable={false} className={`object-contain ${imageClassName}`} />
      </motion.div>
      <div className="flex items-center justify-between px-3 py-4">
        <button type="button" onClick={() => onMove(-1)} aria-label="이전 사진" className="p-2 opacity-70">
          <Icon name="chevronLeft" className="size-6" />
        </button>
        <div className="min-w-0 flex-1 truncate text-center text-sm opacity-80">{renderCaption(photo)}</div>
        <button type="button" onClick={() => onMove(1)} aria-label="다음 사진" className="p-2 opacity-70">
          <Icon name="chevronRight" className="size-6" />
        </button>
      </div>
    </motion.div>
  );
}
