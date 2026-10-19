// 임시 도트 캐릭터 (12x16, 걷기 2프레임). 실제 에셋이 나오면 교체.

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
