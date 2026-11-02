import { CopyButton } from "@/components/common/CopyButton";
import { Icon } from "@/components/common/Icon";
import { accountGroups, accountText } from "@/lib/accounts";
import { COPY_CLASS, Headline, Page } from "./parts";

export function Accounts() {
  return (
    <Page id="mag-account" folio={8} kicker="WITH GRATITUDE">
      <Headline
        en="With Gratitude"
        ko="마음 전하실 곳"
        lead="참석이 어려우신 분들을 위해 계좌번호를 함께 적어 둡니다. 보내주시는 마음, 오래 간직하겠습니다."
      />
      <div className="border-t border-[#171513]">
        {accountGroups.map((group) => (
          <details key={group.side} className="group border-b border-[#171513]">
            <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-headline text-[15px] font-bold text-[#171513]">
              {group.title}
              <Icon name="chevronDown" className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="divide-y divide-[#171513]/12 pb-3">
              {group.accounts.map((account) => (
                <li key={account.holder} className="flex items-center justify-between py-3.5">
                  <div>
                    <p className="text-sm text-[#171513]">{account.holder}</p>
                    <p className="mt-0.5 text-xs text-[#171513]/55 lining-nums">{accountText(account)}</p>
                  </div>
                  <CopyButton
                    text={accountText(account)}
                    label="COPY"
                    copiedLabel="COPIED"
                    className={COPY_CLASS}
                    iconClassName="size-3"
                  />
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </Page>
  );
}
