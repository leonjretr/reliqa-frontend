import { useEffect, useState, type RefObject } from "react";

import { FEED_ACTIVE_SLIDE_RATIO } from "@/config";

export const SLIDE_ATTRIBUTE = "data-slide";

export const useActiveSlide = (containerRef: RefObject<HTMLDivElement | null>, count: number) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (observed) => {
        observed.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= FEED_ACTIVE_SLIDE_RATIO) {
            setActiveIndex(Number(entry.target.getAttribute(SLIDE_ATTRIBUTE)));
          }
        });
      },
      { root, threshold: [FEED_ACTIVE_SLIDE_RATIO] },
    );
    root.querySelectorAll(`[${SLIDE_ATTRIBUTE}]`).forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [containerRef, count]);

  return activeIndex;
};
