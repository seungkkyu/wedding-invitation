// 솔리테어 웨딩 반지. 금속 반사와 다이아몬드 커팅면을 그라디언트·면 분할로 표현한다.

// 다이아몬드 크라운(윗면)·파빌리온(아랫면) 커팅면. 빛 방향(좌상단)에 따라 밝기를 달리한다.
const FACETS = [
  { points: "40,22 60,22 63,27 37,27", fill: "url(#ring-table)" },
  { points: "30,33 37,27 41,33", fill: "#d9efff" },
  { points: "37,27 50,27 41,33", fill: "#ffffff" },
  { points: "50,27 41,33 50,33", fill: "#eef8ff" },
  { points: "50,27 59,33 50,33", fill: "#bfe0f7" },
  { points: "50,27 63,27 59,33", fill: "#e4f4ff" },
  { points: "63,27 70,33 59,33", fill: "#9cc8e8" },
  { points: "30,33 41,33 50,52", fill: "#c9e6fa" },
  { points: "41,33 50,33 50,52", fill: "#ffffff" },
  { points: "50,33 59,33 50,52", fill: "#a6d0ec" },
  { points: "59,33 70,33 50,52", fill: "#7fb2d6" },
];

const SPARKLES = [
  { x: 66, y: 18, size: 6, delay: "0s" },
  { x: 33, y: 24, size: 4, delay: "0.5s" },
  { x: 78, y: 70, size: 4, delay: "1s" },
];

/** 네 갈래 반짝임 */
function Sparkle({ x, y, size, delay }: (typeof SPARKLES)[number]) {
  const s = size;
  const t = size / 5;
  return (
    <path
      d={`M${x},${y - s} L${x + t},${y - t} L${x + s},${y} L${x + t},${y + t} L${x},${y + s} L${x - t},${y + t} L${x - s},${y} L${x - t},${y - t}Z`}
      fill="#ffffff"
      className="animate-twinkle"
      style={{ animationDelay: delay }}
    />
  );
}

export function Ring({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 116" className={className} aria-hidden>
      <defs>
        {/* 금속 밴드: 밝은 반사와 어두운 굴곡이 번갈아 나오도록 */}
        <linearGradient id="ring-band" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7dc" />
          <stop offset="18%" stopColor="#f2d283" />
          <stop offset="40%" stopColor="#b5832c" />
          <stop offset="56%" stopColor="#fbe6a6" />
          <stop offset="78%" stopColor="#97681d" />
          <stop offset="100%" stopColor="#e6c067" />
        </linearGradient>
        <linearGradient id="ring-setting" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f6dc95" />
          <stop offset="50%" stopColor="#b98a35" />
          <stop offset="100%" stopColor="#e9c46a" />
        </linearGradient>
        <linearGradient id="ring-table" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e3f3ff" />
          <stop offset="100%" stopColor="#b9dcf4" />
        </linearGradient>
        <radialGradient id="ring-glow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* 밴드 */}
      <circle cx={50} cy={82} r={28} fill="none" stroke="url(#ring-band)" strokeWidth={7} />
      <circle cx={50} cy={82} r={24.6} fill="none" stroke="#5e4110" strokeWidth={0.8} opacity={0.55} />
      <circle cx={50} cy={82} r={31.4} fill="none" stroke="#fff3cf" strokeWidth={0.6} opacity={0.7} />
      <path d="M27,70 A26,26 0 0 1 40,58" fill="none" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
      <path d="M74,92 A26,26 0 0 1 66,103" fill="none" stroke="#fff8e0" strokeWidth={1} strokeLinecap="round" opacity={0.6} />

      {/* 받침과 발(프롱) */}
      <polygon points="42,46 58,46 55,55 45,55" fill="url(#ring-setting)" />
      <path d="M44,50 L32,32 M56,50 L68,32 M50,50 L50,31" stroke="url(#ring-setting)" strokeWidth={2.2} strokeLinecap="round" />

      {/* 다이아몬드 */}
      <g stroke="#8fc0e2" strokeWidth={0.4} strokeLinejoin="round">
        {FACETS.map((facet) => (
          <polygon key={facet.points} {...facet} />
        ))}
      </g>
      <line x1={30} y1={33} x2={70} y2={33} stroke="#ffffff" strokeWidth={0.8} opacity={0.9} />
      <polygon points="41,23 47,23 40,32 34,32" fill="#ffffff" opacity={0.55} />

      {/* 프롱 끝이 다이아를 감싸는 부분 */}
      <circle cx={32} cy={32} r={1.6} fill="#f2d283" />
      <circle cx={68} cy={32} r={1.6} fill="#c99a41" />

      <circle cx={46} cy={26} r={9} fill="url(#ring-glow)" opacity={0.5} />
      {SPARKLES.map((sparkle) => (
        <Sparkle key={`${sparkle.x}-${sparkle.y}`} {...sparkle} />
      ))}
    </svg>
  );
}
