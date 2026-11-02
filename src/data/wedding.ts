// 청첩장 내용은 전부 이 파일에서 관리한다.
// 신랑·신부·혼주 정보, 예식 일시, 장소는 환경 변수(.env.local, 키 목록은 .env.example)에서 읽는다.

import { env } from "@/lib/env";

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

export type Photo = {
  /** public/ 기준 경로 */
  src: string;
  width: number;
  height: number;
  /** 사진 아래 짧은 설명 (장소·계절 등) */
  caption: string;
};

/** "2027-06-20" + "11:00" → 숫자 필드 */
function parseDateTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute = 0] = time.split(":").map(Number);
  return { year, month, day, hour, minute };
}

// 환경 변수가 없을 때 쓰는 임시 값 (아무개)
const PLACEHOLDER_PHONE = "010-0000-0000";

const groom = {
  name: env(process.env.NEXT_PUBLIC_GROOM_NAME, "김아무개"),
  order: "장남",
  father: env(process.env.NEXT_PUBLIC_GROOM_FATHER_NAME, "김아버지"),
  mother: env(process.env.NEXT_PUBLIC_GROOM_MOTHER_NAME, "이어머니"),
  phone: env(process.env.NEXT_PUBLIC_GROOM_PHONE, PLACEHOLDER_PHONE),
  fatherPhone: env(process.env.NEXT_PUBLIC_GROOM_FATHER_PHONE, PLACEHOLDER_PHONE),
  motherPhone: env(process.env.NEXT_PUBLIC_GROOM_MOTHER_PHONE, PLACEHOLDER_PHONE),
} satisfies Person;

const bride = {
  name: env(process.env.NEXT_PUBLIC_BRIDE_NAME, "이아무개"),
  order: "장녀",
  father: env(process.env.NEXT_PUBLIC_BRIDE_FATHER_NAME, "이아버지"),
  mother: env(process.env.NEXT_PUBLIC_BRIDE_MOTHER_NAME, "박어머니"),
  phone: env(process.env.NEXT_PUBLIC_BRIDE_PHONE, PLACEHOLDER_PHONE),
  fatherPhone: env(process.env.NEXT_PUBLIC_BRIDE_FATHER_PHONE, PLACEHOLDER_PHONE),
  motherPhone: env(process.env.NEXT_PUBLIC_BRIDE_MOTHER_PHONE, PLACEHOLDER_PHONE),
} satisfies Person;

export const wedding = {
  groom,
  bride,
  date: parseDateTime(
    env(process.env.NEXT_PUBLIC_WEDDING_DATE, "2027-06-20"),
    env(process.env.NEXT_PUBLIC_WEDDING_TIME, "11:00"),
  ),
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
    name: env(process.env.NEXT_PUBLIC_VENUE_NAME, "아무개웨딩홀"),
    hall: env(process.env.NEXT_PUBLIC_VENUE_HALL, "아무개홀"),
    address: env(process.env.NEXT_PUBLIC_VENUE_ADDRESS, "서울특별시 아무구 아무로 123"),
    tel: env(process.env.NEXT_PUBLIC_VENUE_TEL, "02-000-0000"),
    // 교통 안내 (TODO: 웨딩홀 안내문으로 확인 후 교체)
    transport: [
      { label: "지하철", lines: ["2호선 구로디지털단지역 하차", "역 앞 셔틀버스 탑승장에서 셔틀 이용"] },
      { label: "버스", lines: ["구로디지털단지역 정류장 하차"] },
      { label: "주차", lines: ["건물 주차장 이용 (무료 시간은 웨딩홀에 확인)"] },
    ],
  },
  greeting: [
    "서로 다른 길을 걸어온 두 사람이",
    "이제 같은 문을 열고 함께 걸어가려 합니다.",
    "",
    "귀한 걸음 하시어 축복해 주시면",
    "더없는 기쁨으로 간직하겠습니다.",
  ],
  // 계좌번호 (TODO: 실제 계좌로 교체). 예금주 이름은 위의 이름 값을 따른다
  accounts: {
    groom: [
      { holder: groom.name, bank: "OO은행", number: "000-0000-0000-00" },
      { holder: groom.father, bank: "OO은행", number: "000-0000-0000-00" },
      { holder: groom.mother, bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
    bride: [
      { holder: bride.name, bank: "OO은행", number: "000-0000-0000-00" },
      { holder: bride.father, bank: "OO은행", number: "000-0000-0000-00" },
      { holder: bride.mother, bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
  },
  // 신혼여행 탑승권과 출국 장면 (현재는 임시 내용)
  honeymoon: {
    from: { code: "ICN", city: "Seoul" },
    to: { code: "HNL", city: "Honolulu", name: "하와이", greeting: "ALOHA!" },
    date: { year: 2027, month: 6, day: 21 } satisfies SimpleDate,
    flight: "LV 0620",
  },
  // 사진 (public/images/gallery). 첫 장은 버전별 커버로도 쓰인다. 비어 있으면 플레이스홀더가 표시된다.
  // 지금은 실사진 대신 일러스트 버전. 실사진 원본은 public/images/private/ (git 제외)
  gallery: [
    { src: "/images/gallery/01.jpg", width: 1448, height: 1086, caption: "Hanok Garden" },
    { src: "/images/gallery/02.jpg", width: 1448, height: 1086, caption: "Sapporo, Winter Night" },
    { src: "/images/gallery/03.jpg", width: 1448, height: 1086, caption: "Jersey Day" },
    { src: "/images/gallery/04.jpg", width: 1086, height: 1448, caption: "Afternoon Light" },
    { src: "/images/gallery/05.jpg", width: 1448, height: 1086, caption: "Fukuoka, Tenjin" },
  ] as Photo[],
};

/** "지타워컨벤션 3층 그랜드홀"처럼 장소와 홀 이름을 붙인 표기 (홀 이름이 비어 있으면 장소만) */
export const venueLabel = [wedding.venue.name, wedding.venue.hall].filter(Boolean).join(" ");
