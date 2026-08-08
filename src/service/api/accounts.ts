"use server";

import { API_ENDPOINTS } from "@/config";
import {
  APICreateUser,
  APIGoogleOauthCallbackResponse,
  APIGoogleOauthRedirectURIResponse,
  APILoginResponse,
  APIUser,
} from "@/service/types";

import { fetchAPI } from "./api";

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
