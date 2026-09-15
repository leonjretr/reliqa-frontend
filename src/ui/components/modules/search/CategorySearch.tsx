"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { usePathname, useRouter } from "@/i18n";
import { useDebouncedValue } from "@/ui/hooks";

const SEARCH_DEBOUNCE_MS = 300;

export const CategorySearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [value, setValue] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(value.trim(), SEARCH_DEBOUNCE_MS);
  const lastQueryRef = useRef(initialQuery);

  useEffect(() => {
    if (debouncedQuery === lastQueryRef.current) return;
    lastQueryRef.current = debouncedQuery;

    router.replace(
      { pathname, query: debouncedQuery ? { query: debouncedQuery } : {} },
      { scroll: false },
    );
  }, [debouncedQuery, pathname, router]);

  return (
    <label className="bg-chalk border-ink flex items-center gap-[8px] rounded-[3px] border px-[13px] py-[11px] shadow-[0_6px_14px_-8px_rgba(31,26,21,0.4)]">
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
        className="text-ink placeholder:text-ink-soft min-w-0 flex-1 bg-transparent text-[15px] font-light outline-none placeholder:italic [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  );
};
