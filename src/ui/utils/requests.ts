import type { ActionResult } from "@/service/types";

export const sendFormData = async <T = unknown>(
  url: string,
  method: "POST" | "PATCH",
  body: FormData,
): Promise<ActionResult<T>> => {
  const response = await fetch(url, { method, body });
  return (await response.json()) as ActionResult<T>;
};
