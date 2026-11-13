"use client";

import { useCallback, useEffect, useState } from "react";
import type { Gender } from "@/components/pixel/guestSprite";
import { addGuest, type Guest, loadGuests } from "@/lib/guests";

/** 단체사진 하객 목록 + 새로 합류한 하객(입장 연출용) */
export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newestId, setNewestId] = useState<string>();

  useEffect(() => {
    let alive = true;
    loadGuests().then((list) => alive && setGuests(list));
    return () => {
      alive = false;
    };
  }, []);

  const join = useCallback(async (name: string, gender: Gender, seed: number) => {
    const guest = await addGuest(name, gender, seed);
    setGuests((list) => [...list, guest]);
    setNewestId(guest.id);
    return guest;
  }, []);

  return { guests, newestId, join };
}
