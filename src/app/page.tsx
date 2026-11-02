import { IntroGate } from "@/components/intro/IntroSequence";
import { VersionSwitch } from "@/components/versions/VersionSwitch";

export default function Home() {
  return (
    <>
      <VersionSwitch />
      <IntroGate />
    </>
  );
}
