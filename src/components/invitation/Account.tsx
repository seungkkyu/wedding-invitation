import { CopyButton } from "@/components/common/CopyButton";
import { Section } from "@/components/common/Section";
import { wedding, type BankAccount } from "@/data/wedding";

function AccountGroup({ title, accounts }: { title: string; accounts: BankAccount[] }) {
  return (
    <details className="group overflow-hidden rounded-lg border border-stone-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm text-ink">
        {title}
        <span className="text-muted transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <ul className="divide-y divide-stone-100 border-t border-stone-200">
        {accounts.map((account) => (
          <li key={account.holder} className="flex items-center justify-between px-4 py-3">
            <div className="text-sm">
              <p className="text-ink">{account.holder}</p>
              <p className="text-xs text-muted">
                {account.bank} {account.number}
              </p>
            </div>
            <CopyButton text={`${account.bank} ${account.number}`} />
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Account() {
  return (
    <Section eyebrow="Account" title="마음 전하실 곳">
      <p className="-mt-4 mb-8 text-center text-sm leading-6 text-muted">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
      </p>
      <div className="space-y-3">
        <AccountGroup title="신랑측 계좌번호" accounts={wedding.accounts.groom} />
        <AccountGroup title="신부측 계좌번호" accounts={wedding.accounts.bride} />
      </div>
    </Section>
  );
}
