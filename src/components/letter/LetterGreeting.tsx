import Image from "next/image";
import { type Person, secondaryPhoto, wedding } from "@/data/wedding";
import { parentsOf } from "@/lib/contacts";
import { LetterSection, Sprig } from "./Ornament";

function ParentsLine({ person }: { person: Person }) {
  return (
    <p>
      {parentsOf(person)}
      <span className="text-[#a99a90]">의 {person.order}</span>
      <span className="ml-3 font-serif text-[15px] text-[#4a3f3a]">{person.name}</span>
    </p>
  );
}

/** 흐릿한 사진 위에 반투명 종이(벨럼)를 한 장 덧댄 인사말 */
export function LetterGreeting() {
  const backdrop = secondaryPhoto;

  return (
    <div className="relative overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop.src}
          alt=""
          fill
          sizes="480px"
          className="scale-125 object-cover opacity-45 blur-2xl"
          aria-hidden
        />
      )}
      <LetterSection script="Invitation" title="초대합니다" className="relative">
        <div className="rounded-[2rem] bg-white/55 px-6 py-12 text-center shadow-[0_20px_50px_-30px_rgba(90,60,40,0.4)] ring-1 ring-white/80 backdrop-blur-md">
          <div className="font-serif text-[15px] leading-[2.2] text-[#4a3f3a]">
            {wedding.greeting.map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
          </div>
          <Sprig className="mx-auto mt-10" />
          <div className="mt-8 space-y-3 text-[13px] text-[#6f625b]">
            <ParentsLine person={wedding.groom} />
            <ParentsLine person={wedding.bride} />
          </div>
        </div>
      </LetterSection>
    </div>
  );
}
