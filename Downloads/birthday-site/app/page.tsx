"use client";

import { useState } from "react";
import CandleSection from "@/components/CandleSection";
import HeroSection from "@/components/HeroSection";
import FloatingElements from "@/components/FloatingElements";

export default function BirthdayPage() {
  const [candleBlown, setCandleBlown] = useState(false);

  const handleBlowCandle = () => {
    setCandleBlown(true);
    import("canvas-confetti").then((confetti) => {
      const end = Date.now() + 3500;
      const colors = ["#ff6b9d", "#ffd93d", "#6bcb77", "#4d96ff", "#c77dff"];
      const frame = () => {
        confetti.default({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti.default({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    });
  };

  return (
    <main className="min-h-screen bg-[#0d0a1a] overflow-x-hidden relative">
      <FloatingElements />
      <HeroSection />
      <CandleSection candleBlown={candleBlown} onBlow={handleBlowCandle} />
    </main>
  );
}