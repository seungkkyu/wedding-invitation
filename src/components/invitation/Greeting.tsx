import { Section } from "@/components/common/Section";
import { wedding, type Person } from "@/data/wedding";

function ParentsLine({ person }: { person: Person }) {
  return (
    <p>
      {person.father} · {person.mother}
      <span className="text-muted">의 {person.order}</span>
      <span className="ml-3 font-serif text-base">{person.name}</span>
    </p>
  );
}

export function Greeting() {
  return (
    <Section eyebrow="Invitation" title="소중한 분들을 초대합니다">
      <div className="text-center font-serif text-[15px] leading-[2.1] text-ink">
        {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </div>
      <div className="mx-auto mt-14 w-fit space-y-3 border-t border-line pt-8 text-center text-[13px] text-ink">
        <ParentsLine person={wedding.groom} />
        <ParentsLine person={wedding.bride} />
      </div>
    </Section>
  );
}
