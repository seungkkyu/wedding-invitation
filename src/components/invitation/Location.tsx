import { CopyButton } from "@/components/common/CopyButton";
import { Section } from "@/components/common/Section";
import { wedding } from "@/data/wedding";

export function Location() {
  const { venue } = wedding;
  const query = encodeURIComponent(venue.name);

  const mapLinks = [
    { label: "네이버 지도", href: `https://map.naver.com/p/search/${query}` },
    { label: "카카오맵", href: `https://map.kakao.com/link/search/${query}` },
    { label: "티맵", href: `tmap://search?name=${query}` },
  ];

  return (
    <Section eyebrow="Location" title="오시는 길">
      <div className="text-center">
        <p className="font-serif text-lg text-ink">
          {venue.name} {venue.hall}
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted">
          <span>{venue.address}</span>
          <CopyButton text={venue.address} />
        </div>
        <a href={`tel:${venue.tel}`} className="mt-1 inline-block text-sm text-muted underline-offset-2">
          Tel. {venue.tel}
        </a>
      </div>

      {/* TODO: 카카오/네이버 지도 SDK 연동 */}
      <div className="mt-8 flex aspect-4/3 items-center justify-center bg-[#e8e1d6] font-display text-sm text-muted italic">
        Map
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-x border-b border-line">
        {mapLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 text-center text-xs text-ink active:bg-line/40"
          >
            {link.label}
          </a>
        ))}
      </div>

      <dl className="mt-12 divide-y divide-line border-y border-line text-[13px]">
        {venue.transport.map((item) => (
          <div key={item.label} className="grid grid-cols-[4.5rem_1fr] py-4">
            <dt className="font-serif text-ink">{item.label}</dt>
            <div className="space-y-1 text-muted">
              {item.lines.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
