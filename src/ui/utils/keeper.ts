import type { APIUserSummary } from "@/service/types";

export const formatKeeperName = (user: APIUserSummary) => {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  return fullName || user.username;
};
