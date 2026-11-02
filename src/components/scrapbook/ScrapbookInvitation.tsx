import { Cover } from "./Cover";
import { Greeting } from "./Greeting";
import { Accounts, Contact, Ending, Location } from "./Info";
import { CutLine } from "./parts";
import { PhotoStack } from "./PhotoStack";
import { Planner } from "./Planner";

/** 스크랩북 버전: 크래프트지 위에 폴라로이드·마스킹테이프·손글씨로 꾸민 커플 다이어리 */
export function ScrapbookInvitation() {
  return (
    <main className="relative mx-auto min-h-dvh max-w-[480px] overflow-x-clip bg-[#f4ecdd] bg-[radial-gradient(rgba(120,95,60,0.17)_1px,transparent_1.4px)] bg-[length:20px_20px] text-ink shadow-[0_0_40px_rgba(47,42,37,0.12)]">
      <Cover />
      <CutLine />
      <Greeting />
      <CutLine />
      <PhotoStack />
      <CutLine />
      <Planner />
      <CutLine />
      <Location />
      <CutLine />
      <Contact />
      <CutLine />
      <Accounts />
      <CutLine />
      <Ending />
    </main>
  );
}
