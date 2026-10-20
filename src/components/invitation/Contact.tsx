import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { wedding, type Person } from "@/data/wedding";

function ContactRow({ label, name, phone }: { label: string; name: string; phone: string }) {
  return (
    <li className="flex items-center justify-between py-3.5">
      <span className="text-sm text-ink">
        <span className="inline-block w-12 text-xs text-muted">{label}</span>
        {name}
      </span>
      <span className="flex gap-2 text-accent">
        <a href={`tel:${phone}`} aria-label={`${name}에게 전화`} className="flex size-9 items-center justify-center rounded-full border border-line">
          <Icon name="phone" />
        </a>
        <a href={`sms:${phone}`} aria-label={`${name}에게 문자`} className="flex size-9 items-center justify-center rounded-full border border-line">
          <Icon name="message" />
        </a>
      </span>
    </li>
  );
}

function ContactGroup({ side, person }: { side: string; person: Person }) {
  return (
    <div>
      <h3 className="border-b border-ink/70 pb-2 font-serif text-sm text-ink">{side}측</h3>
      <ul className="divide-y divide-line">
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
      <div className="space-y-10">
        <ContactGroup side="신랑" person={wedding.groom} />
        <ContactGroup side="신부" person={wedding.bride} />
      </div>
    </Section>
  );
}
