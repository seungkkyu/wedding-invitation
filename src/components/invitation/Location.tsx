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
        <p className="font-medium text-ink">
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
      <div className="mt-6 flex aspect-[4/3] items-center justify-center bg-stone-200 text-sm text-stone-400">
        MAP
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {mapLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-stone-300 py-2 text-center text-xs text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>

      <dl className="mt-10 space-y-6 text-sm">
        {venue.transport.map((item) => (
          <div key={item.label}>
            <dt className="font-medium text-ink">{item.label}</dt>
            {item.lines.map((line) => (
              <dd key={line} className="mt-1 text-muted">
                {line}
              </dd>
            ))}
          </div>
        ))}
      </dl>
    </Section>
  );
}
