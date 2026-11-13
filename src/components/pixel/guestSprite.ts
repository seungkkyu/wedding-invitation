// 단체사진에 들어오는 하객 도트 캐릭터 (12x16, 걷기 2프레임).
// 머리 모양 · 옷 · 색 · 안경을 seed로 골라 조합해서, 신랑·신부와 같은 그림체로 수백 가지가 나온다.

type Frames = readonly (readonly string[])[];

const HAIRS = [
  // 짧은 머리
  ["....hhhh....", "...hhhhhh...", "...hssssh...", "...sesses...", "...spssps...", "....ssss...."],
  // 긴 머리
  ["...hhhhhh...", "..hhhhhhhh..", "..hhsssshh..", "..hsessesh..", "..hspsspsh..", "..hhsssshh.."],
  // 단발
  ["...hhhhhh...", "..hhhhhhhh..", "..hhsssshh..", "..hsessesh..", "..hspsspsh..", "...hssssh..."],
  // 모자
  ["...cccccc...", "..cccccccc..", "...hssssh...", "...sesses...", "...spssps...", "....ssss...."],
  // 까까머리
  ["............", "....hhhh....", "...hssssh...", "...sesses...", "...spssps...", "....ssss...."],
  // 묶은 머리
  ["....hhhh.hh.", "...hhhhhhhh.", "...hsssshh..", "...sesses...", "...spssps...", "....ssss...."],
];

const PANTS_LEGS: Frames = [
  ["..qqq...qq..", ".qqq....qq..", ".nnn....nnn."],
  ["..qq...qqq..", "..qq....qqq.", ".nnn....nnn."],
];

const SKIRT_LEGS: Frames = [
  ["....s..s....", "....s..s....", "...nn..nn..."],
  ["...s....s...", "...s....s...", "..nn....nn.."],
];

const OUTFITS: { body: string[]; legs: Frames }[] = [
  // 정장
  {
    body: ["..kkkwwkkk..", ".kkkkbbkkkk.", ".kkkkbbkkkk.", ".skkkbbkkks.", "..kkkwwkkk..", "..qqqqqqqq..", "..qqq..qqq.."],
    legs: PANTS_LEGS,
  },
  // 원피스
  {
    body: ["...dddddd...", "..dddddddd..", "..sdddddds..", "...dddddd...", "..dddddddd..", "..dddddddd..", ".dddddddddd."],
    legs: SKIRT_LEGS,
  },
  // 니트 + 바지
  {
    body: ["..tttttttt..", ".tttttttttt.", ".tttttttttt.", ".stttttttts.", "..tttttttt..", "..qqqqqqqq..", "..qqq..qqq.."],
    legs: PANTS_LEGS,
  },
  // 블라우스 + 치마
  {
    body: ["..wwwbbwww..", ".wwwwwwwwww.", ".swwwwwwwws.", "...dddddd...", "..dddddddd..", "..dddddddd..", ".dddddddddd."],
    legs: SKIRT_LEGS,
  },
];

const SKINS = ["#f6d2b4", "#efc4a2", "#e0ac86", "#c48a62"];
const HAIR_COLORS = ["#1f1a17", "#3a2418", "#5a3820", "#7a4a2a", "#a0623a", "#d8b06a", "#8a8a96", "#c96f8a"];
const HATS = ["#c0392b", "#3d6bb3", "#e8c879", "#3f8a55", "#2b2b3a"];
const JACKETS = ["#2b2b3a", "#3a4d7a", "#4d5668", "#5a3d5a", "#2f5e4e", "#7a5a3e"];
const TIES = ["#c0392b", "#3d6bb3", "#e8c879", "#e88aa6", "#3f8a55"];
const DRESSES = ["#e88aa6", "#8fb8e8", "#f2d17a", "#b59ae0", "#7fcfaa", "#f0a07a", "#e9e4f5"];
const KNITS = ["#c9584a", "#e8c879", "#7fa0d8", "#9a7fc4", "#5fa88a", "#e0a0b0", "#d9d4c8"];
const PANTS = ["#3b3a4a", "#4a5a78", "#6b5a48", "#2b2b3a", "#7d8291"];

/** 같은 문자열이면 항상 같은 값 (FNV-1a) */
export function hashSeed(text: string) {
  let h = 0x811c9dc5;
  for (const ch of text) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** seed에서 차례로 숫자를 뽑는 작은 난수기 (mulberry32) */
function random(seed: number) {
  let a = seed;
  return (n: number) => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return (((t ^ (t >>> 14)) >>> 0) % n) as number;
  };
}

export type GuestLook = { frames: Frames; palette: Record<string, string> };

export function guestLook(seed: number): GuestLook {
  const pick = random(seed);
  const choose = <T>(list: readonly T[]) => list[pick(list.length)];

  const head = [...choose(HAIRS)];
  // 4명 중 1명은 안경 (눈 위치는 모든 머리 모양에서 4·7번째 칸)
  if (pick(4) === 0) head[3] = `${head[3].slice(0, 3)}geggeg${head[3].slice(9)}`;

  const outfit = choose(OUTFITS);
  const frames = outfit.legs.map((legs) => [...head, ...outfit.body, ...legs]);

  return {
    frames,
    palette: {
      h: choose(HAIR_COLORS),
      s: choose(SKINS),
      e: "#222222",
      p: "#f3a0a0",
      g: "#1a1a1a",
      c: choose(HATS),
      k: choose(JACKETS),
      w: "#ffffff",
      b: choose(TIES),
      d: choose(DRESSES),
      t: choose(KNITS),
      q: choose(PANTS),
      n: "#3a2a20",
    },
  };
}
