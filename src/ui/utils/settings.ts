import { hasLocale } from "next-intl";

import { ROUTING } from "@/config";
import type { APICurrentUser, APISettings } from "@/service/types";
import type { SettingsValues } from "@/ui/validation";

import { formatKeeperName } from "./keeper";
import { splitFullName } from "./text";

const PRIVATE_VISIBILITY: SettingsValues["visibility"] = "private";
const PUBLIC_VISIBILITY: SettingsValues["visibility"] = "everyone";

export const toSettingsValues = (user: APICurrentUser): SettingsValues => ({
  name: formatKeeperName(user),
  place: user.residence,
  bio: user.bio,
  avatar: null,
  username: user.username,
  visibility: user.settings.is_private ? PRIVATE_VISIBILITY : PUBLIC_VISIBILITY,
  isPlaceVisible: user.settings.is_residence_visible,
  isNotifyingKept: user.settings.is_push_enabled,
  isNotifyingThemes: false,
  language: hasLocale(ROUTING.locales, user.settings.language)
    ? user.settings.language
    : ROUTING.defaultLocale,
});

export const toProfileFormData = (values: SettingsValues, hasNewAvatar: boolean) => {
  const { firstName, lastName } = splitFullName(values.name);
  const profile = new FormData();
  profile.set("first_name", firstName);
  profile.set("last_name", lastName);
  profile.set("username", values.username);
  profile.set("residence", values.place.trim());
  profile.set("bio", values.bio.trim());
  if (hasNewAvatar && values.avatar) {
    profile.set("avatar", values.avatar);
  }
  return profile;
};

export const toSettingsPatch = (values: SettingsValues): Partial<APISettings> => ({
  language: values.language,
  is_private: values.visibility === PRIVATE_VISIBILITY,
  is_residence_visible: values.isPlaceVisible,
  is_push_enabled: values.isNotifyingKept,
});
