import { Accounts } from "./Accounts";
import { BackCover } from "./BackCover";
import { Contents } from "./Contents";
import { Contributors } from "./Contributors";
import { Cover } from "./Cover";
import { Details } from "./Details";
import { EditorsLetter } from "./EditorsLetter";
import { Feature } from "./Feature";
import { Location } from "./Location";

/** 매거진 버전: 패션 잡지 한 권처럼 넘겨 보는 에디토리얼 청첩장 */
export function MagazineInvitation() {
  return (
    <main className="mx-auto min-h-dvh max-w-[480px] bg-[#f4f1ec] text-[#171513] shadow-[0_0_40px_rgba(0,0,0,0.1)]">
      <Cover />
      <Contents />
      <EditorsLetter />
      <Feature />
      <Details />
      <Location />
      <Contributors />
      <Accounts />
      <BackCover />
    </main>
  );
}
