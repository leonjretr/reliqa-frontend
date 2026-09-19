import type { UIEvent } from "react";

import { KeptPhoto } from "@/ui/components/common/KeptPhoto";

type Props = {
  photos: string[];
  alt: string;
  category?: string;
  isFirstSlide: boolean;
  onChange: (index: number) => void;
};

export const SlidePhotos = ({ photos, alt, category, isFirstSlide, onChange }: Props) => {
  const sources = photos.length > 0 ? photos : [undefined];

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    onChange(Math.round(scrollLeft / clientWidth));
  };

  return (
    <div
      onScroll={handleScroll}
      className="scrollbar-hidden absolute inset-0 flex snap-x snap-mandatory overflow-x-auto"
    >
      {sources.map((src, index) => (
        <div key={index} className="relative h-full w-full flex-none snap-center snap-always">
          <KeptPhoto
            category={category}
            src={src}
            loading={isFirstSlide && index === 0 ? "eager" : "lazy"}
            alt={alt}
            className="absolute inset-0"
          />
        </div>
      ))}
    </div>
  );
};
