// 단체사진에 함께한 하객 목록.
// 지금은 이 브라우저에만 저장한다. 백엔드가 생기면 이 파일의 두 함수만 API 호출로 바꾸면 된다
// (그래서 처음부터 Promise를 돌려준다).

export type Guest = { id: string; name: string; seed: number; joinedAt: number };

export const GUEST_NAME_MAX = 6;

const KEY = "wedding:group-photo";

function read(): Guest[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as Guest[]) : [];
  } catch {
    return [];
  }
}

export async function loadGuests(): Promise<Guest[]> {
  return read();
}

export async function addGuest(name: string, seed: number): Promise<Guest> {
  const guest: Guest = {
    id: crypto.randomUUID(),
    name: name.trim().slice(0, GUEST_NAME_MAX),
    seed,
    joinedAt: Date.now(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify([...read(), guest]));
  } catch {
    // 저장이 막힌 브라우저(사생활 보호 모드 등)에서도 이번 화면에는 보이게 한다
  }
  return guest;
}
