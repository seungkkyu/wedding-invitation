import { HaruInvitation } from "@/components/haru/HaruInvitation";
import { VersionTabs } from "@/components/versions/VersionTabs";
import { haruFont } from "@/lib/fonts/haru";

export default function HaruPage() {
  return (
    <div className={haruFont}>
      <HaruInvitation />
      <VersionTabs />
    </div>
  );
}
