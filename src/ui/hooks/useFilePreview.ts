import { useEffect, useMemo } from "react";

export const useFilePreview = (file: File | null | undefined, fallback?: string) => {
  const objectUrl = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);

  useEffect(
    () => () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
    [objectUrl],
  );

  return objectUrl ?? fallback;
};
