import { type SimpleDate, wedding } from "@/data/wedding";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

const { year, month, day, hour, minute } = wedding.date;

const pad = (n: number) => String(n).padStart(2, "0");

/** 예식일 요일 (0 = 일요일). 타임존 영향을 받지 않도록 UTC 기준으로 계산 */
export const weddingWeekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

export function formatWeddingDate() {
  const meridiem = hour < 12 ? "오전" : "오후";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const time = minute ? `${h12}시 ${minute}분` : `${h12}시`;
  return `${year}년 ${month}월 ${day}일 ${WEEKDAYS[weddingWeekday]}요일 ${meridiem} ${time}`;
}

export function formatWeddingDateDots() {
  return `${year}.${pad(month)}.${pad(day)}`;
}

/** 오늘(KST) 0시를 UTC 날짜 타임스탬프로 */
function kstToday(now: number) {
  const kstNow = new Date(now + KST_OFFSET_MS);
  return Date.UTC(kstNow.getUTCFullYear(), kstNow.getUTCMonth(), kstNow.getUTCDate());
}

/** 오늘(KST)부터 예식일까지 남은 일수. 당일이면 0, 지났으면 음수 */
export function daysUntilWedding(now = Date.now()) {
  return Math.round((Date.UTC(year, month - 1, day) - kstToday(now)) / DAY_MS);
}

/** 예식 시작까지 남은 밀리초 (예식 시각은 KST) */
export function msUntilWedding(now = Date.now()) {
  return Date.UTC(year, month - 1, day, hour, minute) - KST_OFFSET_MS - now;
}

const toUtc = (date: SimpleDate) => Date.UTC(date.year, date.month - 1, date.day);
const FIRST_DAY_UTC = toUtc(wedding.firstDay);

/** 처음 만난 날을 1일로 셌을 때 해당 날짜가 며칠째인지 */
export function dayNumberOf(date: SimpleDate) {
  return Math.round((toUtc(date) - FIRST_DAY_UTC) / DAY_MS) + 1;
}

/** 처음 만난 날을 1일로 센 n일째 날짜 */
export function dateOfDayNumber(n: number): SimpleDate {
  const date = new Date(FIRST_DAY_UTC + (n - 1) * DAY_MS);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** 처음 만난 날을 1일로 센 오늘(KST)까지의 날수 */
export function daysTogether(now = Date.now()) {
  return Math.round((kstToday(now) - FIRST_DAY_UTC) / DAY_MS) + 1;
}

export function formatDots(date: SimpleDate) {
  return `${date.year}.${pad(date.month)}.${pad(date.day)}`;
}

export function formatFirstDayDots() {
  return formatDots(wedding.firstDay);
}

export function formatTodayDots(now = Date.now()) {
  const today = new Date(kstToday(now));
  return `${today.getUTCFullYear()}.${pad(today.getUTCMonth() + 1)}.${pad(today.getUTCDate())}`;
}

/** 예식 월의 달력 셀 (앞쪽 빈칸은 null) */
export function weddingMonthCells() {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
}

export { WEEKDAYS };
