import { Account } from "./Account";
import { Bgm } from "./Bgm";
import { Calendar } from "./Calendar";
import { Contact } from "./Contact";
import { Cover } from "./Cover";
import { Gallery } from "./Gallery";
import { Greeting } from "./Greeting";
import { Location } from "./Location";
import { Share } from "./Share";
import { Story } from "./Story";

export function Invitation() {
  return (
    <main className="mx-auto min-h-dvh max-w-[480px] bg-paper text-ink shadow-[0_0_40px_rgba(47,42,37,0.08)]">
      <Cover />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Contact />
      <Account />
      <Share />
      <Bgm />
      {/* 하단 플로팅 버튼 + 전체화면 시트 */}
      <Story />
    </main>
  );
}
