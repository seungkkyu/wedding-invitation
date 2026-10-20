import type { Outfit } from "@/data/wedding";
import { PixelSprite } from "./PixelSprite";
import {
  BRIDE_FRAMES,
  BRIDE_OFFICE_FRAMES,
  BRIDE_OFFICE_PALETTE,
  BRIDE_PALETTE,
  BRIDE_STUDENT_FRAMES,
  BRIDE_STUDENT_PALETTE,
  GROOM_FRAMES,
  GROOM_OFFICE_FRAMES,
  GROOM_OFFICE_PALETTE,
  GROOM_PALETTE,
  GROOM_STUDENT_FRAMES,
  GROOM_STUDENT_PALETTE,
} from "./sprites";

// 신랑·신부 캐릭터. 인트로·스토리·이스터에그가 모두 이 컴포넌트를 쓰므로
// 캐릭터 디자인이 바뀌면 sprites.ts(또는 이미지)와 이 파일만 교체하면 된다.

const GROOM = {
  student: { frames: GROOM_STUDENT_FRAMES, palette: GROOM_STUDENT_PALETTE },
  office: { frames: GROOM_OFFICE_FRAMES, palette: GROOM_OFFICE_PALETTE },
  wedding: { frames: GROOM_FRAMES, palette: GROOM_PALETTE },
};

const BRIDE = {
  student: { frames: BRIDE_STUDENT_FRAMES, palette: BRIDE_STUDENT_PALETTE },
  office: { frames: BRIDE_OFFICE_FRAMES, palette: BRIDE_OFFICE_PALETTE },
  wedding: { frames: BRIDE_FRAMES, palette: BRIDE_PALETTE },
};

type CharacterProps = {
  outfit?: Outfit;
  walking?: boolean;
  /** 원본 12x16 비율 기준 크기 (예: "h-20 w-15") */
  className?: string;
};

export function Groom({ outfit = "wedding", walking = false, className = "h-20 w-15" }: CharacterProps) {
  return <PixelSprite {...GROOM[outfit]} animated={walking} className={className} />;
}

export function Bride({ outfit = "wedding", walking = false, className = "h-20 w-15" }: CharacterProps) {
  return <PixelSprite {...BRIDE[outfit]} animated={walking} className={className} />;
}
