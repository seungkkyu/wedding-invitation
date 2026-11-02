import type { ReactNode } from "react";
import { wedding, type Person } from "@/data/wedding";
import { parentsOf } from "@/lib/contacts";
import { FILM, Reveal, SceneTitle } from "./parts";

function CreditRow({ role, name }: { role: string; name: string }) {
  return (
    <p className="grid grid-cols-2 items-baseline gap-x-5">
      <span className={`text-right font-typewriter text-[11px] leading-5 tracking-[0.12em] ${FILM.muted}`}>{role}</span>
      <span className={`font-serif text-lg ${FILM.cream}`}>{name}</span>
    </p>
  );
}

function CreditBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Reveal>
      <p className={`mb-5 text-center font-typewriter text-[10px] tracking-[0.4em] ${FILM.amber}`}>{heading}</p>
      <div className="space-y-3">{children}</div>
    </Reveal>
  );
}

const parents = (person: Person) => `${parentsOf(person)}의 ${person.order}`;

/** SCENE 02: 영화 엔딩 크레딧처럼 주연과 혼주를 소개 */
export function Credits() {
  const { groom, bride } = wedding;

  return (
    <section className="px-8 py-24">
      <SceneTitle no="02" en="STARRING" title="함께 걸어갈 두 사람" />
      <div className="space-y-14">
        <CreditBlock heading="STARRING">
          <CreditRow role="GROOM · 신랑" name={groom.name} />
          <CreditRow role="BRIDE · 신부" name={bride.name} />
        </CreditBlock>
        <CreditBlock heading="PRODUCED BY">
          <CreditRow role={parents(groom)} name={groom.name} />
          <CreditRow role={parents(bride)} name={bride.name} />
        </CreditBlock>
        <CreditBlock heading="SPECIAL THANKS TO">
          <p className={`text-center font-serif text-[15px] leading-7 ${FILM.cream}`}>
            귀한 걸음 해주실
            <br />
            소중한 여러분
          </p>
        </CreditBlock>
      </div>
    </section>
  );
}
