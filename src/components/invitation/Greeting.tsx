import { Section } from "@/components/common/Section";
import { wedding, type Person } from "@/data/wedding";

function ParentsLine({ person, role }: { person: Person; role: string }) {
  return (
    <p>
      {person.father} · {person.mother}
      <span className="text-muted">의 {person.order}</span> <span className="text-xs text-muted">{role}</span>{" "}
      <span className="font-medium">{person.name}</span>
    </p>
  );
}

export function Greeting() {
  return (
    <Section eyebrow="Invitation" title="소중한 분들을 초대합니다">
      <div className="text-center font-serif text-[15px] leading-8 text-ink">
        {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </div>
      <div className="mt-12 space-y-2 text-center text-sm text-ink">
        <ParentsLine person={wedding.groom} role="신랑" />
        <ParentsLine person={wedding.bride} role="신부" />
      </div>
    </Section>
  );
}
