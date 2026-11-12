import { Hahmlet } from "next/font/google";

// 하루 전용: 굵기 축이 있는 가변 명조 (시각 숫자를 아주 가늘게)
const font = Hahmlet({ variable: "--font-hahmlet", subsets: ["latin"], preload: false });

export const haruFont = font.variable;
