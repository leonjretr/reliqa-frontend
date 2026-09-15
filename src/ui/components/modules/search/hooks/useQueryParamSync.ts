import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SEARCH_DEBOUNCE_MS } from "@/config";
import { usePathname, useRouter } from "@/i18n";
import { useDebouncedValue } from "@/ui/hooks";

export const useQueryParamSync = (param: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get(param) ?? "";
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebouncedValue(value.trim(), SEARCH_DEBOUNCE_MS);
  const lastValueRef = useRef(initialValue);

  useEffect(() => {
    if (debouncedValue === lastValueRef.current) return;
    lastValueRef.current = debouncedValue;

    router.replace(
      { pathname, query: debouncedValue ? { [param]: debouncedValue } : {} },
      { scroll: false },
    );
  }, [debouncedValue, param, pathname, router]);

  return [value, setValue] as const;
};
