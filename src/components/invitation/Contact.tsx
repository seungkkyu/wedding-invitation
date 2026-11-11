import { CallButtons } from "@/components/common/CallButtons";
import { PixelSection, PixelWindow } from "@/components/pixel/PixelSection";
import { contactGroups } from "@/lib/contacts";

export function Contact() {
  return (
    <PixelSection title="연락하기">
      <div className="space-y-8">
        {contactGroups.map((group) => (
          <PixelWindow key={group.side} className="px-5 pt-4 pb-2 font-pixel">
            <h3 className="text-sm text-accent">{group.label}측</h3>
            <ul className="mt-2 divide-y-2 divide-dashed divide-line">
              {group.rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between py-3">
                  <span className="text-sm text-ink">
                    <span className="inline-block w-12 text-xs text-muted">{row.role}</span>
                    {row.name}
                  </span>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    className="flex gap-3 text-ink"
                    buttonClassName="flex size-11 items-center justify-center bg-night pixel-btn [--pixel-border:var(--color-control)]"
                    iconClassName="size-4"
                  />
                </li>
              ))}
            </ul>
          </PixelWindow>
        ))}
      </div>
    </PixelSection>
  );
}
