/** 청첩장 디자인 버전. 각 버전은 `/${id}` 경로의 페이지로 열린다 */
export const VERSIONS = [
  { id: "pixel", label: "도트", description: "도트 게임 속 두 사람의 이야기" },
  { id: "film", label: "필름", description: "한 편의 영화처럼 흘러가는 초대장" },
  { id: "magazine", label: "매거진", description: "두 사람을 다룬 잡지 한 권" },
  { id: "letter", label: "레터", description: "봉투를 열어 읽는 손편지" },
  { id: "scrapbook", label: "스크랩", description: "사진과 메모를 붙여 만든 다이어리" },
] as const;

export type VersionId = (typeof VERSIONS)[number]["id"];

export const versionHref = (id: VersionId) => `/${id}` as const;
