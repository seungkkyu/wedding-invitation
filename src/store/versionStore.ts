import { create } from "zustand";

/** 상단 탭으로 고르는 청첩장 디자인 버전 */
export const VERSIONS = [
  { id: "pixel", label: "도트" },
  { id: "film", label: "필름" },
  { id: "magazine", label: "매거진" },
  { id: "letter", label: "레터" },
  { id: "scrapbook", label: "스크랩" },
] as const;

export type VersionId = (typeof VERSIONS)[number]["id"];

export const isVersionId = (value: string | null): value is VersionId =>
  VERSIONS.some((version) => version.id === value);

type VersionState = {
  version: VersionId;
  setVersion: (version: VersionId) => void;
};

export const useVersionStore = create<VersionState>()((set) => ({
  version: "pixel",
  setVersion: (version) => set({ version }),
}));
