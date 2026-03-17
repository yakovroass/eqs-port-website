"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          left: pos.x - 300,
          top: pos.y - 300,
          background:
            "radial-gradient(circle, rgba(0,168,255,0.08) 0%, rgba(0,168,255,0.02) 40%, transparent 70%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </div>
  );
}
