import { CopyButton } from "@/components/common/CopyButton";
import { venueLabel, wedding } from "@/data/wedding";
import { mapLinks } from "@/lib/venue";
import { COPY_CLASS, Headline, Label, Page } from "./parts";

export function Location() {
  const { venue } = wedding;

  return (
    <Page id="mag-location" folio={6} kicker="LOCATION">
      <Headline en="Location" ko="오시는 길" />
      <p className="font-headline text-2xl leading-snug font-extrabold text-[#171513]">{venueLabel}</p>
      {venue.address && (
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="text-[13px] leading-6 text-[#171513]/70">{venue.address}</p>
          <CopyButton text={venue.address} label="COPY" copiedLabel="COPIED" className={COPY_CLASS} iconClassName="size-3" />
        </div>
      )}
      {venue.tel && (
        <a href={`tel:${venue.tel}`} className="mt-1 inline-block text-[13px] text-[#171513]/70">
          Tel. {venue.tel}
        </a>
      )}

      <div className="mt-8 grid grid-cols-3 border border-[#171513]">
        {mapLinks.map((link, i) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center gap-0.5 py-3.5 active:bg-[#171513] active:text-white ${
              i > 0 ? "border-l border-[#171513]" : ""
            }`}
          >
            <span className="font-display text-base italic">{link.en}</span>
            <span className="text-[10px] opacity-60">{link.label}</span>
          </a>
        ))}
      </div>

      <dl className="mt-12 space-y-7">
        {venue.transport.map((item, i) => (
          <div key={item.label} className="grid grid-cols-[2.5rem_1fr]">
            <span className="font-display text-2xl leading-none text-[#7a2430] italic lining-nums">{i + 1}</span>
            <div>
              <dt>
                <Label>{item.label}</Label>
              </dt>
              {item.lines.map((line) => (
                <dd key={line} className="mt-1.5 text-[13px] leading-6 text-[#171513]/70">
                  {line}
                </dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </Page>
  );
}
