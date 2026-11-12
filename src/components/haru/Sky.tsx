import { SKY, type TimeOfDay, TIMES } from "./times";

// 하늘 전환은 천천히: 시간이 흐르는 느낌이 나도록
const FADE = "duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

const STARS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='260'%3E%3Cg fill='%23fff'%3E%3Ccircle cx='20' cy='30' r='.9'/%3E%3Ccircle cx='132' cy='64' r='.7'/%3E%3Ccircle cx='76' cy='150' r='1'/%3E%3Ccircle cx='160' cy='204' r='.6'/%3E%3Ccircle cx='44' cy='226' r='.8'/%3E%3Ccircle cx='104' cy='18' r='.6'/%3E%3C/g%3E%3C/svg%3E\")";
const STARS_TWINKLE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='300'%3E%3Cg fill='%23fff'%3E%3Ccircle cx='60' cy='70' r='1.1'/%3E%3Ccircle cx='190' cy='130' r='.9'/%3E%3Ccircle cx='120' cy='250' r='1'/%3E%3C/g%3E%3C/svg%3E\")";

// 구름: 가로 위치는 애니메이션이 맡고, 높이·크기·속도만 다르게
const CLOUDS = [
  { top: "12%", scale: 1, duration: "90s", delay: "-20s" },
  { top: "26%", scale: 0.7, duration: "120s", delay: "-75s" },
  { top: "44%", scale: 1.3, duration: "150s", delay: "-40s" },
];

/**
 * 화면 뒤에 고정된 하늘. 지금 보고 있는 섹션의 시각(time)에 맞춰
 * 그라데이션 층을 겹쳐 바꾸고 해·달·별·구름을 옮긴다.
 * 바뀌는 속성은 opacity·transform·작은 요소의 색뿐이라 스크롤 중에도 레이아웃을 다시 계산하지 않는다.
 */
export function Sky({ time }: { time: TimeOfDay }) {
  const sky = SKY[time];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 overflow-hidden">
      {/* 시간 순서대로 쌓아 두고 지금 시각까지의 층만 켠다. 다음 층이 위에서 차오르므로 중간에 비치는 틈이 없다 */}
      {TIMES.map((t, i) => (
        <div
          key={t}
          className={`absolute inset-0 transition-opacity ${FADE}`}
          style={{ backgroundImage: SKY[t].gradient, opacity: i <= TIMES.indexOf(time) ? 1 : 0 }}
        />
      ))}

      {/* 별 */}
      <div className={`absolute inset-0 transition-opacity ${FADE}`} style={{ opacity: sky.stars }}>
        <div className="absolute inset-0" style={{ backgroundImage: STARS }} />
        <div className="absolute inset-0 animate-twinkle" style={{ backgroundImage: STARS_TWINKLE }} />
      </div>

      {/* 해: 하늘 크기만 한 판을 해 위치만큼 옮긴다 (translate %는 자기 크기 기준) */}
      <div
        className={`absolute inset-0 transition-transform ${FADE}`}
        style={{ transform: `translate(${sky.sun[0]}%, ${sky.sun[1]}%)` }}
      >
        <span
          className={`absolute -top-24 -left-24 size-48 rounded-full transition-colors ${FADE}`}
          style={{ backgroundImage: `radial-gradient(closest-side, ${sky.sunColor} 34%, color-mix(in oklab, ${sky.sunColor} 35%, transparent) 46%, transparent)` }}
        />
      </div>

      {/* 달: 밤에만 떠오른다 */}
      <div
        className={`absolute inset-0 transition-[transform,opacity] ${FADE}`}
        style={{ transform: `translate(${sky.moon ? "72%, 12%" : "60%, 40%"})`, opacity: sky.moon ? 1 : 0 }}
      >
        <span className="absolute -top-7 -left-7 size-14 rounded-full bg-[#f4efdc] shadow-[0_0_40px_10px_rgba(244,239,220,0.25)]">
          {/* 그믐 그림자 */}
          <span className="absolute -top-1 left-4 size-14 rounded-full bg-[#17214a]" />
        </span>
      </div>

      {/* 구름 */}
      <div className={`absolute inset-0 transition-opacity ${FADE}`} style={{ opacity: sky.clouds }}>
        {CLOUDS.map((cloud) => (
          <div
            key={cloud.top}
            className="absolute inset-x-0 animate-cloud"
            style={{ top: cloud.top, animationDuration: cloud.duration, animationDelay: cloud.delay }}
          >
            <span className="relative block h-10 w-36 origin-left" style={{ scale: cloud.scale }}>
              <span className="absolute bottom-0 left-0 h-6 w-36 rounded-full bg-white/75" />
              <span className="absolute bottom-2 left-6 size-12 rounded-full bg-white/75" />
              <span className="absolute bottom-2 left-16 size-9 rounded-full bg-white/75" />
            </span>
          </div>
        ))}
      </div>

      {/* 먼 산 능선 두 겹 */}
      <svg viewBox="0 0 480 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-24 w-full">
        <path
          d="M0 58 L40 44 L78 52 L120 30 L168 48 L214 36 L262 50 L310 26 L352 42 L404 34 L446 46 L480 38 V90 H0Z"
          className={`opacity-60 transition-[fill] ${FADE}`}
          style={{ fill: sky.ridge }}
        />
        <path
          d="M0 74 L54 62 L96 70 L150 56 L206 68 L252 60 L300 72 L356 58 L410 68 L480 60 V90 H0Z"
          className={`transition-[fill] ${FADE}`}
          style={{ fill: sky.ridge }}
        />
      </svg>
    </div>
  );
}
