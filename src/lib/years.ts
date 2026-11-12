import { type SimpleDate, wedding } from "@/data/wedding";
import { dayNumberOf } from "./date";

export type Season = "spring" | "summer" | "autumn" | "winter";

/** 3~5월 봄, 6~8월 여름, 9~11월 가을, 12~2월 겨울 */
export const seasonOf = (month: number): Season =>
  month >= 3 && month <= 5 ? "spring" : month >= 6 && month <= 8 ? "summer" : month >= 9 && month <= 11 ? "autumn" : "winter";

export type YearChapter = {
  year: number;
  month: number;
  season: Season;
  /** 그해 두 사람의 일 (스토리 순간이면 제목과 글) */
  title?: string;
  text?: string;
  /** 스토리 순간 날짜가 있으면 처음 만난 날부터 며칠째인지 */
  dayNumber?: number;
  world?: string;
};

/**
 * 처음 만난 해부터 예식 전 해까지 해마다 한 장.
 * 그해 스토리 순간(wedding.story)이 있으면 그 날짜·제목·글을, 없으면 wedding.years의 내용을 쓴다.
 */
export function yearChapters(): YearChapter[] {
  const chapters: YearChapter[] = [];
  for (let year = wedding.firstDay.year; year < wedding.date.year; year++) {
    const note = wedding.years.find((y) => y.year === year);
    const moment = wedding.story.find((m) => m.date.year === year);
    const date: SimpleDate | undefined = moment?.date;
    const month = date?.month ?? note?.month ?? 6;
    chapters.push({
      year,
      month,
      season: seasonOf(month),
      title: moment?.title ?? note?.us,
      text: moment?.text,
      dayNumber: date && dayNumberOf(date),
      world: note?.world,
    });
  }
  return chapters;
}
