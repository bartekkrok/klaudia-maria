"use client";

import { gsap } from "gsap";
import type React from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number,
): number => {
  const get = useCallback(() => {
    if (typeof window === "undefined") return defaultValue;
    const index = queries.findIndex((q) => matchMedia(q).matches);
    return values[index] ?? defaultValue;
  }, [queries, values, defaultValue]);

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get());

    // Create matchers once
    const matchers = queries.map((q) => matchMedia(q));

    // Add listeners
    matchers.forEach((mql) => {
      mql.addEventListener("change", handler);
    });

    // Cleanup
    return () => {
      matchers.forEach((mql) => {
        mql.removeEventListener("change", handler);
      });
    };
  }, [get, queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

interface GridItem {
  id: string;
  img: string;
  x: number;
  y: number;
  w: number;
  h: number;
  index: number;
}

interface MasonryProps {
  images: string[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const INITIAL_BATCH_SIZE = 12;

// Deterministic random aspect ratio generator based on string hash or index
const getAspectRatio = (index: number) => {
  const ratios = [0.8, 1, 1.2, 1.5]; // Various aspect ratios (Height / Width)
  return ratios[(index * 7) % ratios.length];
};

const MasonryGallery: React.FC<MasonryProps> = ({
  images,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  // Memoize constant arrays to prevent re-renders loops in useMedia
  const mediaQueries = useMemo(
    () => [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [],
  );
  const mediaValues = useMemo(() => [5, 4, 3, 2], []);

  const columns = useMedia(
    mediaQueries,
    mediaValues,
    2, // Default to 2 columns to avoid 1 column flicker
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowHeaderHeight, setWindowHeaderHeight] = useState(0);
  // Ref to track which images have been animated to avoid re-animating them
  const animatedIds = useRef<Set<string>>(new Set());

  // Track window height for collapse logic
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowHeaderHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine collapse height limit based on screen size
  const collapseHeightLimit = useMemo(() => {
    if (typeof window === "undefined" || windowHeaderHeight === 0) return 1000; // Default fallback
    // Logic: 80% of screen but at least 600px mobile / 1000px desktop
    // We can infer desktop/mobile roughly from width or useMedia, but let's stick to the CSS logic
    const isMobile = width < 768; // Rough breakpoint, strictly speaking uses measure width
    const minH = isMobile ? 600 : 1000;
    return Math.max(windowHeaderHeight * 0.8, minH);
  }, [windowHeaderHeight, width]);

  // Calculate full layout immediately using deterministic heights
  const fullGrid = useMemo<GridItem[]>(() => {
    // If width is 0, we can't calculate layout yet, but we shouldn't return empty if we have images
    // Wait for width
    if (!width || images.length === 0) return [];

    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return images.map((img, index) => {
      // Simple shortest-column fill
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);

      const ratio = getAspectRatio(index);
      const height = columnWidth * ratio;
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return {
        id: img, // Assuming unique URLs, else use img + index
        img,
        x,
        y,
        w: columnWidth,
        h: height,
        index,
      };
    });
  }, [columns, width, images]);

  // Determine which items to render
  const visibleGrid = useMemo(() => {
    if (isExpanded) return fullGrid;

    // In collapsed state, filter items that overflow the collapseHeightLimit
    // We also limit to INITIAL_BATCH_SIZE to avoid rendering too many if the screen is huge,
    // but the overflow check is the critical requested behavior.
    const candidates = fullGrid.slice(0, INITIAL_BATCH_SIZE * 2); // Taking a reasonable subset to check against height

    return candidates.filter((item) => {
      // Check if the item fits entirely within the collapse limit
      // We add a small buffer (e.g., 50px) to be safe or strict
      return item.y + item.h <= collapseHeightLimit;
    });
  }, [fullGrid, isExpanded, collapseHeightLimit]);

  // Calculate total height of the container based on visible items
  const containerHeight = useMemo(() => {
    if (visibleGrid.length === 0) return 0;
    return Math.max(...visibleGrid.map((item) => item.y + item.h));
  }, [visibleGrid]);

  useLayoutEffect(() => {
    if (visibleGrid.length === 0) return;

    visibleGrid.forEach((item, i) => {
      // Use index in visibleGrid to calculating stagger delay correctly for batches if we implemented batching
      // Here we just animate on mount.

      if (animatedIds.current.has(item.id)) {
        // Update position for existing items
        gsap.to(`[data-key="${CSS.escape(item.id)}"]`, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration: 0.5,
          ease: "power2.out",
        });
        return;
      }

      // New item animation
      const selector = `[data-key="${CSS.escape(item.id)}"]`;
      const startX = item.x;
      let startY = item.y + 100; // default bottom

      if (animateFrom === "bottom") startY = window.innerHeight + 100;

      gsap.fromTo(
        selector,
        {
          opacity: 0,
          x: startX,
          y: startY,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: "blur(10px)" }),
        },
        {
          opacity: 1,
          x: item.x,
          y: item.y,
          ...(blurToFocus && { filter: "blur(0px)" }),
          duration: duration,
          ease: ease,
          delay: (i % INITIAL_BATCH_SIZE) * stagger,
          onComplete: () => {
            animatedIds.current.add(item.id);
          },
        },
      );
    });
  }, [visibleGrid, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${CSS.escape(id)}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 10,
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${CSS.escape(id)}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        zIndex: 1,
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector(".color-overlay") as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<HTMLImageElement>(null);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const openModal = (img: string) => {
    setSelectedImage(img);
    // Animation will be handled by useEffect or ref callback
  };

  const closeModal = () => {
    // Animate out then clear state
    if (modalRef.current && modalImgRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setSelectedImage(null),
      });
      tl.to(modalImgRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      tl.to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "<",
      );
    } else {
      setSelectedImage(null);
    }
  };

  // Animate modal in
  useEffect(() => {
    if (selectedImage && modalRef.current && modalImgRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      tl.fromTo(
        modalImgRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
        "-=0.2",
      );
    }
  }, [selectedImage]);

  return (
    <>
      <div
        className={`relative w-full px-4 md:px-12 transition-all duration-1000 ease-in-out min-h-[600px] md:min-h-[1000px]`}
        style={{
          height: containerHeight > 0 ? containerHeight : undefined,
        }}
      >
        <div ref={containerRef} className="w-full h-full">
          {visibleGrid.map((item) => (
            <button
              key={item.id}
              type="button"
              data-key={item.id}
              className="absolute box-content cursor-pointer border-0 p-0 overflow-hidden rounded-[10px]"
              style={{ willChange: "transform, width, height, opacity" }}
              onClick={() => openModal(item.img)}
              onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openModal(item.img);
                }
              }}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-full object-cover block"
                loading="eager"
              />
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
              <div className="absolute inset-0 shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] pointer-events-none rounded-[10px]" />
            </button>
          ))}
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-[200px] z-10 flex items-end justify-center pb-10 pointer-events-none">
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="pointer-events-auto px-8 py-3 bg-white/50 hover:bg-white/80 backdrop-blur-md border border-neutral-900/20 rounded-full text-neutral-900 font-medium transition-all transform hover:scale-105 active:scale-95"
            >
              Więcej zdjęć
            </button>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop click handler */}
          <div
            className="absolute inset-0"
            onClick={closeModal}
            onKeyDown={(e) => e.key === "Enter" && closeModal()}
            role="button"
            tabIndex={0}
            aria-label="Close modal background"
          />

          <div
            ref={modalRef}
            className="relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={modalImgRef}
              src={selectedImage}
              alt="Full screen"
              className="max-h-[95vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
            <button
              type="button"
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              onClick={closeModal}
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;
