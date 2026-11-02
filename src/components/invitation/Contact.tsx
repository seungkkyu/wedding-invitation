import { CallButtons } from "@/components/common/CallButtons";
import { Section } from "@/components/common/Section";
import { contactGroups } from "@/lib/contacts";

export function Contact() {
  return (
    <Section eyebrow="Contact" title="연락하기">
      <div className="space-y-10">
        {contactGroups.map((group) => (
          <div key={group.side}>
            <h3 className="border-b border-ink/70 pb-2 font-serif text-sm text-ink">{group.label}측</h3>
            <ul className="divide-y divide-line">
              {group.rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between py-3.5">
                  <span className="text-sm text-ink">
                    <span className="inline-block w-12 text-xs text-muted">{row.role}</span>
                    {row.name}
                  </span>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    className="flex gap-2 text-accent"
                    buttonClassName="flex size-9 items-center justify-center rounded-full border border-line"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
