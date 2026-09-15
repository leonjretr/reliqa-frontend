import { AVATAR_TONES, INITIALS_LENGTH } from "@/config";
import type { APIUserSummary } from "@/service/types";

import { splitWords } from "./text";

type KeeperNameSource = Pick<APIUserSummary, "first_name" | "last_name" | "username">;

export const formatKeeperName = (user: KeeperNameSource) => {
  const fullName = `${user.first_name} ${user.last_name}`.trim();
  return fullName || user.username;
};

export const getFirstName = (name: string) => splitWords(name)[0] ?? "";

export const getInitials = (name: string) =>
  splitWords(name)
    .slice(0, INITIALS_LENGTH)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const pickTone = (name: string) => {
  const sum = [...name].reduce((total, char) => total + char.charCodeAt(0), 0);
  return AVATAR_TONES[sum % AVATAR_TONES.length];
};
