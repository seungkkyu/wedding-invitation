import { wedding } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";

export function Cover() {
  const { groom, bride, venue } = wedding;

  return (
    <section className="flex min-h-dvh flex-col">
      {/* TODO: 대표 사진으로 교체 (next/image) */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-stone-200 to-stone-300 text-sm text-stone-500">
        MAIN PHOTO
      </div>
      <div className="px-6 py-10 text-center">
        <p className="text-xs tracking-[0.3em] text-accent">WEDDING INVITATION</p>
        <h1 className="mt-4 font-serif text-2xl text-ink">
          {groom.name}
          <span className="mx-3 text-accent">·</span>
          {bride.name}
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted">
          {formatWeddingDate()}
          <br />
          {venue.name} {venue.hall}
        </p>
      </div>
    </section>
  );
}
