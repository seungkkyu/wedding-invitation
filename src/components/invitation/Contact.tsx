import { Section } from "@/components/common/Section";
import { wedding, type Person } from "@/data/wedding";

function ContactRow({ label, name, phone }: { label: string; name: string; phone: string }) {
  return (
    <li className="flex items-center justify-between py-3">
      <span className="text-sm text-ink">
        <span className="mr-2 text-xs text-muted">{label}</span>
        {name}
      </span>
      <span className="flex gap-2">
        <a href={`tel:${phone}`} className="rounded-full border border-stone-300 px-3 py-1 text-xs text-ink">
          전화
        </a>
        <a href={`sms:${phone}`} className="rounded-full border border-stone-300 px-3 py-1 text-xs text-ink">
          문자
        </a>
      </span>
    </li>
  );
}

function ContactGroup({ side, person }: { side: string; person: Person }) {
  return (
    <div>
      <h3 className="mb-1 text-xs tracking-widest text-accent">{side}측</h3>
      <ul className="divide-y divide-stone-200">
        <ContactRow label={side} name={person.name} phone={person.phone} />
        <ContactRow label="아버지" name={person.father} phone={person.fatherPhone} />
        <ContactRow label="어머니" name={person.mother} phone={person.motherPhone} />
      </ul>
    </div>
  );
}

export function Contact() {
  return (
    <Section eyebrow="Contact" title="연락하기">
      <div className="space-y-8">
        <ContactGroup side="신랑" person={wedding.groom} />
        <ContactGroup side="신부" person={wedding.bride} />
      </div>
    </Section>
  );
}
