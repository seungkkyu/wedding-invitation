import { CopyButton } from "@/components/common/CopyButton";
import { PixelSection, PixelWindow } from "@/components/pixel/PixelSection";
import { accountGroups, accountText } from "@/lib/accounts";

export function Account() {
  return (
    <PixelSection title="마음 전하실 곳">
      <p className="-mt-4 mb-10 text-center font-pixel text-xs leading-6 text-muted">
        참석이 어려우신 분들을 위해
        <br />
        계좌번호를 기재하였습니다.
      </p>
      <div className="space-y-6">
        {accountGroups.map((group) => (
          <PixelWindow key={group.side} className="font-pixel">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-ink">
                {group.title}
                {/* 열리면 커서가 아래를 가리킨다 */}
                <span aria-hidden className="text-xs text-accent transition-transform group-open:rotate-90">
                  ▶
                </span>
              </summary>
              <ul className="mx-5 divide-y-2 divide-dashed divide-line border-t-2 border-dashed border-line pb-2">
                {group.accounts.map((account) => (
                  <li key={account.holder} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0 text-sm break-words">
                      <p className="text-ink">{account.holder}</p>
                      <p className="mt-0.5 text-xs text-muted">{accountText(account)}</p>
                    </div>
                    <CopyButton
                      text={accountText(account)}
                      className="min-h-11 bg-night px-3.5 text-xs text-accent pixel-btn [--pixel-border:var(--color-control)]"
                    />
                  </li>
                ))}
              </ul>
            </details>
          </PixelWindow>
        ))}
      </div>
    </PixelSection>
  );
}
