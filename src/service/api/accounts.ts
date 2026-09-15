import "server-only";

import { API_ENDPOINTS } from "@/config";
import {
  APICreateUser,
  APICurrentUser,
  APIGoogleOauthCallbackResponse,
  APIGoogleOauthRedirectURIResponse,
  APILoginResponse,
  APISettings,
  APIUser,
  APIUserPublic,
} from "@/service/types";

import { fetchAPI } from "./api";
import { fetchAuthenticated } from "./auth";

export const login = async (email: string, password: string) => {
  return await fetchAPI<APILoginResponse>(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (user: APICreateUser) => {
  return await fetchAPI<APIUser>(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const getGoogleOauthRedirectUri = async (next?: string) => {
  return await fetchAPI<APIGoogleOauthRedirectURIResponse>(
    API_ENDPOINTS.GOOGLE_OAUTH_REDIRECT_URI,
    {
      method: "POST",
      body: JSON.stringify({ next: next ?? "" }),
    },
  );
};

export const authenticateGoogleOauthCode = async (code: string, state: string) => {
  return await fetchAPI<APIGoogleOauthCallbackResponse>(API_ENDPOINTS.GOOGLE_OAUTH_CALLBACK, {
    method: "POST",
    body: JSON.stringify({ code, state }),
  });
};

export const getCurrentUser = async () => {
  return await fetchAuthenticated<APICurrentUser>(API_ENDPOINTS.CURRENT_USER, {
    method: "GET",
  });
};

export const updateCurrentUser = async (profile: FormData) => {
  return await fetchAuthenticated<APICurrentUser>(API_ENDPOINTS.CURRENT_USER, {
    method: "PATCH",
    body: profile,
  });
};

export const updateSettings = async (patch: Partial<APISettings>) => {
  return await fetchAuthenticated<APISettings>(API_ENDPOINTS.SETTINGS, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
};

export const getUserByUsername = async (username: string) => {
  return await fetchAPI<APIUserPublic>(
    `${API_ENDPOINTS.USER_BY_USERNAME}${encodeURIComponent(username)}/`,
    { method: "GET" },
  );
};
