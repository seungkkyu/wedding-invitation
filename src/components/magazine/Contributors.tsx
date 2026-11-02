import { CallButtons } from "@/components/common/CallButtons";
import { contactGroups } from "@/lib/contacts";
import { Headline, Label, Page } from "./parts";

export function Contributors() {
  return (
    <Page id="mag-contributors" folio={7} kicker="CONTRIBUTORS">
      <Headline en="Contributors" ko="축하의 마음 전하기" />
      <div className="space-y-12">
        {contactGroups.map((group) => (
          <div key={group.side}>
            <p className="flex items-baseline justify-between border-b border-[#171513] pb-2">
              <span className="font-display text-xl text-[#171513] italic">The {group.en}</span>
              <Label>{group.label}측</Label>
            </p>
            <ul className="divide-y divide-[#171513]/12">
              {group.rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between py-3.5">
                  <p>
                    <span className="block text-[10px] tracking-[0.2em] text-[#171513]/50">{row.role}</span>
                    <span className="mt-0.5 block font-headline text-[15px] font-bold text-[#171513]">{row.name}</span>
                  </p>
                  <CallButtons
                    name={row.name}
                    phone={row.phone}
                    className="flex gap-1.5"
                    buttonClassName="flex size-9 items-center justify-center rounded-full border border-[#171513]/25 text-[#171513] active:bg-[#171513] active:text-white"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Page>
  );
}
