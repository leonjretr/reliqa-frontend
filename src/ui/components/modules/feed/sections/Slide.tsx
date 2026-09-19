import { useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";

import { PhotoShade } from "@/ui/components/common/PhotoShade";
import type { FeedCard } from "@/ui/types";

import { SLIDE_ATTRIBUTE, useSlideMotion } from "../hooks";
import { PhotoSegments } from "./PhotoSegments";
import { SlideCopy } from "./SlideCopy";
import { SlidePhotos } from "./SlidePhotos";
import { SlideRail } from "./SlideRail";

type Props = {
  card: FeedCard;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const Slide = ({ card, index, containerRef }: Props) => {
  const slideRef = useRef<HTMLElement>(null);
  const motionValues = useSlideMotion(containerRef, slideRef);
  const { isReducedMotion } = motionValues;
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section
      ref={slideRef}
      {...{ [SLIDE_ATTRIBUTE]: index }}
      className="relative h-full w-full flex-none snap-start snap-always overflow-hidden"
    >
      <motion.div
        className="-top-parallax -bottom-parallax absolute inset-x-0"
        style={
          isReducedMotion ? undefined : { y: motionValues.photoY, scale: motionValues.photoScale }
        }
      >
        <SlidePhotos
          photos={card.photos}
          alt={card.name}
          category={card.categorySlug}
          isFirstSlide={index === 0}
          onChange={setPhotoIndex}
        />
      </motion.div>
      <PhotoShade variant="feed" />
      <PhotoSegments
        count={card.photos.length}
        activeIndex={photoIndex}
        opacity={motionValues.copyOpacity}
      />
      <SlideRail
        card={card}
        opacity={motionValues.copyOpacity}
        x={isReducedMotion ? 0 : motionValues.railX}
      />
      <SlideCopy
        card={card}
        opacity={motionValues.copyOpacity}
        y={isReducedMotion ? 0 : motionValues.copyY}
      />
      <motion.div
        className="bg-night pointer-events-none absolute inset-0"
        style={{ opacity: motionValues.shade }}
      />
    </section>
  );
};
