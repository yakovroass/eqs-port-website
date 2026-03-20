import type { Metadata } from "next";
import MouseGlow from "@/components/MouseGlow";
import HeroFloatingParticles from "@/components/HeroFloatingParticles";

export const metadata: Metadata = {
  title: "רקע כמו באתר",
  robots: { index: false, follow: false },
};

/**
 * דף תצוגה מקדימה לרקע.
 * רשת + נקודות “אניות” (HeroFloatingParticles) + זוהר עכבר.
 */
export default function BgDemosPage() {
  return (
    <div className="fixed inset-0 z-[100] min-h-screen bg-[#050810]">
      <div className="animated-grid-bg absolute inset-0 pointer-events-none z-0" aria-hidden />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <HeroFloatingParticles variant="ships" />
      </div>
      <MouseGlow />
    </div>
  );
}
