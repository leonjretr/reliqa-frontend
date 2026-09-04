import type { APIFile } from "./objects";

export type APITokens = {
  access: string;
  refresh: string;
};

export type APILanguage = "en" | "uk" | "ru";

export type APISettings = {
  language: APILanguage;
  is_push_enabled: boolean;
  is_email_enabled: boolean;
  is_private: boolean;
};

export type APIUser = {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  born_at: string | null;
  created_at: string;
};

export type APICurrentUser = APIUser & {
  settings: APISettings;
  avatar: APIFile | null;
};

export type APICreateUser = {
  email: string;
  password: string;
};

export type APILoginResponse = APITokens & {
  user: APICurrentUser;
};

export type APIRefreshResponse = APITokens;

export type APIGoogleOauthRedirectURIResponse = {
  redirect_uri: string;
};

export type APIGoogleOauthCallbackResponse = APITokens & {
  next: string;
  user: APICurrentUser;
};
