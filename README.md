# wedding-invitation

박승규 ♥ 박정은 모바일 청첩장. 인트로 애니메이션 뒤에 다섯 가지 디자인을 상단 탭으로 골라 볼 수 있다.

| 탭 | 폴더 | 분위기 |
|---|---|---|
| 도트 | `src/components/invitation` | 8비트 도트 캐릭터, 칩튠 BGM, 스토리 타임라인, 신혼여행 탑승권 |
| 필름 | `src/components/film` | 필름 리더 카운트다운, 자막 인사말, 크레딧, 필름 스트립 갤러리, 시사회 티켓 |
| 매거진 | `src/components/magazine` | 웨딩 매거진 커버, 목차, 에디터스 레터, 화보 스프레드 |
| 레터 | `src/components/letter` | 왁스 씰 봉투 오프닝, 아치 프레임, 반투명 카드, 캐러셀 |
| 스크랩 | `src/components/scrapbook` | 다이어리 꾸미기: 폴라로이드 카드 넘기기, 마스킹테이프, 손글씨 |

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · motion · zustand

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기 (아래 '환경 변수' 참고)
npm run dev                  # http://localhost:3000
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 (정적 페이지) |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint |

폰에서 확인할 때는 `npm run dev` 후 같은 Wi-Fi에서 `http://<PC IP>:3000`으로 접속한다.

## 환경 변수

신랑·신부·혼주 정보, 예식 일시, 장소, 기능 켜기/끄기는 `.env.local`에서 관리한다. 전체 키와 설명은 [`.env.example`](.env.example) 참고. (`.env.local`은 git에 올라가지 않는다)

값을 비우거나 키가 없으면 오른쪽 '기본값'(아무개 임시 값)이 들어간다.

| 키 | 예시 | 기본값 | 설명 |
|---|---|---|---|
| `NEXT_PUBLIC_GROOM_NAME` / `_PHONE` | `박승규` / `010-…` | `김아무개` / `010-0000-0000` | 신랑 |
| `NEXT_PUBLIC_GROOM_FATHER_NAME` / `_PHONE` | | `김아버지` / `010-0000-0000` | 신랑 아버지 |
| `NEXT_PUBLIC_GROOM_MOTHER_NAME` / `_PHONE` | | `이어머니` / `010-0000-0000` | 신랑 어머니 |
| `NEXT_PUBLIC_BRIDE_NAME` / `_PHONE` | | `이아무개` / `010-0000-0000` | 신부 |
| `NEXT_PUBLIC_BRIDE_FATHER_NAME` / `_PHONE` | | `이아버지` / `010-0000-0000` | 신부 아버지 |
| `NEXT_PUBLIC_BRIDE_MOTHER_NAME` / `_PHONE` | | `박어머니` / `010-0000-0000` | 신부 어머니 |
| `NEXT_PUBLIC_WEDDING_DATE` | `2027-06-20` | `2027-06-20` | 예식일 (`YYYY-MM-DD`) |
| `NEXT_PUBLIC_WEDDING_TIME` | `11:00` | `11:00` | 예식 시각, KST (`HH:MM`) |
| `NEXT_PUBLIC_VENUE_NAME` | `지타워컨벤션` | `아무개웨딩홀` | 장소 이름 (지도 검색어로도 쓰임) |
| `NEXT_PUBLIC_VENUE_HALL` | `3층 그랜드홀` | `아무개홀` | 홀 이름 |
| `NEXT_PUBLIC_VENUE_ADDRESS` | | `서울특별시 아무구 아무로 123` | 주소 |
| `NEXT_PUBLIC_VENUE_TEL` | | `02-000-0000` | 대표번호 |
| `NEXT_PUBLIC_INTRO_ENABLED` | `true` | `true` | 첫 진입 인트로 애니메이션. `false`면 바로 청첩장이 보이고 '인트로 다시 보기' 버튼도 숨겨진다 |

- **값을 바꾼 뒤에는 dev 서버를 재시작하거나 다시 배포해야 한다.** `NEXT_PUBLIC_` 값은 빌드할 때 코드에 박힌다.
- 기본값은 [`src/data/wedding.ts`](src/data/wedding.ts)에서 바꿀 수 있다. 계좌 예금주 이름도 위 이름 값을 따른다.
- 켜기/끄기 값은 `true·1·on·yes` / `false·0·off·no`를 받는다.
- 새 환경 변수는 [`src/lib/env.ts`](src/lib/env.ts)에서 `process.env.NEXT_PUBLIC_X`를 **직접** 참조해 읽는다 (`process.env[key]` 같은 동적 접근은 빌드 때 치환되지 않는다).

## 내용 고치기

환경 변수가 아닌 내용은 전부 [`src/data/wedding.ts`](src/data/wedding.ts)에 있다.

| 항목 | 필드 |
|---|---|
| 사진 | `gallery` — 첫 장은 각 버전의 커버로도 쓰인다 |
| 인사말 | `greeting` (빈 문자열 `""`은 줄바꿈 한 줄) |
| 계좌번호 | `accounts.groom` / `accounts.bride` |
| 교통 안내 | `venue.transport` |
| 장남·장녀 표기 | `groom.order` / `bride.order` |
| 처음 만난 날 | `firstDay` — 인트로의 '함께한 날수', 매거진의 'N년의 연애'에 쓰인다 |
| 스토리 타임라인 (도트) | `story`, `storyChapters` |
| 신혼여행 탑승권 (도트) | `honeymoon` |

### 사진 추가

1. 사진을 `public/images/gallery/`에 넣는다. 아직 공개하기 싫은 원본은 `public/images/private/`(git 제외)에 둔다. 긴 변 1600px 정도로 줄이면 충분하다 (macOS: `sips -Z 1600 원본.jpg --out public/images/gallery/06.jpg`).
2. `wedding.ts`의 `gallery`에 한 줄 추가한다. `width`/`height`는 실제 픽셀 크기 (가로·세로 사진 배치에 쓰인다).

```ts
{ src: "/images/gallery/06.jpg", width: 1600, height: 1200, caption: "Jeju, Spring" },
```

다섯 버전 모두 `gallery` 전체를 순서대로 보여 준다.

## 디자인별 페이지

- `/` 홈에서 디자인을 고르면 `/pixel` `/film` `/magazine` `/letter` `/scrapbook` 페이지로 이동한다. 링크를 공유하면 그 디자인으로 바로 열린다.
- 도트 인트로(날수 카운트 → 궁전 입장)는 `/pixel`에서만 재생된다.
- 각 페이지 위의 탭으로 다른 디자인이나 홈으로 이동한다. 아래로 스크롤하면 숨고, 위로 올리면 다시 나온다.
- 예전 링크(`/?v=film`)는 해당 경로로 리다이렉트된다 (`next.config.ts`).

### 새 버전 추가하기

1. `src/components/<이름>/<이름>Invitation.tsx`를 만들고 컴포넌트를 export한다.
2. [`src/lib/versions.ts`](src/lib/versions.ts)의 `VERSIONS`에 `{ id, label, description }`을 추가한다.
3. `src/app/<이름>/page.tsx`에서 컴포넌트와 `VersionTabs`를 렌더하고, 홈 견본은 [`VersionPicker.tsx`](src/components/versions/VersionPicker.tsx)의 `Swatch`에 추가한다. `next.config.ts` 리다이렉트 목록에도 이름을 넣는다.
4. 테마 전용 폰트가 필요하면 `src/app/layout.tsx`에 `preload: false`로 추가하고, `globals.css`의 `@theme inline`에 `--font-*`를 등록한다.

데이터·기능은 아래 공통 모듈을 쓰고, 테마 폴더에는 모양(마크업·스타일)만 둔다.

## 공통 모듈

| 종류 | 모듈 | 하는 일 |
|---|---|---|
| UI | `common/Lightbox` | 사진 전체 화면 보기 (스와이프·이전/다음·Esc·방향키). body로 포털을 띄워 어디서 열어도 화면을 덮는다. `className`, `renderCounter`, `renderCaption`으로 테마별 모양 |
| UI | `common/CallButtons` | 전화·문자 버튼. 번호가 없으면 그리지 않음 |
| UI | `common/CopyButton` | 복사 버튼 (`label`, `copiedLabel`, `icon`, `className`). 내용이 없으면 그리지 않음 |
| UI | `common/ReplayIntroButton` | '인트로 다시 보기'. 인트로를 끄면 숨김 |
| UI | `common/ImageGuard` | 사진 우클릭·길게 누르기·드래그 저장 막기 (전역, `layout.tsx`) |
| UI | `common/Section`, `common/Icon` | 도트 버전 섹션 틀, 라인 아이콘 |
| 훅 | `useLightbox(count)` | 사진 보기 상태 `{ index, open, close, move }` (끝에서 처음으로 순환) |
| 훅 | `useCountdown()` / `useDday()` | 예식까지 남은 시간(1초 갱신) / 남은 일수. 서버에서는 `null` |
| 훅 | `useShare()` | 공유(Web Share → 링크 복사 폴백), 링크 복사 |
| 훅 | `useCopy()`, `useScrollLock()` | 클립보드 복사, 오버레이가 떠 있는 동안 스크롤 잠금 |
| 데이터 | `lib/contacts` | `contactGroups` (신랑측/신부측 연락처), `parentsOf(person)` |
| 데이터 | `lib/accounts` | `accountGroups`, `accountText(account)` |
| 데이터 | `lib/venue` | `mapLinks` (네이버·카카오·티맵 길찾기) |
| 데이터 | `lib/date` | 날짜 표기, D-day, 달력 칸, 함께한 날수 |
| 데이터 | `lib/env` | 환경 변수 읽기 `env()`, `envFlag()`, 기능 플래그 `features` |

## 사진 보호

개인 사진이라 `<img>`에서 우클릭(데스크톱)·길게 누르기(안드로이드) 메뉴, iOS 길게 누르기 저장, 드래그 저장, 선택을 막아 두었다 (`ImageGuard` + `globals.css`의 `img` 기본 스타일). 스크린샷이나 개발자 도구까지 막을 수는 없으니 '쉽게 저장되지 않게' 하는 정도다.

## 폴더 구조

```
src/
  app/            layout(폰트·메타데이터), page, globals.css(Tailwind 테마 토큰)
  data/           wedding.ts — 청첩장 내용
  lib/            날짜·연락처·계좌·지도·환경 변수 등 순수 로직
  hooks/          공통 훅
  store/          zustand 스토어 (인트로 단계, 선택된 버전)
  components/
    common/       공통 UI
    intro/        인트로 애니메이션
    versions/     버전 탭과 전환
    invitation/   도트 버전 (+ pixel/ 도트 스프라이트)
    film/ magazine/ letter/ scrapbook/
public/images/gallery/   사진
```

## 컨벤션

- 스타일은 Tailwind 클래스로만 작성한다. 커스텀 토큰·keyframe·유틸리티는 `src/app/globals.css`의 `@theme` / `@utility`에 둔다.
- 커밋 메시지는 Conventional Commits (`feat:`, `fix:`, `chore:` …).
- `*.md` 문서는 기본적으로 git에서 제외된다 (README.md만 추적).

## 배포 (Vercel 기준)

1. 저장소를 Vercel에 연결한다.
2. Project Settings → Environment Variables에 `.env.local`과 같은 키·값을 넣는다.
3. 환경 변수를 바꾼 뒤에는 **Redeploy** 해야 반영된다.
