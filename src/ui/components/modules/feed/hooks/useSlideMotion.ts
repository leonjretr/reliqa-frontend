import type { RefObject } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

const FULL_PASS = [0, 0.5, 1];
const CENTER_PASS = [0.3, 0.5, 0.7];

export const useSlideMotion = (
  containerRef: RefObject<HTMLDivElement | null>,
  slideRef: RefObject<HTMLElement | null>,
) => {
  const isReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: slideRef,
    offset: ["start end", "end start"],
  });

  return {
    isReducedMotion,
    photoY: useTransform(scrollYProgress, FULL_PASS, ["9%", "0%", "-9%"]),
    photoScale: useTransform(scrollYProgress, FULL_PASS, [1.08, 1, 1.08]),
    shade: useTransform(scrollYProgress, FULL_PASS, [0.75, 0, 0.75]),
    copyOpacity: useTransform(scrollYProgress, CENTER_PASS, [0, 1, 0]),
    copyY: useTransform(scrollYProgress, CENTER_PASS, [48, 0, -24]),
    railX: useTransform(scrollYProgress, CENTER_PASS, [28, 0, 28]),
  };
};
