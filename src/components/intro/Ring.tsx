/** 임시 웨딩 반지 (도트/실사 스타일 미정) */
export function Ring({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff2c4" />
          <stop offset="45%" stopColor="#e2b85c" />
          <stop offset="100%" stopColor="#9c7428" />
        </linearGradient>
      </defs>
      <circle cx={50} cy={62} r={27} fill="none" stroke="url(#ring-gold)" strokeWidth={9} />
      <rect x={44} y={31} width={12} height={6} fill="#c9a04a" />
      <polygon points="50,10 63,22 50,38 37,22" fill="#eaf7ff" stroke="#a9d8ff" strokeWidth={2} />
      <polygon points="50,10 56,22 50,38 44,22" fill="#ffffff" opacity={0.7} />
    </svg>
  );
}
