"use client";

import { CallButtons } from "@/components/common/CallButtons";
import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { venueLabel, wedding } from "@/data/wedding";
import { accountGroups, accountText } from "@/lib/accounts";
import { contactGroups } from "@/lib/contacts";
import { mapLinks } from "@/lib/venue";
import { FILM, Reveal, SceneTitle } from "./parts";

const COPY_CLASS = `font-typewriter text-[11px] tracking-[0.1em] ${FILM.amber}`;

/** SCENE 05: 오시는 길 */
export function FilmLocation() {
  const { venue } = wedding;

  return (
    <section className="px-8 py-24">
      <SceneTitle no="05" en="LOCATION" title="오시는 길" />
      <Reveal className="text-center">
        <p className={`font-serif text-xl ${FILM.cream}`}>{venueLabel}</p>
        {venue.address && (
          <div className={`mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm ${FILM.muted}`}>
            <span>{venue.address}</span>
            <CopyButton text={venue.address} className={COPY_CLASS} />
          </div>
        )}
        {venue.tel && (
          <a href={`tel:${venue.tel}`} className={`mt-1 inline-block font-typewriter text-xs ${FILM.muted}`}>
            TEL. {venue.tel}
          </a>
        )}
      </Reveal>

      <Reveal className={`mt-10 grid grid-cols-3 divide-x border ${FILM.line} divide-[#efe6d6]/12`}>
        {mapLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-3.5 text-center text-xs ${FILM.cream} active:bg-white/5`}
          >
            {link.label}
          </a>
        ))}
      </Reveal>

      <Reveal>
        <dl className={`mt-12 divide-y border-y text-[13px] ${FILM.line} divide-[#efe6d6]/12`}>
          {venue.transport.map((item) => (
            <div key={item.label} className="grid grid-cols-[4.5rem_1fr] py-4">
              <dt className={`font-serif ${FILM.cream}`}>{item.label}</dt>
              <div className={`space-y-1 ${FILM.muted}`}>
                {item.lines.map((line) => (
                  <dd key={line}>{line}</dd>
                ))}
              </div>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

/** SCENE 06: 연락하기 */
export function FilmCast() {
  return (
    <section className="px-8 py-24">
      <SceneTitle no="06" en="CAST" title="연락하기" />
      <div className="space-y-12">
        {contactGroups.map((group) => (
          <Reveal key={group.side}>
            <h3 className={`flex items-baseline justify-between border-b pb-2 ${FILM.line}`}>
              <span className={`font-cinema text-lg tracking-[0.2em] ${FILM.cream}`}>
                {group.en.toUpperCase()}&apos;S SIDE
              </span>
              <span className={`font-serif text-xs ${FILM.muted}`}>{group.label}측</span>
            </h3>
            <ul className="divide-y divide-[#efe6d6]/8">
              {group.rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between py-3.5">
                  <span className={`text-sm ${FILM.cream}`}>
                    <span className={`inline-block w-16 font-typewriter text-[10px] tracking-[0.15em] ${FILM.muted}`}>
                      {row.role}
                    </span>
                    {row.name}
                  </span>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    className={`flex gap-2 ${FILM.amber}`}
                    buttonClassName="flex size-9 items-center justify-center rounded-full border border-[#d9913a]/35"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** SCENE 07: 마음 전하실 곳 */
export function FilmAccount() {
  return (
    <section className="px-8 py-24">
      <SceneTitle no="07" en="WITH HEART" title="마음 전하실 곳" />
      <Reveal>
        <p className={`-mt-4 mb-10 text-center text-[13px] leading-6 ${FILM.muted}`}>
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 함께 적어 두었습니다.
        </p>
        <div className={`border-t ${FILM.line}`}>
          {accountGroups.map((group) => (
            <details key={group.side} className={`group border-b ${FILM.line}`}>
              <summary
                className={`flex cursor-pointer list-none items-center justify-between py-4 font-serif text-sm ${FILM.cream}`}
              >
                {group.title}
                <Icon name="chevronDown" className={`size-4 ${FILM.muted} transition-transform group-open:rotate-180`} />
              </summary>
              <ul className="divide-y divide-[#efe6d6]/8 pb-2">
                {group.accounts.map((account) => (
                  <li key={account.holder} className="flex items-center justify-between py-3">
                    <div className="text-sm">
                      <p className={FILM.cream}>{account.holder}</p>
                      <p className={`font-typewriter text-xs ${FILM.muted}`}>{accountText(account)}</p>
                    </div>
                    <CopyButton text={accountText(account)} className={COPY_CLASS} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
