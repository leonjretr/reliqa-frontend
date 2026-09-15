import { AVATAR_TONES, INITIALS_LENGTH } from "@/config";
import type { APICurrentUser, APIUserPublic, APIUserSummary } from "@/service/types";
import type { KeeperProfile } from "@/ui/types";

import { formatYear } from "./dates";
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

const isCurrentUser = (user: APICurrentUser | APIUserPublic): user is APICurrentUser =>
  "settings" in user;

const visiblePlace = (user: APICurrentUser | APIUserPublic) => {
  if (isCurrentUser(user)) {
    return user.settings.is_residence_visible ? user.residence : "";
  }
  return user.residence ?? "";
};

export const toKeeperProfile = (user: APICurrentUser | APIUserPublic): KeeperProfile => ({
  name: formatKeeperName(user),
  place: visiblePlace(user),
  bio: user.bio,
  avatar: user.avatar?.src,
  since: formatYear(user.created_at),
});
