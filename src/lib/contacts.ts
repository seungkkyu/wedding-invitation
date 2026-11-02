import { type Person, wedding } from "@/data/wedding";

export type ContactRow = { role: string; roleEn: string; name: string; phone: string };
export type ContactGroup = { side: "groom" | "bride"; label: string; en: string; rows: ContactRow[] };

function rowsOf(person: Person, role: string, roleEn: string): ContactRow[] {
  return [
    { role, roleEn, name: person.name, phone: person.phone },
    { role: "아버지", roleEn: "Father", name: person.father, phone: person.fatherPhone },
    { role: "어머니", roleEn: "Mother", name: person.mother, phone: person.motherPhone },
  ];
}

/** 연락처 섹션용 데이터: 신랑측 / 신부측, 각각 본인·아버지·어머니 */
export const contactGroups: ContactGroup[] = [
  { side: "groom", label: "신랑", en: "Groom", rows: rowsOf(wedding.groom, "신랑", "Groom") },
  { side: "bride", label: "신부", en: "Bride", rows: rowsOf(wedding.bride, "신부", "Bride") },
];

/** "박성대 · 김춘희" */
export const parentsOf = (person: Person) => `${person.father} · ${person.mother}`;
