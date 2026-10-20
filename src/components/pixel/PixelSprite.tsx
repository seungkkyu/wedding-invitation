type PixelSpriteProps = {
  /** 프레임별 픽셀 맵. 각 문자는 palette의 키, "."은 투명 */
  frames: readonly (readonly string[])[];
  palette: Record<string, string>;
  /** true면 animate-walk로 프레임을 순환 (2프레임 기준) */
  animated?: boolean;
  /** 크기는 원본 비율에 맞춰 지정 (예: 12x16 → "h-20 w-15") */
  className?: string;
};

/**
 * 픽셀 맵을 SVG로 그리는 스프라이트 시트.
 * 프레임을 가로로 이어 붙이고 wrapper로 한 프레임만 보여준다.
 * 실제 도트 PNG가 준비되면 이 컴포넌트만 이미지 기반으로 교체하면 된다.
 */
export function PixelSprite({ frames, palette, animated = false, className = "" }: PixelSpriteProps) {
  const height = frames[0].length;
  const width = frames[0][0].length;

  return (
    <div className={`overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${width * frames.length} ${height}`}
        shapeRendering="crispEdges"
        className={`h-full ${animated ? "animate-walk" : ""}`}
        style={{ width: `${frames.length * 100}%` }}
        aria-hidden
      >
        {frames.flatMap((rows, f) =>
          rows.flatMap((row, y) =>
            [...row].flatMap((key, x) =>
              key === "." ? [] : (
                <rect key={`${f}-${x}-${y}`} x={f * width + x} y={y} width={1} height={1} fill={palette[key]} />
              ),
            ),
          ),
        )}
      </svg>
    </div>
  );
}
