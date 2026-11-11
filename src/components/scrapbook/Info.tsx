"use client";

import { CallButtons } from "@/components/common/CallButtons";
import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { type BankAccount, venueLabel, wedding } from "@/data/wedding";
import { useShare } from "@/hooks/useShare";
import { contactGroups } from "@/lib/contacts";
import { mapLinks } from "@/lib/venue";
import { HeartSticker, Page, Polaroid, Tape } from "./parts";

const STICKER_TINTS = ["bg-[#fbd3cc] -rotate-2", "bg-[#cfe7dc] rotate-1", "bg-[#d6e2f3] -rotate-1"];
const COPY_CHIP = "rounded-full bg-[#fbe3a0] px-2.5 py-0.5 text-[11px] text-ink";

/** 오시는 길: 입장권처럼 생긴 카드 + 손글씨 체크리스트 */
export function Location() {
  const { venue } = wedding;

  return (
    <Page no="04" title="오시는 길">
      <div className="relative bg-[#fffefb] shadow-[0_12px_26px_-14px_rgba(70,50,25,0.5)]">
        <Tape tone="mint" className="absolute -top-3 -left-2 z-10 w-20 -rotate-[20deg]" />
        <div className="px-6 pt-8 pb-6 text-center">
          <p className="font-hand-en text-lg tracking-widest text-ink/45">ADMIT TWO ♥</p>
          <p className="mt-1 font-hand text-[2.1rem] leading-tight text-ink">{venueLabel}</p>
          {venue.address && (
            <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13px] text-ink/70">
              {venue.address}
              <CopyButton text={venue.address} label="주소 복사" icon={false} className={COPY_CHIP} />
            </p>
          )}
          {venue.tel && (
            <a href={`tel:${venue.tel}`} className="mt-2 inline-block text-[13px] text-ink/60 underline underline-offset-2">
              Tel. {venue.tel}
            </a>
          )}
        </div>

        {/* 절취선: 양쪽에 반원 홈 */}
        <div aria-hidden className="relative h-0 border-t-2 border-dashed border-ink/20">
          <span className="absolute -top-3 -left-3 size-6 rounded-full bg-[#f4ecdd]" />
          <span className="absolute -top-3 -right-3 size-6 rounded-full bg-[#f4ecdd]" />
        </div>

        <div className="grid grid-cols-3 gap-2.5 px-5 py-5">
          {mapLinks.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl py-2.5 text-center shadow-[0_3px_0_rgba(70,50,25,0.12)] active:translate-y-px ${STICKER_TINTS[i % STICKER_TINTS.length]}`}
            >
              <span className="block font-hand-en text-lg leading-none text-ink">{link.en}</span>
              <span className="mt-1 block text-[11px] text-ink/60">{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <ul className="mt-10 space-y-5">
        {venue.transport.map((item) => (
          <li key={item.label} className="flex gap-3">
            <span aria-hidden className="mt-1 flex size-5 shrink-0 items-center justify-center rounded border-2 border-ink/60 font-hand text-lg leading-none text-[#e0675a]">
              ✓
            </span>
            <div>
              <p className="font-hand text-[1.6rem] leading-none text-ink">{item.label}</p>
              {item.lines.map((line) => (
                <p key={line} className="mt-1.5 text-[13px] text-ink/65">
                  {line}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}

/** 연락처: 줄 그어진 인덱스 카드 두 장 */
export function Contact() {
  return (
    <Page no="05" title="연락하기">
      <div className="space-y-8">
        {contactGroups.map((group, gi) => (
          <div
            key={group.side}
            className={`border-t-4 border-[#e9a0a0] bg-[#fffefb] bg-[repeating-linear-gradient(transparent_0_51px,rgba(120,160,205,0.28)_51px_52px)] bg-[position:0_56px] px-5 pt-3 pb-1 shadow-[0_10px_22px_-14px_rgba(70,50,25,0.5)] ${gi % 2 ? "rotate-1" : "-rotate-1"}`}
          >
            <p className="flex h-11 items-center gap-1.5 font-hand text-[1.7rem] text-ink">
              {group.label}측
              <HeartSticker className={`size-4 ${gi % 2 ? "text-[#e9a0a0]" : "text-[#9ccbb8]"}`} />
            </p>
            <ul>
              {group.rows.map((row) => (
                <li key={row.role} className="flex h-[52px] items-center justify-between">
                  <span className="flex items-baseline gap-3">
                    <span className="w-10 text-xs text-ink/50">{row.role}</span>
                    <span className="font-hand text-[1.6rem] text-ink">{row.name}</span>
                  </span>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    buttonClassName="flex size-9 items-center justify-center rounded-full border-2 border-dashed border-ink/25 text-ink/70 active:bg-ink/5"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Page>
  );
}

/** 봉투 모양 계좌 주머니 */
function Envelope({ title, accounts, tone }: { title: string; accounts: BankAccount[]; tone: string }) {
  return (
    <details className={`group relative ${tone} shadow-[0_10px_20px_-14px_rgba(70,50,25,0.5)]`}>
      <summary className="relative flex h-16 cursor-pointer list-none items-center justify-between overflow-hidden px-5">
        {/* 봉투 덮개 */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-full bg-white/35 [clip-path:polygon(0_0,100%_0,50%_70%)]" />
        <span className="relative font-hand text-[1.6rem] text-ink">{title}</span>
        <span className="relative flex items-center gap-2">
          <HeartSticker className="size-6 text-[#e0675a]" />
          <Icon name="chevronDown" className="size-4 text-ink/50 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <ul className="mx-3 mb-3 divide-y divide-dashed divide-ink/15 bg-[#fffefb] px-4">
        {accounts.map((account) => (
          <li key={`${account.holder}-${account.number}`} className="flex items-center justify-between py-3">
            <div>
              <p className="font-hand text-[1.4rem] leading-none text-ink">{account.holder}</p>
              <p className="mt-1 text-xs text-ink/60">
                {account.bank} {account.number}
              </p>
            </div>
            <CopyButton text={`${account.bank} ${account.number}`} icon={false} className={COPY_CHIP} />
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Accounts() {
  return (
    <Page no="06" title="마음 전하실 곳">
      <p className="-mt-4 mb-8 text-center font-hand text-[1.4rem] leading-8 text-ink/65">
        멀리서도 축하해 주시는 마음,
        <br />
        소중히 간직할게요.
      </p>
      <div className="space-y-4">
        <Envelope title="신랑측 계좌번호" accounts={wedding.accounts.groom} tone="bg-[#f6e0cf]" />
        <Envelope title="신부측 계좌번호" accounts={wedding.accounts.bride} tone="bg-[#f3d9de]" />
      </div>
    </Page>
  );
}

/** 마지막 장: to be continued… */
export function Ending() {
  const { share, copyLink, copied } = useShare();
  const lastPhoto = wedding.gallery.at(-1);
  const { groom, bride } = wedding;

  return (
    <section className="px-6 pt-16 pb-28 text-center">
      {lastPhoto && (
        <div className="relative mx-auto w-[46%] rotate-3">
          <Tape tone="yellow" className="absolute -top-3 left-1/2 z-10 w-20 -translate-x-1/2 -rotate-6" />
          <Polaroid photo={lastPhoto} sizes="200px" />
        </div>
      )}
      <p className="mt-10 font-hand-en text-[2.8rem] leading-none font-semibold text-ink">to be continued…</p>
      <p className="mt-4 font-hand text-[1.5rem] leading-8 text-ink/70">
        다음 페이지는 여러분과 함께 채워 갈게요.
        <br />
        와 주셔서 고마워요!
      </p>
      <p className="mt-4 font-hand text-[1.5rem] text-ink">
        {groom.name} <span className="text-[#e0675a]">♥</span> {bride.name}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#fee500] py-3.5 text-[13px] text-[#191919] shadow-[0_3px_0_rgba(70,50,25,0.15)]"
        >
          <Icon name="share" />
          카카오톡 공유
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-ink/30 bg-[#fffefb] py-3.5 text-[13px] text-ink"
        >
          <Icon name="link" />
          {copied ? "복사했어요" : "링크 복사"}
        </button>
      </div>
    </section>
  );
}
