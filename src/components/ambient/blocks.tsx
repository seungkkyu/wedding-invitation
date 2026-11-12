"use client";

import Image from "next/image";
import { type ReactNode, type RefObject, useRef } from "react";
import { CallButtons } from "@/components/common/CallButtons";
import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { Lightbox } from "@/components/common/Lightbox";
import { type Photo, venueLabel, wedding } from "@/data/wedding";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useCountdown } from "@/hooks/useCountdown";
import { useLightbox } from "@/hooks/useLightbox";
import { useShare } from "@/hooks/useShare";
import { accountGroups, accountText } from "@/lib/accounts";
import { contactGroups } from "@/lib/contacts";
import { formatWeddingDate } from "@/lib/date";
import { mapLinks } from "@/lib/venue";

/*
 * 앰비언트 계열(하루·창가·별밤·창밖·계절) 공용 블록.
 * 배경 연출(하늘·빛·별·풍경·계절)은 테마가 맡고, 청첩장 정보는 여기서 같은 구조로 그린다.
 * 색·모양은 Tone으로만 바꾼다.
 */

export type Tone = {
  /** 본문 글자색 */
  text: string;
  /** 보조 글자색 */
  soft: string;
  /** 구분선 색 (border-* 클래스) */
  line: string;
  /** 정보 묶음 바탕 (모서리 포함) */
  card: string;
  /** 지도 앱 버튼 (모서리 포함) */
  tile: string;
  /** 작은 버튼: 주소 복사·전화·계좌 복사 */
  chip: string;
  /** 주 버튼 (공유하기) */
  button: string;
  /** 보조 버튼 (링크 복사) */
  ghost: string;
  /** 이름·장소처럼 도드라지는 글자의 글꼴 */
  accent: string;
  /** 사진 모서리 */
  photo: string;
  /** 바탕이 움직여 글이 묻힐 때, 교통 안내 같은 맨 글 묶음에 깔 바탕 (선택) */
  panel?: string;
};

/** 화면 가운데를 지나는 섹션을 따라 배경을 바꾸는 페이지 틀 */
export function AmbientPage<T extends string>({
  initial,
  className,
  backdrop,
  children,
}: {
  initial: T;
  /** 바탕색(오버스크롤 때 보이는 색) 등 */
  className: string;
  backdrop: (active: T) => ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const active = useActiveSection<T>(ref as RefObject<HTMLElement | null>, initial);

  return (
    <main
      ref={ref}
      className={`relative mx-auto min-h-dvh max-w-[480px] overflow-x-clip break-keep [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-current ${className}`}
    >
      {backdrop(active)}
      <div className="relative">{children}</div>
    </main>
  );
}

/** 배경 레이어를 담는 고정 틀 (화면 뒤, 480px 기둥 안) */
export function Backdrop({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-y-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

const { groom, bride } = wedding;

/** 인사말과 두 집안 */
export function GreetingBlock({ tone, photo }: { tone: Tone; photo?: Photo }) {
  return (
    <>
      {photo && (
        <div className={`relative mb-12 aspect-[4/3] overflow-hidden ${tone.photo}`}>
          <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 480px) 86vw, 420px" className="object-cover" />
        </div>
      )}
      <div className={`text-[17px] leading-[2.05] ${tone.accent}`}>
        {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </div>
      <dl className={`mt-12 space-y-3 border-t pt-6 text-sm ${tone.line}`}>
        {[groom, bride].map((person) => (
          <div key={person.name} className="flex flex-wrap items-baseline gap-x-2">
            <dt className={tone.soft}>
              {person.father} · {person.mother}의 {person.order}
            </dt>
            <dd className={`text-lg ${tone.accent}`}>{person.name}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function Countdown() {
  const remaining = useCountdown();
  if (remaining === null) return <p className="h-5" />;
  if (remaining === "started") return <p className="text-sm">예식이 시작되었습니다</p>;
  return (
    <p className="text-sm tabular-nums">
      예식까지 {remaining.days}일 {remaining.hours}시간 {remaining.minutes}분 {remaining.seconds}초
    </p>
  );
}

/** 예식 일시·남은 시간·장소·길찾기·교통 */
export function CeremonyBlock({ tone }: { tone: Tone }) {
  const { venue } = wedding;

  return (
    <>
      <div className={`px-6 py-7 ${tone.card}`}>
        <p className={`text-xl ${tone.accent}`}>{formatWeddingDate()}</p>
        <div className={`mt-2 ${tone.soft}`}>
          <Countdown />
        </div>
        <div className={`mt-6 border-t pt-6 ${tone.line}`}>
          <p className={`text-xl ${tone.accent}`}>{venueLabel}</p>
          {venue.address && <p className={`mt-1 text-sm ${tone.soft}`}>{venue.address}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={venue.address} label="주소 복사" className={`px-3.5 py-2 text-xs ${tone.chip}`} iconClassName="size-3" />
            {venue.tel && (
              <a href={`tel:${venue.tel}`} className={`px-3.5 py-2 text-xs ${tone.chip}`}>
                예식장 전화
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {mapLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-3 text-center text-[13px] transition-transform active:scale-[0.97] ${tone.tile}`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <dl className={`mt-10 space-y-5 text-sm ${tone.panel ? `px-6 py-6 ${tone.panel}` : ""}`}>
        {venue.transport.map((item) => (
          <div key={item.label} className="grid grid-cols-[3.5rem_1fr] gap-3">
            <dt className={tone.accent}>{item.label}</dt>
            <div className={tone.soft}>
              {item.lines.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </>
  );
}

/** 가로로 넘기는 사진들 (섹션 좌우 여백 없이 끝까지) + 크게 보기 */
export function PhotoStrip({ tone, lightboxClassName }: { tone: Tone; lightboxClassName: string }) {
  const photos = wedding.gallery;
  const lightbox = useLightbox(photos.length);
  if (photos.length === 0) return null;

  return (
    <>
      <div className="scrollbar-none flex snap-x snap-mandatory scroll-px-7 gap-3 overflow-x-auto px-7 pb-2">
        {photos.map((photo, i) => (
          <button key={photo.src} type="button" onClick={() => lightbox.open(i)} className="w-[72%] shrink-0 snap-start text-left">
            <span className={`relative block aspect-[4/5] overflow-hidden bg-white/30 ${tone.photo}`}>
              <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 480px) 72vw, 330px" className="object-cover" />
            </span>
            <span className={`mt-3 block text-sm ${tone.soft}`}>{photo.caption}</span>
          </button>
        ))}
      </div>
      <Lightbox
        photos={photos}
        index={lightbox.index}
        onMove={lightbox.move}
        onClose={lightbox.close}
        className={lightboxClassName}
        renderCaption={(photo) => <span>{photo.caption}</span>}
      />
    </>
  );
}

/** 신랑측·신부측 연락처 */
export function ContactBlock({ tone }: { tone: Tone }) {
  return (
    <div className="space-y-3">
      {contactGroups.map((group) => (
        <ul key={group.side} className={`px-5 py-2 ${tone.card}`}>
          {group.rows.map((row) => (
            <li key={row.role} className={`flex items-center justify-between border-b py-3 last:border-0 ${tone.line}`}>
              <span className="text-[15px]">
                <span className={`inline-block w-[4.5rem] text-xs ${tone.soft}`}>
                  {group.label === row.role ? row.role : `${group.label} ${row.role}`}
                </span>
                {row.name}
              </span>
              <CallButtons
                name={row.name}
                phone={row.phone}
                buttonClassName={`flex size-10 items-center justify-center ${tone.chip}`}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** 계좌번호 (펼쳐 보기) */
export function AccountBlock({ tone }: { tone: Tone }) {
  return (
    <div className="space-y-3">
      {accountGroups.map((group) => (
        <details key={group.side} className={`group px-5 ${tone.card}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px]">
            {group.title}
            <Icon name="chevronDown" className="size-4 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ul className={`border-t pb-2 ${tone.line}`}>
            {group.accounts.map((account) => (
              <li key={account.holder} className="flex items-center justify-between gap-3 py-3">
                <div className="text-sm">
                  <p>{account.holder}</p>
                  <p className={`text-xs ${tone.soft}`}>{accountText(account)}</p>
                </div>
                <CopyButton text={accountText(account)} className={`px-3 py-1.5 text-xs ${tone.chip}`} iconClassName="size-3" />
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** 공유하기 · 링크 복사 */
export function ShareBlock({ tone }: { tone: Tone }) {
  const { share, copyLink, copied } = useShare();

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={share}
        className={`flex items-center justify-center gap-1.5 py-3.5 text-sm transition-transform active:scale-[0.97] ${tone.button}`}
      >
        <Icon name="share" />
        공유하기
      </button>
      <button
        type="button"
        onClick={copyLink}
        className={`flex items-center justify-center gap-1.5 py-3.5 text-sm transition-transform active:scale-[0.97] ${tone.ghost}`}
      >
        <Icon name="link" />
        {copied ? "링크를 복사했어요" : "링크 복사"}
      </button>
    </div>
  );
}
