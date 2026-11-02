import { type Person, wedding } from "@/data/wedding";
import { parentsOf } from "@/lib/contacts";
import { Page, Tape } from "./parts";

// 위쪽이 찢긴 노트 한 장
const TORN_TOP =
  "[clip-path:polygon(0_10px,4%_3px,9%_9px,14%_2px,19%_8px,25%_1px,31%_7px,36%_2px,42%_9px,48%_3px,54%_8px,60%_1px,66%_7px,71%_2px,77%_9px,83%_3px,88%_8px,94%_2px,100%_8px,100%_100%,0_100%)]";

function ParentsLine({ person }: { person: Person }) {
  return (
    <p>
      <span className="text-ink/60">
        {parentsOf(person)}의 {person.order}
      </span>
      <span className="ml-2 text-[1.7rem] text-ink">{person.name}</span>
    </p>
  );
}

export function Greeting() {
  return (
    <Page no="01" title="초대합니다">
      <div className="relative mx-auto max-w-[360px] -rotate-1 drop-shadow-[0_10px_14px_rgba(80,60,30,0.16)]">
        <Tape tone="yellow" className="absolute -top-2 left-1/2 z-10 w-28 -translate-x-1/2 rotate-2" />
        {/* 줄 간격(32px)과 글줄 높이(leading-8)를 맞춰 글씨가 줄 위에 앉게 한다 */}
        <div
          className={`relative bg-[#fffdf6] bg-[repeating-linear-gradient(transparent_0_31px,rgba(120,160,205,0.32)_31px_32px)] bg-[position:0_48px] px-7 pt-12 pb-9 ${TORN_TOP}`}
        >
          <span aria-hidden className="absolute inset-y-0 left-5 border-l border-[#e9a0a0]/70" />
          <div className="text-center font-hand text-[1.55rem] leading-8 text-ink">
            {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <p key={i}>&nbsp;</p>))}
          </div>
          <div className="mt-8 space-y-1 text-center font-hand text-[1.35rem] leading-8">
            <ParentsLine person={wedding.groom} />
            <ParentsLine person={wedding.bride} />
          </div>
        </div>
      </div>
    </Page>
  );
}
