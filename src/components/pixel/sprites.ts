// 임시 도트 캐릭터 (12x16, 걷기 2프레임). 실제 에셋이 나오면 교체하고 Characters.tsx 크기만 맞춘다.

const GROOM_BODY = [
  "....hhhh....",
  "...hhhhhh...",
  "...hssssh...",
  "...sesses...",
  "...spssps...",
  "....ssss....",
  "..kkkwwkkk..",
  ".kkkkbbkkkk.",
  ".kkkkwwkkkk.",
  ".skkkwwkkks.",
  "..kkkwwkkk..",
  "..kkkkkkkk..",
  "..kkk..kkk..",
];

export const GROOM_FRAMES = [
  [...GROOM_BODY, "..kkk...kk..", ".kkk....kk..", ".nnn....nnn."],
  [...GROOM_BODY, "..kk...kkk..", "..kk....kkk.", ".nnn....nnn."],
];

export const GROOM_PALETTE = {
  h: "#1f1a17",
  s: "#f6d2b4",
  e: "#222222",
  p: "#f3a0a0",
  k: "#2b2b3a",
  w: "#ffffff",
  b: "#c0392b",
  n: "#4a3222",
};

const BRIDE_BODY = [
  "...vvhhvv...",
  "..vhhhhhhv..",
  "..vhsssshv..",
  "..vsesseshv.",
  "..vspsspshv.",
  "..vhsssshv..",
  "..vhwwwwhv..",
  "..vwwffwwv..",
  "..swffffws..",
  "..wwwffwww..",
  "..wwwwwwww..",
  ".wwwwwwwwww.",
  ".wwwwwwwwww.",
];

export const BRIDE_FRAMES = [
  [...BRIDE_BODY, "wwwwwwwwwwww", "wwwwwwwwwwww", ".nn......nn."],
  [...BRIDE_BODY, ".wwwwwwwwww.", "wwwwwwwwwwww", "...nn..nn..."],
];

export const BRIDE_PALETTE = {
  h: "#6b4226",
  s: "#f6d2b4",
  e: "#222222",
  p: "#f3a0a0",
  w: "#ffffff",
  v: "#e9e4f5",
  f: "#e88aa6",
  n: "#d9cfc4",
};

// ── 시기별 의상 (스토리 타임라인). 얼굴은 웨딩 버전과 같고 옷만 다르다. ──

const GROOM_HEAD = GROOM_BODY.slice(0, 6);

// 넥타이(b)가 세로로 3칸, 바지(q)는 상의(k)와 다른 색을 쓸 수 있다
const GROOM_TIE_BODY = [
  ...GROOM_HEAD,
  "..kkkwwkkk..",
  ".kkkkbbkkkk.",
  ".kkkkbbkkkk.",
  ".skkkbbkkks.",
  "..kkkwwkkk..",
  "..qqqqqqqq..",
  "..qqq..qqq..",
];

const GROOM_TIE_FRAMES = [
  [...GROOM_TIE_BODY, "..qqq...qq..", ".qqq....qq..", ".nnn....nnn."],
  [...GROOM_TIE_BODY, "..qq...qqq..", "..qq....qqq.", ".nnn....nnn."],
];

export const GROOM_STUDENT_FRAMES = GROOM_TIE_FRAMES;
export const GROOM_STUDENT_PALETTE = { ...GROOM_PALETTE, k: "#26335f", q: "#7d8291", b: "#b8323f" };

export const GROOM_OFFICE_FRAMES = GROOM_TIE_FRAMES;
export const GROOM_OFFICE_PALETTE = { ...GROOM_PALETTE, k: "#4d5668", q: "#4d5668", b: "#3d6bb3" };

const BRIDE_HEAD = [
  "....hhhh....",
  "...hhhhhhh..",
  "...hsssshh..",
  "..hsessesh..",
  "..hspsspsh..",
  "..hhssssh...",
];

const BRIDE_STUDENT_BODY = [
  ...BRIDE_HEAD,
  "...wwrrww...",
  "..wwwrrwww..",
  "..swwwwwws..",
  "...jjjjjj...",
  "..jjjjjjjj..",
  "..jjjjjjjj..",
  "...s....s...",
];

export const BRIDE_STUDENT_FRAMES = [
  [...BRIDE_STUDENT_BODY, "...s....s...", "...w....w...", "..nn....nn.."],
  [...BRIDE_STUDENT_BODY, "....s..s....", "....w..w....", "...nn..nn..."],
];

export const BRIDE_STUDENT_PALETTE = {
  h: "#5a3820",
  s: "#f6d2b4",
  e: "#222222",
  p: "#f3a0a0",
  w: "#ffffff",
  r: "#b8323f",
  j: "#26335f",
  n: "#3a2a20",
};

const BRIDE_OFFICE_BODY = [
  ...BRIDE_HEAD,
  "..ccwwwwcc..",
  "..cccwwccc..",
  "..sccccccs..",
  "...kkkkkk...",
  "...kkkkkk...",
  "...kkkkkk...",
  "....s..s....",
];

export const BRIDE_OFFICE_FRAMES = [
  [...BRIDE_OFFICE_BODY, "....s..s....", "...s....s...", "..nn....nn.."],
  [...BRIDE_OFFICE_BODY, "....s..s....", "....s..s....", "...nn..nn..."],
];

export const BRIDE_OFFICE_PALETTE = {
  h: "#5a3820",
  s: "#f6d2b4",
  e: "#222222",
  p: "#f3a0a0",
  w: "#fbf4ea",
  c: "#a8876b",
  k: "#3b3a4a",
  n: "#2a2430",
};

export const HEART_FRAMES = [[".hh.hh.", "hhhhhhh", "hhhhhhh", ".hhhhh.", "..hhh..", "...h..."]];

export const HEART_PALETTE = { h: "#ff6b8b" };

// 문 양옆 꽃덤불 (14x9)
export const BUSH_FRAMES = [
  [
    "...FF....FF...",
    "..FppF..FrrF..",
    ".FfpyfFFfryfF.",
    "FffppfFfffrrfF",
    "FfffffFfpffffF",
    "FfrrffFppyfffF",
    "FfryfFFfppfffF",
    "FFffFFFFffFFFF",
    ".FFFFFFFFFFFF.",
  ],
];

export const BUSH_PALETTE = {
  F: "#3f8a55",
  f: "#6fb07a",
  p: "#f7a8c4",
  r: "#e5577a",
  y: "#ffd76a",
};

// 바닥 양옆 등불 (7x20)
export const LAMP_FRAMES = [
  [
    "...G...",
    "..GGG..",
    ".GGGGG.",
    ".GlylG.",
    ".GyfyG.",
    ".GlylG.",
    ".GGGGG.",
    "..GgG..",
    "...g...",
    "...g...",
    "...G...",
    "...g...",
    "...g...",
    "...G...",
    "...g...",
    "...g...",
    "..GgG..",
    "..ggg..",
    ".GGGGG.",
    "GGGGGGG",
  ],
];

export const LAMP_PALETTE = {
  G: "#b8893a",
  g: "#e2b85c",
  l: "#fff3c4",
  y: "#ffd76a",
  f: "#ff9b3d",
};

// BGM 스피커 아이콘 (8x7). c는 currentColor로 칠해 버튼 글자색을 따른다
export const SPEAKER_ON_FRAMES = [
  ["...c....", "..cc.c..", "cccc..c.", "cccc..c.", "cccc..c.", "..cc.c..", "...c...."],
];
export const SPEAKER_OFF_FRAMES = [
  ["...c....", "..cc....", "cccc.c.c", "cccc..c.", "cccc.c.c", "..cc....", "...c...."],
];
export const SPEAKER_PALETTE = { c: "currentColor" };
