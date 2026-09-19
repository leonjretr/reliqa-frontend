import { motion, type MotionValue } from "framer-motion";

import { cn } from "@/ui/utils";

const MIN_SEGMENTS = 2;

type Props = {
  count: number;
  activeIndex: number;
  opacity: MotionValue<number>;
};

export const PhotoSegments = ({ count, activeIndex, opacity }: Props) => {
  if (count < MIN_SEGMENTS) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-3 top-2 flex gap-1"
      style={{ opacity }}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={cn(
            "h-0.5 flex-1 rounded-full transition-colors",
            index <= activeIndex ? "bg-chalk" : "bg-chalk/35",
          )}
        />
      ))}
    </motion.div>
  );
};
