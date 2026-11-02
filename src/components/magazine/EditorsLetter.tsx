import { wedding, type Person } from "@/data/wedding";
import { parentsOf } from "@/lib/contacts";
import { Headline, Label, Page } from "./parts";

/** 빈 줄을 기준으로 인사말을 문단으로 묶는다 */
function paragraphs(lines: string[]) {
  return lines.reduce<string[][]>(
    (groups, line) => {
      if (line) groups[groups.length - 1].push(line);
      else groups.push([]);
      return groups;
    },
    [[]],
  ).filter((group) => group.length);
}

function ParentsLine({ person }: { person: Person }) {
  return (
    <p className="flex items-baseline justify-between gap-4 py-3">
      <span className="text-[13px] text-[#171513]/70">
        {parentsOf(person)}
        <span className="text-[#171513]/45">의 {person.order}</span>
      </span>
      <span className="font-headline text-base font-bold text-[#171513]">{person.name}</span>
    </p>
  );
}

export function EditorsLetter() {
  const { groom, bride, greeting } = wedding;

  return (
    <Page id="mag-letter" folio={3} kicker="EDITOR'S LETTER">
      <Headline en="Editor's Letter" ko="소중한 분들을 초대합니다" />
      <div className="space-y-6 font-serif text-[15px] leading-[2] text-[#171513]">
        {paragraphs(greeting).map((group, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-headline first-letter:text-[4.4rem] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-[#7a2430]"
                : ""
            }
          >
            {group.map((line, j) => (
              <span key={j}>
                {line}
                {j < group.length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}
      </div>
      <p className="mt-10 text-right font-display text-xl text-[#171513] italic">
        {groom.name.slice(1)} &amp; {bride.name.slice(1)}
      </p>
      <div className="mt-12">
        <Label>Family</Label>
        <div className="mt-3 divide-y divide-[#171513]/15 border-y border-[#171513]/15">
          <ParentsLine person={groom} />
          <ParentsLine person={bride} />
        </div>
      </div>
    </Page>
  );
}
