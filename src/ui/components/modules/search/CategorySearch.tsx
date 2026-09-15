"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { QUERIES, SEARCH_DEBOUNCE_MS } from "@/config";
import { usePathname, useRouter } from "@/i18n";
import { useDebouncedValue } from "@/ui/hooks";

export const CategorySearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get(QUERIES.QUERY) ?? "";
  const [value, setValue] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(value.trim(), SEARCH_DEBOUNCE_MS);
  const lastQueryRef = useRef(initialQuery);

  useEffect(() => {
    if (debouncedQuery === lastQueryRef.current) return;
    lastQueryRef.current = debouncedQuery;

    router.replace(
      { pathname, query: debouncedQuery ? { [QUERIES.QUERY]: debouncedQuery } : {} },
      { scroll: false },
    );
  }, [debouncedQuery, pathname, router]);

  return (
    <label className="bg-chalk border-ink rounded-paper shadow-card flex items-center gap-2 border px-3.25 py-2.75">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink-faint flex-none"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="a camera, a radio, a chair…"
        aria-label="Search categories"
        className="text-ink placeholder:text-ink-soft text-copy min-w-0 flex-1 bg-transparent font-light outline-none placeholder:italic [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  );
};
