import { useCallback, useRef, useState } from "react";

import { FEED_LOAD_MORE_BATCH_SIZE } from "@/config";
import { loadFeedEntries } from "@/service/actions";
import type { FeedEntry } from "@/service/types";
import { dedupeByObject } from "@/ui/utils";

export const useFeedEntries = (initialEntries: FeedEntry[]) => {
  const [entries, setEntries] = useState(() => dedupeByObject(initialEntries));
  const isLoadingRef = useRef(false);
  const hasReachedEndRef = useRef(false);
  const seenIdsRef = useRef(new Set(entries.map((entry) => entry.object.id)));

  const loadMore = useCallback(() => {
    if (hasReachedEndRef.current || isLoadingRef.current) return;

    isLoadingRef.current = true;
    loadFeedEntries(FEED_LOAD_MORE_BATCH_SIZE, [...seenIdsRef.current]).then((moreEntries) => {
      isLoadingRef.current = false;
      const additions = moreEntries.filter((entry) => !seenIdsRef.current.has(entry.object.id));

      if (additions.length === 0) {
        hasReachedEndRef.current = true;
        return;
      }

      additions.forEach((entry) => seenIdsRef.current.add(entry.object.id));
      setEntries((current) => [...current, ...additions]);
    });
  }, []);

  return { entries, loadMore };
};
