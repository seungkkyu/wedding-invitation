import { wedding } from "@/data/wedding";

export type MapLink = { id: "naver" | "kakao" | "tmap"; label: string; en: string; href: string };

const query = encodeURIComponent(wedding.venue.name);

/** 길찾기 앱 바로가기 (장소 이름으로 검색) */
export const mapLinks: MapLink[] = [
  { id: "naver", label: "네이버 지도", en: "Naver", href: `https://map.naver.com/p/search/${query}` },
  { id: "kakao", label: "카카오맵", en: "Kakao", href: `https://map.kakao.com/link/search/${query}` },
  { id: "tmap", label: "티맵", en: "Tmap", href: `tmap://search?name=${query}` },
];
