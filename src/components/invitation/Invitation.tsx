import { Account } from "./Account";
import { Bgm } from "./Bgm";
import { Calendar } from "./Calendar";
import { Contact } from "./Contact";
import { Cover } from "./Cover";
import { Farewell } from "./Farewell";
import { Gallery } from "./Gallery";
import { Greeting } from "./Greeting";
import { Location } from "./Location";
import { Share } from "./Share";
import { Story } from "./Story";

export function Invitation() {
  return (
    <main className="theme-pixel pixel-focus mx-auto min-h-dvh max-w-[480px] overflow-x-clip text-ink">
      <Cover />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Contact />
      <Account />
      <Farewell />
      <Share />
      <Bgm />
      {/* 하단 플로팅 버튼 + 전체화면 시트 */}
      <Story />
    </main>
  );
}
