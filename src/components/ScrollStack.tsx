"use client";

import React, {ComponentClass, useRef} from "react";
import {motion, MotionValue, useScroll, useTransform} from "framer-motion";

interface Card {
    id: number | string;
    title: string;
    bg: string;
    iframe: ComponentClass
}

interface StackParams {
    startY: number;    // początkowa pozycja Y dla kart w tle
    stackY: number;    // docelowe odsunięcie w stacku (wystające z dołu)
    baseScale: number; // skala najmniejszej karty
    scaleStep: number; // przyrost skali dla kolejnych kart
    scaleBack: number; // cofnięcie po osiągnięciu miejsca docelowego
}

const DEFAULT_PARAMS: StackParams = {
    startY: 600,
    stackY: 30,
    baseScale: 0.95,
    scaleStep: 0.05,
    scaleBack: 0.95,
};

const useCardAnimation = (
    scrollYProgress: MotionValue<number>,
    index: number,
    numCards: number,
    params: StackParams = DEFAULT_PARAMS
) => {
    const {startY, stackY, baseScale, scaleStep, scaleBack} = params;

    // Pierwsza karta: start i end są takie same, więc transformacja będzie stała
    const remainingCards = numCards - 1;
    const relativeIndex = index === 0 ? 0 : index - 1;
    const segment = 1 / Math.max(remainingCards, 1);

    const cardStart = index === 0 ? 0 : relativeIndex * segment;
    const cardEnd = index === 0 ? 0 : (relativeIndex + 1) * segment;

    const y = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        [index === 0 ? stackY * index : startY, stackY * index]
    );

    const scale = useTransform(
        scrollYProgress,
        [cardStart, cardEnd],
        [baseScale + scaleStep * index, scaleBack + scaleStep * index]
    );

    return {y, scale};
};


interface ScrollStackProps {
    cards: Card[];
    params?: StackParams;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({cards, params}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const numCards = cards.length;
    const stackParams = params || DEFAULT_PARAMS;

    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{height: `${100 * numCards}vh`}}
        >
            <div className="sticky top-0 h-screen w-full">
                {cards.map((card, index) => {
                    const {y, scale} = useCardAnimation(scrollYProgress, index, numCards, stackParams);
                    const IframeComponent = card.iframe
                    return (
                        <motion.div
                            key={card.id}
                            style={{
                                y,
                                scale,
                                zIndex: index + 1, // rosnący index = karta wyżej
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                width: "70%",
                                height: 352,
                                margin: "auto",
                                transformOrigin: "top center", // ważne, żeby wjeżdżając w stack karta rosła od góry
                                pointerEvents: "none",
                            }}
                            className={`flex items-center justify-center rounded-2xl shadow-xl ${card.bg}`}
                        >
                            <IframeComponent/>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScrollStack;
