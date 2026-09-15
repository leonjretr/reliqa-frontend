import { useEffect, type RefObject } from "react";

import { FEED_LOAD_MORE_THRESHOLD } from "@/config";
import type { FeedEntry } from "@/service/types";

import { useActiveSlide } from "./useActiveSlide";
import { useFeedEntries } from "./useFeedEntries";

export const useInfiniteFeed = (
  initialEntries: FeedEntry[],
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const { entries, loadMore } = useFeedEntries(initialEntries);
  const activeIndex = useActiveSlide(containerRef, entries.length);

  useEffect(() => {
    if (activeIndex >= entries.length - FEED_LOAD_MORE_THRESHOLD) {
      loadMore();
    }
  }, [activeIndex, entries.length, loadMore]);

  return entries;
};
