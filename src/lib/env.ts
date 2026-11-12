// 환경 변수 읽기. 키 목록과 설명은 .env.example 참고.
// NEXT_PUBLIC_ 값은 빌드 때 문자열로 치환되므로 process.env.X 형태로 하나씩 직접 참조해야 한다 (동적 접근 불가)

/** 문자열 값. 비어 있으면 fallback */
export const env = (value: string | undefined, fallback = "") => value?.trim() || fallback;

/** 켜기/끄기 값: true·1·on·yes / false·0·off·no (대소문자 무관). 비어 있거나 알 수 없는 값이면 fallback */
export function envFlag(value: string | undefined, fallback: boolean) {
  const normalized = value?.trim().toLowerCase();
  if (normalized && ["true", "1", "on", "yes"].includes(normalized)) return true;
  if (normalized && ["false", "0", "off", "no"].includes(normalized)) return false;
  return fallback;
}

/** 기능 켜기/끄기 */
export const features = {
  /** 첫 진입 인트로 애니메이션 (함께한 날수 → 반지 → 궁전) */
  intro: envFlag(process.env.NEXT_PUBLIC_INTRO_ENABLED, true),
};

/**
 * 배포 주소. 링크 미리보기(og:image 등)는 절대 URL이어야 해서 필요하다.
 * NEXT_PUBLIC_SITE_URL → Vercel 운영 도메인(자동 제공) → 로컬 주소 순으로 쓴다.
 */
export const siteUrl =
  env(process.env.NEXT_PUBLIC_SITE_URL) ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
