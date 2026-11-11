import { CopyButton } from "@/components/common/CopyButton";
import { PixelSection, PixelWindow } from "@/components/pixel/PixelSection";
import { venueLabel, wedding } from "@/data/wedding";
import { mapLinks } from "@/lib/venue";

export function Location() {
  const { venue } = wedding;

  return (
    <PixelSection title="오시는 길">
      <div className="text-center font-pixel">
        <p className="text-base text-ink">{venueLabel}</p>
        {venue.address && (
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted">
            <span>{venue.address}</span>
            <CopyButton text={venue.address} className="text-xs text-accent" />
          </div>
        )}
        {venue.tel && (
          <a href={`tel:${venue.tel}`} className="mt-1 inline-block text-xs text-muted">
            Tel. {venue.tel}
          </a>
        )}
      </div>

      {/* TODO: 카카오/네이버 지도 SDK 연동 */}
      <PixelWindow className="mt-8 flex aspect-4/3 items-center justify-center font-pixel text-xs text-muted">
        Map
      </PixelWindow>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {mapLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center bg-ivory text-center font-pixel text-xs text-ink pixel-btn [--pixel-border:var(--color-control)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <dl className="mt-10 space-y-5 font-pixel text-[13px]">
        {venue.transport.map((item) => (
          <div key={item.label} className="grid grid-cols-[4.5rem_1fr]">
            <dt className="text-accent">▸ {item.label}</dt>
            <div className="space-y-1 leading-6 text-muted">
              {item.lines.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          </div>
        ))}
      </dl>
    </PixelSection>
  );
}
