export const API_URL = process.env.API_URL!;

export const API_ENDPOINTS = {
  LOGIN: "tokens/",
  REFRESH: "tokens/refresh/",
  REGISTER: "users/",
  CURRENT_USER: "users/me/",
  GOOGLE_OAUTH_REDIRECT_URI: "google/oauth/uri/",
  GOOGLE_OAUTH_CALLBACK: "google/oauth/callback/",
};
