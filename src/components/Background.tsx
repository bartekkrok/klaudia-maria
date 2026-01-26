"use client";

import { memo } from "react";
import LiquidEther from "@/components/LiguidEther";

const Background = memo(() => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        opacity: 0.3,
        pointerEvents: "none",
        contain: "layout style paint",
      }}
    >
      <LiquidEther
        colors={["#d742a5", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5} // Will auto-adjust to 0.25 on mobile
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
    </div>
  );
});

Background.displayName = "Background";

export default Background;
