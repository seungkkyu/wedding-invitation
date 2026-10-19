import { Account } from "./Account";
import { Calendar } from "./Calendar";
import { Contact } from "./Contact";
import { Cover } from "./Cover";
import { Gallery } from "./Gallery";
import { Greeting } from "./Greeting";
import { Location } from "./Location";
import { Share } from "./Share";

export function Invitation() {
  return (
    <main className="mx-auto min-h-dvh max-w-[480px] bg-ivory shadow-sm">
      <Cover />
      <Greeting />
      <Calendar />
      <Gallery />
      <Location />
      <Contact />
      <Account />
      <Share />
    </main>
  );
}
