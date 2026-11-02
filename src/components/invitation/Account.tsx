import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { accountGroups, accountText } from "@/lib/accounts";

export function Account() {
  return (
    <Section eyebrow="Account" title="마음 전하실 곳">
      <p className="-mt-4 mb-10 text-center text-[13px] leading-6 text-muted">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
      </p>
      <div className="border-t border-line">
        {accountGroups.map((group) => (
          <details key={group.side} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-sm text-ink">
              {group.title}
              <Icon name="chevronDown" className="size-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <ul className="divide-y divide-line/70 pb-2">
              {group.accounts.map((account) => (
                <li key={account.holder} className="flex items-center justify-between py-3">
                  <div className="text-sm">
                    <p className="text-ink">{account.holder}</p>
                    <p className="text-xs text-muted">{accountText(account)}</p>
                  </div>
                  <CopyButton text={accountText(account)} />
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </Section>
  );
}
