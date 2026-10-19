import type { Metadata, Viewport } from "next";
import { DotGothic16, Gowun_Batang, Noto_Sans_KR } from "next/font/google";
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

const dotGothic = DotGothic16({
  variable: "--font-dotgothic",
  weight: "400",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${gowunBatang.variable} ${dotGothic.variable} antialiased`}>
      <body className="bg-stone-200 font-sans text-ink">{children}</body>
    </html>
  );
}
