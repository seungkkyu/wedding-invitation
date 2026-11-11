import { PixelSection, PixelWindow } from "@/components/pixel/PixelSection";
import { wedding, type Person } from "@/data/wedding";
import { parentsOf } from "@/lib/contacts";

function ParentsLine({ person }: { person: Person }) {
  return (
    <p>
      {parentsOf(person)}
      <span className="text-muted">의 {person.order}</span>
      <span className="ml-3 text-accent">{person.name}</span>
    </p>
  );
}

/** 인사말: RPG 대화창처럼 화자 이름표 + 다음 줄 표시(▼) */
export function Greeting() {
  const { groom, bride } = wedding;

  return (
    <PixelSection title="소중한 분들을 초대합니다">
      <div className="relative pt-4">
        <span className="absolute top-0 left-4 z-10 bg-accent px-3 py-1 font-pixel text-xs text-night pixel-box [--pixel-border:var(--color-accent)]">
          {groom.name.slice(1)} &amp; {bride.name.slice(1)}
        </span>
        <PixelWindow className="relative px-6 pt-8 pb-9">
          <div className="text-center font-pixel text-[14px] leading-[2.1] text-ink">
            {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
          </div>
          <span aria-hidden className="absolute right-5 bottom-3 animate-twinkle font-pixel text-xs text-accent">
            ▼
          </span>
        </PixelWindow>
      </div>
      <div className="mx-auto mt-12 w-fit space-y-3 text-center font-pixel text-[13px] text-ink">
        <ParentsLine person={groom} />
        <ParentsLine person={bride} />
      </div>
    </PixelSection>
  );
}
