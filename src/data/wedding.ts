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

export type BankAccount = {
  holder: string;
  bank: string;
  number: string;
};

export const wedding = {
  groom: {
    name: "김신랑",
    order: "장남",
    father: "김아버지",
    mother: "박어머니",
    phone: "010-0000-0000",
    fatherPhone: "010-0000-0000",
    motherPhone: "010-0000-0000",
  } satisfies Person,
  bride: {
    name: "이신부",
    order: "장녀",
    father: "이아버지",
    mother: "최어머니",
    phone: "010-0000-0000",
    fatherPhone: "010-0000-0000",
    motherPhone: "010-0000-0000",
  } satisfies Person,
  date: { year: 2027, month: 5, day: 15, hour: 12, minute: 30 },
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
      { holder: "김신랑", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "김아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "박어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
    bride: [
      { holder: "이신부", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "이아버지", bank: "OO은행", number: "000-0000-0000-00" },
      { holder: "최어머니", bank: "OO은행", number: "000-0000-0000-00" },
    ] satisfies BankAccount[],
  },
  // 사진 경로 (public/images/...). 비어 있으면 갤러리에 플레이스홀더가 표시된다.
  gallery: [] as string[],
};
