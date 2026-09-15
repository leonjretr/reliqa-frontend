import { useCallback, useRef, useState } from "react";

import { FEED_LOAD_MORE_BATCH_SIZE } from "@/config";
import { loadFeedEntries } from "@/service/actions";
import type { FeedEntry } from "@/service/types";

export const useFeedEntries = (initialEntries: FeedEntry[]) => {
  const [entries, setEntries] = useState(initialEntries);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    loadFeedEntries(FEED_LOAD_MORE_BATCH_SIZE).then((moreEntries) => {
      isLoadingRef.current = false;

      if (moreEntries.length === 0) return;

      setEntries((current) => [...current, ...moreEntries]);
    });
  }, []);

  return { entries, loadMore };
};
