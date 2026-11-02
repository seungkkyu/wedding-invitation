import { type BankAccount, wedding } from "@/data/wedding";

export type AccountGroup = { side: "groom" | "bride"; title: string; accounts: BankAccount[] };

/** 계좌 섹션용 데이터: 신랑측 / 신부측 */
export const accountGroups: AccountGroup[] = [
  { side: "groom", title: "신랑측 계좌번호", accounts: wedding.accounts.groom },
  { side: "bride", title: "신부측 계좌번호", accounts: wedding.accounts.bride },
];

/** 복사·표시용 "OO은행 000-0000" */
export const accountText = (account: BankAccount) => `${account.bank} ${account.number}`;
