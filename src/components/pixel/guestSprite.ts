// 단체사진에 들어오는 하객 도트 캐릭터 (12x16, 걷기 2프레임).
// 신랑·신부와 같은 얼굴 틀에 머리 모양 · 옷 · 색을 seed로 골라 조합한다.
// 색은 하객 옷차림처럼 차분한 톤에서만 고르고, 옷에는 한 단계 어두운 그늘(대문자)을 넣는다.

type Frames = readonly (readonly string[])[];

export type Gender = "male" | "female";

type Hair = { gender: Gender; rows: string[]; /** 어깨까지 내려오는 머리 */ long?: boolean };

// 얼굴(눈 4·7번째 칸, 볼)은 모두 같고 머리만 다르다
const HAIRS: Hair[] = [
  // 짧은 머리 (신랑과 같은 모양)
  { gender: "male", rows: ["....hhhh....", "...hhhhhh...", "...hssssh...", "...sesses...", "...spssps...", "....ssss...."] },
  // 옆으로 넘긴 앞머리
  { gender: "male", rows: ["...hhhhh....", "..hhhhhhhh..", "..hhhhsssh..", "...sesses...", "...spssps...", "....ssss...."] },
  // 넘긴 머리 + 구레나룻
  { gender: "male", rows: ["...hhhhhh...", "..hhhhhhhh..", "..hhsssshh..", "...sesses...", "...spssps...", "....ssss...."] },
  // 긴 생머리
  {
    gender: "female",
    long: true,
    rows: ["...hhhhhh...", "..hhhhhhhh..", "..hhsssshh..", "..hsessesh..", "..hspsspsh..", "..hhsssshh.."],
  },
  // 앞머리 있는 단발
  { gender: "female", rows: ["...hhhhhh...", "..hhhhhhhh..", "..hhhhhhhh..", "..hsessesh..", "..hspsspsh..", "..hhsssshh.."] },
  // 올림머리
  { gender: "female", rows: [".....hh.....", "...hhhhhh...", "..hhsssshh..", "...sesses...", "...spssps...", "....ssss...."] },
];

const PANTS_LEGS: Frames = [
  ["..qqq...qq..", ".qqq....qq..", ".nnn....nnn."],
  ["..qq...qqq..", "..qq....qqq.", ".nnn....nnn."],
];

const SKIRT_LEGS: Frames = [
  ["....s..s....", "....s..s....", "...nn..nn..."],
  ["...s....s...", "...s....s...", "..nn....nn.."],
];

type Outfit = { gender: Gender; body: string[]; legs: Frames };

const OUTFITS: Outfit[] = [
  // 정장 + 넥타이
  {
    gender: "male",
    body: ["..kkkwwkkk..", ".Kkkkbbkkkk.", ".Kkkkbbkkkk.", ".sKkkbbkkKs.", "..kkkwwkkk..", "..qqqqqqqq..", "..qqq..qqq.."],
    legs: PANTS_LEGS,
  },
  // 셔츠 + 슬랙스
  {
    gender: "male",
    body: ["..tttwwttt..", ".Tttttttttt.", ".Tttttttttt.", ".sTttttttts.", "..Tttttttt..", "..qqqqqqqq..", "..qqq..qqq.."],
    legs: PANTS_LEGS,
  },
  // 브이넥 원피스 + 허리띠
  {
    gender: "female",
    body: ["...ddssdd...", "..dddddddd..", "..sdddddds..", "...DDDDDD...", "..dddddddd..", ".dddddddddd.", ".DDDDDDDDDD."],
    legs: SKIRT_LEGS,
  },
  // 블라우스 + 치마
  {
    gender: "female",
    body: ["...wwwwww...", "..wwwwwwww..", "..swwwwwws..", "...dddddd...", "..dddddddd..", "..dddddddd..", "..DDDDDDDD.."],
    legs: SKIRT_LEGS,
  },
];

const SKINS = ["#f6d2b4", "#f0c6a4", "#e2b08c", "#c99068"];
const HAIR_COLORS = ["#1f1a17", "#2e2018", "#3d2a1e", "#4a2e1c", "#6b4226", "#8a5a36"];
const JACKETS = ["#2b2b3a", "#33405e", "#4d5668", "#6b6f7a", "#9a8466", "#5a4636"];
const TIES = ["#c0392b", "#d98aa0", "#3d6bb3", "#e8c879", "#6a8f6a"];
const SHIRTS = ["#e8e4da", "#a9c2e0", "#d9c7a8", "#8fa8b8", "#c9b8d9"];
const PANTS = ["#3b3a4a", "#4a5a78", "#6b5a48", "#7d8291"];
const DRESSES = ["#e8a0b4", "#a9c8ec", "#f2d58a", "#c4b0e6", "#9cd4b8", "#f2b49a", "#8a6ab8", "#5a7ac0"];

/** 한 단계 어두운 그늘 색 */
function shade(hex: string, amount = 0.78) {
  const n = parseInt(hex.slice(1), 16);
  const c = (shift: number) => Math.round(((n >> shift) & 255) * amount);
  return `#${((c(16) << 16) | (c(8) << 8) | c(0)).toString(16).padStart(6, "0")}`;
}

/** seed에서 차례로 숫자를 뽑는 작은 난수기 (mulberry32) */
function random(seed: number) {
  let a = seed;
  return (n: number) => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) % n;
  };
}

/** 새 하객의 모습을 정할 seed */
export const newSeed = () => Math.floor(Math.random() * 2 ** 32);

export type GuestLook = { frames: Frames; palette: Record<string, string> };

/** gender가 없으면(성별을 고르기 전에 저장된 하객) 모든 모양에서 고른다 */
export function guestLook(seed: number, gender?: Gender): GuestLook {
  const pick = random(seed);
  const choose = <T>(list: readonly T[]) => list[pick(list.length)];
  const fits = <T extends { gender: Gender }>(list: T[]) => list.filter((item) => !gender || item.gender === gender);

  const hair = choose(fits(HAIRS));
  const outfit = choose(fits(OUTFITS));
  const body = [...outfit.body];
  // 긴 머리는 어깨 위로 흘러내린다
  if (hair.long) for (const y of [0, 1]) body[y] = `..h${body[y].slice(3, 9)}h..`;

  const jacket = choose(JACKETS);
  const shirt = choose(SHIRTS);
  const dress = choose(DRESSES);

  return {
    frames: outfit.legs.map((legs) => [...hair.rows, ...body, ...legs]),
    palette: {
      h: choose(HAIR_COLORS),
      s: choose(SKINS),
      e: "#222222",
      p: "#f3a0a0",
      w: "#fbf7ef",
      k: jacket,
      K: shade(jacket),
      b: choose(TIES),
      t: shirt,
      T: shade(shirt, 0.86),
      q: choose(PANTS),
      d: dress,
      D: shade(dress),
      n: "#3a2a20",
    },
  };
}
