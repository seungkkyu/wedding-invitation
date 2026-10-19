import { create } from "zustand";

/**
 * 인트로 진행 상태. 타이밍은 IntroSequence의 애니메이션 시퀀스가 결정하고,
 * 여기엔 화면 상태(걷기 모션, 문 열림 등)를 바꾸는 데 필요한 단계만 둔다.
 */
export type IntroPhase =
  | "ring" // 반지 회전·낙하, 궁전 등장
  | "walk" // 신랑·신부가 걸어옴
  | "enter" // 문이 열리고 들어감
  | "close" // 문 닫힘, 하트
  | "done"; // 청첩장 노출

type IntroState = {
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
  skip: () => void;
  replay: () => void;
};

export const useIntroStore = create<IntroState>()((set) => ({
  phase: "ring",
  setPhase: (phase) => set({ phase }),
  skip: () => set({ phase: "done" }),
  replay: () => set({ phase: "ring" }),
}));
