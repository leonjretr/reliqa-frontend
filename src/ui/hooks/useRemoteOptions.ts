import { useEffect, useRef, useState, useTransition } from "react";

import { SEARCH_DEBOUNCE_MS } from "@/config";

import { useDebouncedValue } from "./useDebouncedValue";

type Options<Item> = {
  query: string;
  fetchOptions: (query?: string) => Promise<Item[]>;
  initialOptions: Item[];
  onResults?: (items: Item[]) => void;
};

export const useRemoteOptions = <Item>({
  query,
  fetchOptions,
  initialOptions,
  onResults,
}: Options<Item>) => {
  const [results, setResults] = useState(initialOptions);
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    startTransition(async () => {
      const items = await fetchOptions(debouncedQuery || undefined);
      if (requestIdRef.current !== requestId) return;
      setResults(items);
      onResults?.(items);
    });
  }, [debouncedQuery, fetchOptions, onResults]);

  return { results, isPending };
};
