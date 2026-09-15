import { FieldValues, Path, UseFormSetError } from "react-hook-form";

import type { ActionFailure } from "@/service/types";

export const applyActionErrors = <T extends FieldValues>(
  result: ActionFailure,
  setError: UseFormSetError<T>,
  fields: Path<T>[],
  fallback: string,
) => {
  const errors = result.errors?.length ? result.errors : undefined;

  if (!errors) {
    setError("root", { message: fallback });
    return;
  }

  errors.forEach((error) => {
    const field = fields.find((name) => name === error.attr);
    setError(field ?? "root", { message: error.detail });
  });
};
