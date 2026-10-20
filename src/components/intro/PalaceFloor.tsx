import { PixelSprite } from "./PixelSprite";
import { LAMP_FRAMES, LAMP_PALETTE } from "./sprites";

// 바닥에 흩어진 꽃잎 (바닥 영역 기준 위치)
const FALLEN_PETALS = [
  { top: "18%", left: "16%" },
  { top: "42%", left: "30%" },
  { top: "64%", left: "12%" },
  { top: "26%", left: "74%" },
  { top: "52%", left: "86%" },
  { top: "78%", left: "68%" },
];

const LAMPS = ["left-[8%]", "right-[8%]"];

/** 궁전 앞 바닥: 원근 대리석 타일 + 레드카펫 + 양옆 등불. lit이면 문빛이 바닥에 번진다. */
export function PalaceFloor({ lit }: { lit: boolean }) {
  return (
    <>
      {/* 원근감 있는 체크무늬 대리석 */}
      <div className="absolute inset-0 overflow-hidden perspective-[220px] perspective-origin-top">
        <div className="absolute top-0 -left-1/2 h-[260%] w-[200%] origin-top rotate-x-[58deg] bg-[conic-gradient(#4a4074_25%,#332b54_0_50%,#4a4074_0_75%,#332b54_0)] bg-size-[40px_40px]" />
      </div>

      {/* 레드카펫 (금색 테두리 + 결) */}
      <div className="absolute inset-y-0 left-1/2 w-[300px] -translate-x-1/2 bg-[#e2b85c] [clip-path:polygon(38%_0,62%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-y-0 left-1/2 w-[282px] -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,transparent_0_10px,rgba(0,0,0,0.14)_10px_12px),linear-gradient(to_bottom,#7a1d31,#b8364b)] [clip-path:polygon(39.5%_0,60.5%_0,100%_100%,0_100%)]" />

      {FALLEN_PETALS.map((petal) => (
        <span key={`${petal.top}-${petal.left}`} className="absolute size-1.5 bg-pink-200/80" style={petal} />
      ))}

      {/* 문에서 새어 나온 빛 */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(255,226,150,0.22),transparent_65%)]" />
      <div
        className={`absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,240,190,0.55),transparent_60%)] transition-opacity duration-500 ${
          lit ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* 경계의 금장 몰딩과 그림자, 아래쪽 어둠 */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#e2b85c]/80" />
      <div className="absolute inset-x-0 top-1 h-3 bg-linear-to-b from-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night to-transparent" />

      {/* 등불 */}
      {LAMPS.map((side) => (
        <div key={side} className={`absolute bottom-full ${side}`}>
          <div className="absolute -top-3 left-1/2 size-12 -translate-x-1/2 animate-flicker rounded-full bg-amber-200/30 blur-md" />
          <PixelSprite frames={LAMP_FRAMES} palette={LAMP_PALETTE} className="relative h-20 w-7" />
        </div>
      ))}
    </>
  );
}
