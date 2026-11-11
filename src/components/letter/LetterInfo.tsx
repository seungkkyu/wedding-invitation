"use client";

import { CallButtons } from "@/components/common/CallButtons";
import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { venueLabel, wedding } from "@/data/wedding";
import { useShare } from "@/hooks/useShare";
import { accountGroups, accountText } from "@/lib/accounts";
import { contactGroups } from "@/lib/contacts";
import { mapLinks } from "@/lib/venue";
import { LetterSection, Sprig } from "./Ornament";

const CHIP_CLASS = "rounded-full bg-[#f4e6e0] px-3 py-1 text-[11px] text-[#a8695e]";

export function LetterLocation() {
  const { venue } = wedding;

  return (
    <LetterSection script="Location" title="오시는 길">
      <div className="rounded-t-[999px] rounded-b-[2rem] bg-white/55 px-6 pt-16 pb-8 text-center ring-1 ring-[#eadfd3]">
        <Icon name="pin" className="mx-auto size-6 text-[#b7867a]" />
        <p className="mt-4 font-serif text-lg text-[#4a3f3a]">{venueLabel}</p>
        {venue.address && (
          <div className="mt-3 flex flex-col items-center gap-2.5 text-[13px] text-[#8f8078]">
            <span>{venue.address}</span>
            <CopyButton text={venue.address} label="주소 복사" className={CHIP_CLASS} iconClassName="size-3" />
          </div>
        )}
        {venue.tel && (
          <a href={`tel:${venue.tel}`} className="mt-3 inline-block font-garamond text-sm text-[#8f8078] italic">
            Tel. {venue.tel}
          </a>
        )}
        <div className="mt-8 grid grid-cols-3 gap-2">
          {mapLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#e3d3c7] py-2.5 text-xs text-[#6f625b] active:bg-[#f4e6e0]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <dl className="mt-10 space-y-6 px-2 text-[13px]">
        {venue.transport.map((item) => (
          <div key={item.label}>
            <dt className="flex items-center gap-2 font-serif text-[#4a3f3a]">
              <span className="size-1.5 rounded-full bg-[#a3ad97]" />
              {item.label}
            </dt>
            <div className="mt-1.5 space-y-0.5 pl-3.5 text-[#8f8078]">
              {item.lines.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </LetterSection>
  );
}

export function LetterContact() {
  return (
    <LetterSection script="Contact" title="연락하기">
      <div className="space-y-4">
        {contactGroups.map((group) => (
          <div key={group.side} className="rounded-[1.75rem] bg-white/60 px-5 pt-5 pb-2 ring-1 ring-[#eadfd3]">
            <h3 className="font-garamond text-sm tracking-[0.3em] text-[#b7867a] italic">{group.label}측</h3>
            <ul className="mt-1 divide-y divide-[#f0e6dd]">
              {group.rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between py-3">
                  <span className="text-sm text-[#4a3f3a]">
                    <span className="inline-block w-12 text-xs text-[#a99a90]">{row.role}</span>
                    {row.name}
                  </span>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    className="flex gap-2 text-[#b7867a]"
                    buttonClassName="flex size-9 items-center justify-center rounded-full bg-[#f4e6e0]"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </LetterSection>
  );
}

export function LetterAccount() {
  return (
    <LetterSection script="With Gratitude" title="마음 전하실 곳">
      <p className="-mt-4 mb-10 text-center font-serif text-[13px] leading-7 text-[#8f8078]">
        직접 축하해 주시기 어려운 분들을 위해
        <br />
        계좌번호를 함께 적어 둡니다.
      </p>
      <div className="space-y-3">
        {accountGroups.map((group) => (
          <details key={group.side} className="group rounded-[1.75rem] bg-white/60 px-5 ring-1 ring-[#eadfd3]">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-sm text-[#4a3f3a]">
              {group.title}
              <Icon name="chevronDown" className="size-4 text-[#b7867a] transition-transform group-open:rotate-180" />
            </summary>
            <ul className="divide-y divide-[#f0e6dd] border-t border-[#f0e6dd] pb-2">
              {group.accounts.map((account) => (
                <li key={account.holder} className="flex items-center justify-between gap-3 py-3">
                  <div className="text-sm">
                    <p className="text-[#4a3f3a]">{account.holder}</p>
                    <p className="text-xs text-[#a99a90]">{accountText(account)}</p>
                  </div>
                  <CopyButton text={accountText(account)} className={CHIP_CLASS} iconClassName="size-3" />
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </LetterSection>
  );
}

export function LetterClosing() {
  const { share, copyLink, copied } = useShare();

  return (
    <footer className="px-8 pt-10 pb-28 text-center">
      <Sprig className="mx-auto" />
      <p className="mt-10 font-script text-[2.6rem] leading-none text-[#b7867a]">With love,</p>
      <p className="mt-4 font-serif text-base text-[#4a3f3a]">
        {wedding.groom.name} <span className="font-script text-lg text-[#b7867a]">&amp;</span> {wedding.bride.name}
      </p>
      <p className="mt-4 font-serif text-[13px] leading-7 text-[#8f8078]">
        귀한 시간 내어 읽어 주셔서 고맙습니다.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-1.5 rounded-full bg-[#b7867a] py-3.5 text-[13px] text-white"
        >
          <Icon name="share" />
          공유하기
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="flex items-center justify-center gap-1.5 rounded-full border border-[#d9c3b8] py-3.5 text-[13px] text-[#6f625b]"
        >
          <Icon name="link" />
          {copied ? "복사되었습니다" : "링크 복사"}
        </button>
      </div>
    </footer>
  );
}
