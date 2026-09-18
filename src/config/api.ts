import { ROUTING } from "./i18n";

export const API_URL = process.env.API_URL!;
export const API_VERSION_PLACEHOLDER = "[version]";
export const API_DEFAULT_VERSION = "v1";
export const API_DEFAULT_LANGUAGE = ROUTING.defaultLocale;

export const API_ORDERINGS = {
  NEWEST: "-created_at",
};

export const API_ENDPOINTS = {
  LOGIN: "tokens/",
  REFRESH: "tokens/refresh/",
  REGISTER: "users/",
  CURRENT_USER: "users/me/",
  SETTINGS: "settings/",
  GOOGLE_OAUTH_REDIRECT_URI: "google/oauth/uri/",
  GOOGLE_OAUTH_CALLBACK: "google/oauth/callback/",
  OBJECTS: "objects/",
  OBJECTS_FEED: "objects/feed/",
  CATEGORIES: "categories/",
  TAGS: "tags/",
  USER_BY_USERNAME: "users/by-username/",
};
