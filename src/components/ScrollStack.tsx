"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export interface Card {
  id: number | string;
  iframe: React.ReactNode;
}

interface StackParams {
  startY: number;
  stackY: number;
  baseScale: number;
  scaleStep: number;
  scaleBack: number;
}

const DEFAULT_PARAMS: StackParams = {
  startY: 600,
  stackY: 30,
  baseScale: 0.95,
  scaleStep: 0.08,
  scaleBack: 0.95,
};

const ToksycznyIframe = () => (
  <iframe
    style={{ borderRadius: "12px" }}
    src="https://open.spotify.com/embed/track/6yRyOXOi8aZyT1BQFIAses?utm_source=generator"
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  />
);

const GhostingIframe = () => (
  <iframe
    style={{ borderRadius: "12px" }}
    src="https://open.spotify.com/embed/track/3P4u2xwspyWcwN6BUt1YAw?utm_source=generator"
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  />
);

const ChceZapomniecIframe = () => (
  <iframe
    style={{ borderRadius: "12px" }}
    src="https://open.spotify.com/embed/track/2pOe7Ambcy8TooJUazmBwC?utm_source=generator"
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  />
);

const NoweRozdanieIframe = () => (
  <iframe
    style={{ borderRadius: "12px" }}
    src="https://open.spotify.com/embed/track/1ZPYNtCNTDXj4tJzaXCQWS?utm_source=generator&theme=0"
    width="100%"
    height="352"
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  />
);

const MialamWiareIframe = () => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/7ak8O1AmGGafGcOr4a9m0b?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const BrakujeTchuIframe = () => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/6GRvoG794YU0N0tIVdslp9?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const cards = [
  { id: 1, iframe: ToksycznyIframe },
  { id: 2, iframe: GhostingIframe },
  { id: 3, iframe: ChceZapomniecIframe },
  { id: 4, iframe: NoweRozdanieIframe },
  { id: 5, iframe: MialamWiareIframe },
  { id: 6, iframe: BrakujeTchuIframe },
];

const useCardAnimation = (
  scrollYProgress: MotionValue<number>,
  index: number,
  numCards: number,
  viewportHeight: number,
  params: StackParams = DEFAULT_PARAMS,
) => {
  const { stackY, baseScale, scaleStep, scaleBack } = params;
  const startY = viewportHeight + 100;

  const remainingCards = numCards - 1;
  const relativeIndex = index === 0 ? 0 : index - 1;
  const segment = 1 / Math.max(remainingCards, 1);

  const cardStart = index === 0 ? 0 : relativeIndex * segment;
  const cardEnd = index === 0 ? 0 : (relativeIndex + 1) * segment;

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [index === 0 ? stackY * index : startY, stackY * index],
  );

  const scaleBase = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [baseScale + scaleStep * index, scaleBack + scaleStep * index],
  );

  // ✅ shrink efekt – każdy hook wywołany zawsze!
  const extraShrink = useTransform(
    scrollYProgress,
    [cardEnd, Math.min(cardEnd + 0.1, 1)], // ~200px
    index === 0 ? [0, 0] : [0, -0.03], // tylko karty > 0
  );

  const scale: MotionValue<number> = useTransform(
    [scaleBase, extraShrink] as [MotionValue<number>, MotionValue<number>],
    ([s, shrink]: number[]) => s + shrink,
  );

  return { y, scale };
};

const ScrollStack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${100 * cards.length}vh` }}
    >
      <div className="sticky top-0 text-center fade-in">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Dyskografia</h2>
        <div className="h-1 w-24 bg-gradient-accent mx-auto" />
      </div>
      <div className="sticky top-0 h-screen w-full">
        {cards.map((card, index) => {
          const { y, scale } = useCardAnimation(
            scrollYProgress,
            index,
            cards.length,
            viewportHeight,
          );
          const IframeComponent = card.iframe;

          return (
            <motion.div
              key={card.id}
              style={{
                y,
                scale,
                zIndex: index + 1,
                position: "absolute",
                width: "70%",
                height: 352,
                margin: "auto",
                inset: 0,
                transformOrigin: "top center",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
              className="rounded-2xl overflow-hidden"
            >
              <IframeComponent />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollStack;
