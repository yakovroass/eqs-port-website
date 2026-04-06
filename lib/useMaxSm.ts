"use client";

import { useLayoutEffect, useState } from "react";

/** תואם ל־`max-sm` בטיילווינד — תנועת y קטנה יותר במובייל בלי לשנות הילת box-shadow */
export function useMaxSm() {
  const [maxSm, setMaxSm] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setMaxSm(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return maxSm;
}
