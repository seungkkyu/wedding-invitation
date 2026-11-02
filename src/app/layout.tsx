import type { Metadata, Viewport } from "next";
import {
  Bebas_Neue,
  Bodoni_Moda,
  Caveat,
  Cormorant_Garamond,
  Courier_Prime,
  Gowun_Batang,
  Nanum_Myeongjo,
  Nanum_Pen_Script,
  Noto_Sans_KR,
  Pinyon_Script,
} from "next/font/google";
import localFont from "next/font/local";
import { ImageGuard } from "@/components/common/ImageGuard";
import { venueLabel, wedding } from "@/data/wedding";
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

// 아래는 특정 버전 탭에서만 쓰는 폰트라 미리 받지 않는다 (preload: false → 실제로 쓰일 때 내려받음)
// 필름: 영화 타이틀 + 타자기 자막
const bebasNeue = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"], preload: false });
const courierPrime = Courier_Prime({
  variable: "--font-courier",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});
// 매거진: 굵은 한글 명조 헤드라인
const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  preload: false,
});
// 레터: 캘리그래피 + 우아한 세리프
const pinyonScript = Pinyon_Script({ variable: "--font-pinyon", weight: "400", subsets: ["latin"], preload: false });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  preload: false,
});

// 스크랩북: 한글 손글씨 + 영문 손글씨
const nanumPen = Nanum_Pen_Script({ variable: "--font-nanum-pen", weight: "400", subsets: ["latin"], preload: false });
const caveat = Caveat({ variable: "--font-caveat", weight: ["400", "600"], subsets: ["latin"], preload: false });

export const metadata: Metadata = {
  title: `${wedding.groom.name} ♥ ${wedding.bride.name} 결혼합니다`,
  description: `${formatWeddingDate()} ${venueLabel}`,
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
      className={`${notoSansKr.variable} ${gowunBatang.variable} ${galmuri.variable} ${bodoniModa.variable} ${bebasNeue.variable} ${courierPrime.variable} ${nanumMyeongjo.variable} ${pinyonScript.variable} ${cormorant.variable} ${nanumPen.variable} ${caveat.variable} antialiased [scrollbar-gutter:stable]`}>
      <body className="bg-stone-200 font-sans text-ink">
        {children}
        <ImageGuard />
      </body>
    </html>
  );
}
