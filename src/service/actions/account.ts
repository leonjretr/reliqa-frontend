"use server";

import { getCurrentUser } from "@/service/api";
import { getSession } from "@/service/session";

export const loadCurrentUserId = async () => {
  if (!(await getSession())) {
    return undefined;
  }

  const user = await getCurrentUser();
  return user.success ? user.id : undefined;
};
