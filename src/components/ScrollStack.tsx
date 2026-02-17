"use client";

import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const IconSpotify = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Spotify</title>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const IconArrowRight = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Arrow Right</title>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export interface Artist {
  name: string;
  url: string;
}

export interface SongData {
  id: number | string;
  title: string;
  artists: Artist[];
  color: string;
  spotifyUrl: string;
  coverImage?: string;
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

const artistKlaudiaMaria: Artist = {
  name: "Klaudia-Maria",
  url: "https://open.spotify.com/artist/2KYsFutx6XahOKU5FKvglS",
};

const artistGreg: Artist = {
  name: "Greg Strangler",
  url: "https://open.spotify.com/artist/4GNfmsk4UMneqeoOldw3vN",
};

const songs: SongData[] = [
  {
    id: 1,
    title: "Toksyczny",
    artists: [artistKlaudiaMaria],
    color: "rgb(48, 64, 56)",
    spotifyUrl: "https://open.spotify.com/track/6yRyOXOi8aZyT1BQFIAses",
    coverImage: "/songs/toksyczny.jpeg",
  },
  {
    id: 2,
    title: "Ghosting",
    artists: [artistKlaudiaMaria],
    color: "rgb(133, 61, 0)",
    spotifyUrl: "https://open.spotify.com/track/3P4u2xwspyWcwN6BUt1YAw",
    coverImage: "/songs/ghosting.jpeg",
  },
  {
    id: 3,
    title: "Chcę zapomnieć",
    artists: [artistKlaudiaMaria],
    color: "rgb(158, 0, 41)",
    spotifyUrl: "https://open.spotify.com/track/2pOe7Ambcy8TooJUazmBwC",
    coverImage: "/songs/zapomniec.jpeg",
  },
  {
    id: 4,
    title: "Nowe rozdanie",
    artists: [artistKlaudiaMaria],
    color: "rgb(31, 31, 31)",
    spotifyUrl: "https://open.spotify.com/track/1ZPYNtCNTDXj4tJzaXCQWS",
    coverImage: "/songs/rozdanie.jpeg",
  },
  {
    id: 5,
    title: "Miałam wiarę",
    artists: [artistKlaudiaMaria],
    color: "rgb(89, 61, 171)",
    spotifyUrl: "https://open.spotify.com/track/7ak8O1AmGGafGcOr4a9m0b",
    coverImage: "/songs/wiare.jpeg",
  },
  {
    id: 6,
    title: "Brakuje tchu",
    artists: [artistKlaudiaMaria, artistGreg],
    color: "rgb(149, 33, 73)",
    spotifyUrl: "https://open.spotify.com/track/6GRvoG794YU0N0tIVdslp9",
    coverImage: "/songs/brakujetchu.jpeg",
  },
  {
    id: 7,
    title: "Wernisaż",
    artists: [artistKlaudiaMaria],
    color: "rgb(28, 45, 80)",
    spotifyUrl: "https://open.spotify.com/track/7pjiQBQyMhdgUZzitMm6xO",
    coverImage: "/songs/wernisaz.jpeg",
  },
];

const SongCardComponent = ({ song }: { song: SongData }) => {
  return (
    <div
      className="relative w-full h-full flex items-center p-6 md:p-8 text-white select-none overflow-hidden"
      style={{ backgroundColor: song.color }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-noise" />
      <div className="absolute right-[20px] top-[20px] sm:right-[40px] sm:top-[40px]">
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Open in Spotify"
        >
          <IconSpotify className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </div>
      <div className="relative z-10 w-full h-full grid grid-cols-[1fr] md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-xl aspect-square w-36 md:w-64 shadow-2xl bg-white/10 overflow-hidden flex-shrink-0 mx-auto md:mx-0 group cursor-pointer block"
        >
          {song.coverImage ? (
            <Image
              src={song.coverImage}
              alt={song.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 group-hover:text-white/30 transition-colors">
              <IconSpotify className="w-16 h-16" />
            </div>
          )}
        </a>
        <div className="flex flex-col justify-between h-full py-2 w-full">
          <div className="flex-grow flex flex-col justify-center gap-1 mb-4 text-left">
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-white/40 underline-offset-4 decoration-2"
            >
              <h3 className="text-2xl md:text-3xl font-bold leading-tight hover:text-white/90 transition-colors">
                {song.title}
              </h3>
            </a>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-3 flex-wrap">
              <div className="flex gap-1">
                {song.artists.map((artist, i) => (
                  <span key={artist.name}>
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors hover:underline decoration-white/40 underline-offset-2"
                    >
                      {artist.name}
                    </a>
                    {i < song.artists.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between w-full mt-auto">
            <div className="flex items-center gap-4 ml-auto">
              <a
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group/more"
              >
                <span className="text-sm font-medium">Więcej</span>
                <IconArrowRight className="w-5 h-5 group-hover/more:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SongCard = memo(SongCardComponent);
SongCard.displayName = "SongCard";

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
  song: SongData;
  index: number;
  totalCards: number;
  viewportHeight: number;
  scrollYProgress: MotionValue<number>;
}

const CardItemComponent = ({
  song,
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
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
      willChange: "transform, opacity",
      contain: "layout style paint",
    }),
    [y, scale, index],
  );

  return (
    <motion.div
      layoutId={`card-${song.id}`}
      style={cardStyle}
      className="rounded-2xl overflow-hidden"
    >
      <SongCard song={song} />
    </motion.div>
  );
};

const CardItem = memo(CardItemComponent);
CardItem.displayName = "CardItem";

const ScrollsStackComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState(800);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setViewportHeight(window.innerHeight);
    }, 100);
  }, []);

  useEffect(() => {
    setViewportHeight(window.innerHeight);

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

  const containerHeight = useMemo(() => `${100 * songs.length}vh`, []);

  const renderedCards = useMemo(
    () =>
      songs.map((song, index) => (
        <CardItem
          key={song.id}
          song={song}
          index={index}
          totalCards={songs.length}
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
};

const ScrollStack = memo(ScrollsStackComponent);

ScrollStack.displayName = "ScrollStack";

export default ScrollStack;
