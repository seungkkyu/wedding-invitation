// 청첩장 내용은 전부 이 파일에서 관리한다. (현재는 임시 데이터)

export type Person = {
  name: string;
  order: string;
  father: string;
  mother: string;
  phone: string;
  fatherPhone: string;
  motherPhone: string;
};

export type SimpleDate = { year: number; month: number; day: number };

export type StoryMoment = {
  date: SimpleDate;
  title: string;
  text: string;
  /** public/ 기준 사진 경로 (예: "/images/story/first-day.jpg"). 없으면 플레이스홀더 */
  photo?: string;
};

/** 시기별 캐릭터 의상 */
export type Outfit = "student" | "office" | "wedding";

export type StoryChapter = {
  /** 이 연도까지의 순간이 이 챕터에 속한다. 마지막 챕터는 생략 */
  until?: number;
  outfit: Outfit;
  title: string;
};

export type BankAccount = {
  holder: string;
  bank: string;
  number: string;
};

export const wedding = {
  groom: {
    name: "박승규",
    order: "장남",
    father: "김아버지",
    mother: "박어머니",
    phone: "010-0000-0000",
    fatherPhone: "010-0000-0000",
    motherPhone: "010-0000-0000",
  } satisfies Person,
  bride: {
    name: "박정은",
    order: "장녀",
    father: "이아버지",
    mother: "최어머니",
    phone: "010-0000-0000",
    fatherPhone: "010-0000-0000",
    motherPhone: "010-0000-0000",
  } satisfies Person,
  date: { year: 2027, month: 5, day: 15, hour: 12, minute: 30 },
  // 처음 만난 날. 인트로에서 이 날을 1일로 함께한 날수를 센다.
  firstDay: { year: 2015, month: 7, day: 18 } satisfies SimpleDate,
  // 스토리 타임라인의 순간들 (현재는 임시 내용). 1,000일 단위 기념일과 예식일은 자동으로 끼워 넣는다.
  story: [
    { date: { year: 2015, month: 7, day: 18 }, title: "처음 만난 날", text: "(임시) 그날의 첫인상을 적어주세요." },
    { date: { year: 2016, month: 8, day: 12 }, title: "첫 여행", text: "(임시) 함께 떠난 첫 여행의 기억." },
    { date: { year: 2020, month: 12, day: 24 }, title: "함께한 겨울", text: "(임시) 오래 기억하고 싶은 순간." },
    { date: { year: 2026, month: 3, day: 14 }, title: "프로포즈", text: "(임시) 평생을 약속한 날." },
  ] satisfies StoryMoment[],
  // 스토리 챕터. 캐릭터가 챕터에 들어서면 의상이 바뀐다. (제목은 임시)
  storyChapters: [
    { until: 2018, outfit: "student", title: "교복을 입던 우리" },
    { until: 2025, outfit: "office", title: "같은 퇴근길" },
    { outfit: "wedding", title: "그리고, 평생" },
  ] satisfies StoryChapter[],
  venue: {
    name: "OO웨딩홀",
    hall: "3층 그랜드홀",
    address: "서울특별시 강남구 테헤란로 000",
    tel: "02-000-0000",
    transport: [
      { label: "지하철", lines: ["2호선 OO역 3번 출구 도보 5분"] },
      { label: "버스", lines: ["간선 000, 000 · 지선 0000", "OO역 정류장 하차"] },
      { label: "주차", lines: ["건물 지하 주차장 이용 (2시간 무료)"] },
    ],
  },
  greeting: [
    "서로 다른 길을 걸어온 두 사람이",
    "이제 같은 문을 열고 함께 걸어가려 합니다.",
    "",
    "귀한 걸음 하시어 축복해 주시면",
    "더없는 기쁨으로 간직하겠습니다.",
  ],
  accounts: {
    groom: [
      { holder: "박승규", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "김아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "박어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
    bride: [
      { holder: "박정은", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "이아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "최어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
  },
  // 사진 경로 (public/images/...). 비어 있으면 갤러리에 플레이스홀더가 표시된다.
  gallery: [] as string[],
};
