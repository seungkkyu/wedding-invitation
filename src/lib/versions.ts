/** 청첩장 디자인 버전. 각 버전은 `/${id}` 경로의 페이지로 열린다 */
export const VERSIONS = [
  { id: "pixel", label: "도트", description: "도트 게임 속 두 사람의 이야기" },
  { id: "film", label: "필름", description: "한 편의 영화처럼 흘러가는 초대장" },
  { id: "magazine", label: "매거진", description: "두 사람을 다룬 잡지 한 권" },
  { id: "letter", label: "레터", description: "봉투를 열어 읽는 손편지" },
  { id: "scrapbook", label: "스크랩", description: "사진과 메모를 붙여 만든 다이어리" },
  { id: "haru", label: "하루", description: "새벽부터 밤까지, 예식 날의 하늘" },
  { id: "light", label: "창가", description: "창으로 드는 볕이 하루를 건너가는 방" },
  { id: "stars", label: "별밤", description: "견우와 직녀처럼, 별이 돌아 만나는 밤" },
  { id: "train", label: "창밖", description: "기차 창밖으로 예식장까지 가는 길" },
  { id: "seasons", label: "계절", description: "2015년부터 2027년까지, 해마다 한 장" },
] as const;

export type VersionId = (typeof VERSIONS)[number]["id"];

export const versionHref = (id: VersionId) => `/${id}` as const;
