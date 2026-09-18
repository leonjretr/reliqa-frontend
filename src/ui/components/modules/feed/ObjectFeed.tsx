"use client";

import { useRef } from "react";

import type { APIObject } from "@/service/types";
import { toFeedCard } from "@/ui/utils";

import { useInfiniteFeed } from "./hooks";
import { EmptyFeed, FeedTopBar, Slide } from "./sections";

type Props = {
  initialEntries: APIObject[];
};

export const ObjectFeed = ({ initialEntries }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const entries = useInfiniteFeed(initialEntries, containerRef);

  if (entries.length === 0) {
    return <EmptyFeed />;
  }

  return (
    <div className="bg-night relative h-full w-full">
      <div
        ref={containerRef}
        className="scrollbar-hidden relative h-full snap-y snap-mandatory overflow-y-auto"
      >
        {entries.map(toFeedCard).map((card, index) => (
          <Slide
            key={`${card.objectId}-${index}`}
            card={card}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
      <FeedTopBar />
    </div>
  );
};
