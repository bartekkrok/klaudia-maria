"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface Card {
  id: number | string;
  iframe: React.ComponentType;
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

// Lazy-loaded iframe component with IntersectionObserver
interface LazyIframeProps {
  title: string;
  src: string;
}

const LazyIframe = memo(({ title, src }: LazyIframeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      style={{ borderRadius: "12px" }}
      src={isVisible ? src : "about:blank"}
      width="100%"
      height="352"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
});

LazyIframe.displayName = "LazyIframe";

// Memoized iframe components
const ToksycznyIframe = memo(() => (
  <LazyIframe
    title="Toksyczny - Spotify Player"
    src="https://open.spotify.com/embed/track/6yRyOXOi8aZyT1BQFIAses?utm_source=generator"
  />
));
ToksycznyIframe.displayName = "ToksycznyIframe";

const GhostingIframe = memo(() => (
  <LazyIframe
    title="Ghosting - Spotify Player"
    src="https://open.spotify.com/embed/track/3P4u2xwspyWcwN6BUt1YAw?utm_source=generator"
  />
));
GhostingIframe.displayName = "GhostingIframe";

const ChceZapomniecIframe = memo(() => (
  <LazyIframe
    title="Chcę zapomnieć - Spotify Player"
    src="https://open.spotify.com/embed/track/2pOe7Ambcy8TooJUazmBwC?utm_source=generator"
  />
));
ChceZapomniecIframe.displayName = "ChceZapomniecIframe";

const NoweRozdanieIframe = memo(() => (
  <LazyIframe
    title="Nowe rozdanie - Spotify Player"
    src="https://open.spotify.com/embed/track/1ZPYNtCNTDXj4tJzaXCQWS?utm_source=generator&theme=0"
  />
));
NoweRozdanieIframe.displayName = "NoweRozdanieIframe";

const MialamWiareIframe = memo(() => (
  <LazyIframe
    title="Miałam wiarę - Spotify Player"
    src="https://open.spotify.com/embed/track/7ak8O1AmGGafGcOr4a9m0b?utm_source=generator"
  />
));
MialamWiareIframe.displayName = "MialamWiareIframe";

const BrakujeTchuIframe = memo(() => (
  <LazyIframe
    title="Brakuje tchu - Spotify Player"
    src="https://open.spotify.com/embed/track/6GRvoG794YU0N0tIVdslp9?utm_source=generator"
  />
));
BrakujeTchuIframe.displayName = "BrakujeTchuIframe";

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

  // Memoize calculations that don't change
  const animationConfig = useMemo(() => {
    const startY = viewportHeight + 100;
    const remainingCards = numCards - 1;
    const relativeIndex = index === 0 ? 0 : index - 1;
    const segment = 1 / Math.max(remainingCards, 1);
    const cardStart = index === 0 ? 0 : relativeIndex * segment;
    const cardEnd = index === 0 ? 0 : (relativeIndex + 1) * segment;

    return {
      startY,
      cardStart,
      cardEnd,
      yRange: [index === 0 ? stackY * index : startY, stackY * index] as [
        number,
        number,
      ],
      scaleRange: [
        baseScale + scaleStep * index,
        scaleBack + scaleStep * index,
      ] as [number, number],
      shrinkRange: [cardEnd, Math.min(cardEnd + 0.1, 1)] as [number, number],
      shrinkValues: (index === 0 ? [0, 0] : [0, -0.03]) as [number, number],
    };
  }, [
    index,
    numCards,
    viewportHeight,
    stackY,
    baseScale,
    scaleStep,
    scaleBack,
  ]);

  const y = useTransform(
    scrollYProgress,
    [animationConfig.cardStart, animationConfig.cardEnd],
    animationConfig.yRange,
  );

  const scaleBase = useTransform(
    scrollYProgress,
    [animationConfig.cardStart, animationConfig.cardEnd],
    animationConfig.scaleRange,
  );

  const extraShrink = useTransform(
    scrollYProgress,
    animationConfig.shrinkRange,
    animationConfig.shrinkValues,
  );

  const scale: MotionValue<number> = useTransform(
    [scaleBase, extraShrink] as [MotionValue<number>, MotionValue<number>],
    ([s, shrink]: number[]) => s + shrink,
  );

  return { y, scale };
};

interface CardItemProps {
  card: Card;
  index: number;
  totalCards: number;
  viewportHeight: number;
  scrollYProgress: MotionValue<number>;
}

const CardItem = memo(
  ({
    card,
    index,
    totalCards,
    viewportHeight,
    scrollYProgress,
  }: CardItemProps) => {
    const { y, scale } = useCardAnimation(
      scrollYProgress,
      index,
      totalCards,
      viewportHeight,
    );
    const IframeComponent = card.iframe;

    // Memoize style object to prevent unnecessary re-renders
    const cardStyle = useMemo(
      () => ({
        y,
        scale,
        zIndex: index + 1,
        position: "absolute" as const,
        width: "70%",
        height: 352,
        margin: "auto",
        inset: 0,
        transformOrigin: "top center",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        willChange: "transform, opacity",
        contain: "layout style paint",
      }),
      [y, scale, index],
    );

    return (
      <motion.div
        layoutId={`card-${card.id}`}
        style={cardStyle}
        className="rounded-2xl overflow-hidden"
      >
        <IframeComponent />
      </motion.div>
    );
  },
);

CardItem.displayName = "CardItem";

const ScrollStack = memo(() => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(800);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setViewportHeight(window.innerHeight);
    }, 100);
  }, []);

  useEffect(() => {
    // Set initial viewport height
    setViewportHeight(window.innerHeight);

    // Add resize listener with debounce
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Memoize container height
  const containerHeight = useMemo(() => `${100 * cards.length}vh`, []);

  // Memoize cards rendering
  const renderedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <CardItem
          key={card.id}
          card={card}
          index={index}
          totalCards={cards.length}
          viewportHeight={viewportHeight}
          scrollYProgress={scrollYProgress}
        />
      )),
    [viewportHeight, scrollYProgress],
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 text-center fade-in max-md:-mt-[80px] pt-[80px] max-md:mb-[-150px]">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Dyskografia</h2>
        <div className="h-1 w-24 bg-gradient-accent mx-auto" />
      </div>
      <div
        className="sticky top-0 h-screen w-full"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {renderedCards}
      </div>
    </div>
  );
});

ScrollStack.displayName = "ScrollStack";

export default ScrollStack;
