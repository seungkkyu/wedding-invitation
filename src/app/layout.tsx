import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Gowun_Batang, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import { wedding } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// 한글 도트 폰트 (Galmuri11, SIL OFL — fonts/Galmuri-OFL.txt)
const galmuri = localFont({
  variable: "--font-galmuri",
  src: [
    { path: "./fonts/Galmuri11.woff2", weight: "400" },
    { path: "./fonts/Galmuri11-Bold.woff2", weight: "700" },
  ],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${wedding.groom.name} ♥ ${wedding.bride.name} 결혼합니다`,
  description: `${formatWeddingDate()} ${wedding.venue.name}`,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

// scrollbar-gutter: 모달이 스크롤을 잠갔다 풀 때 스크롤바 자리만큼 화면 폭이 흔들리지 않게 한다
// suppressHydrationWarning: 번역 확장 프로그램 등이 <html>에 속성을 끼워 넣어 생기는 경고를 막는다 (이 태그의 속성에만 적용)
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${notoSansKr.variable} ${gowunBatang.variable} ${galmuri.variable} ${bodoniModa.variable} antialiased [scrollbar-gutter:stable]`}>
      <body className="bg-stone-200 font-sans text-ink">{children}</body>
    </html>
  );
}
