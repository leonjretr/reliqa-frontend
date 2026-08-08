"use server";

import { fetchAPI } from "@/service/api";
import { setSession } from "@/service/session";
import {
  AuthActionResult,
  GoogleOAuthRedirectResult,
  LoginCredentials,
  SignupDetails,
} from "@/service/types";

type TokenPairResponse = {
  access: string;
  refresh: string;
};

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

const extractErrorMessage = (response: { errors?: { detail: string }[] }): string =>
  response.errors?.[0]?.detail || FALLBACK_ERROR_MESSAGE;

export const loginWithPassword = async (
  credentials: LoginCredentials,
): Promise<AuthActionResult> => {
  const response = await fetchAPI<TokenPairResponse>("/tokens/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!response.success) {
    return { success: false, message: extractErrorMessage(response) };
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });
  return { success: true };
};

export const signup = async (details: SignupDetails): Promise<AuthActionResult> => {
  const response = await fetchAPI("/users/", {
    method: "POST",
    body: JSON.stringify({
      email: details.email,
      password: details.password,
      first_name: details.firstName || "",
      last_name: details.lastName || "",
    }),
  });

  if (!response.success) {
    return { success: false, message: extractErrorMessage(response) };
  }

  return loginWithPassword({ email: details.email, password: details.password });
};

export const getGoogleOAuthRedirectUri = async (
  next?: string,
): Promise<GoogleOAuthRedirectResult> => {
  const response = await fetchAPI<{ redirect_uri: string }>("/google/oauth/uri/", {
    method: "POST",
    body: JSON.stringify({ next: next || "" }),
  });

  if (!response.success) {
    return { success: false, message: extractErrorMessage(response) };
  }

  return { success: true, redirectUri: response.redirect_uri };
};
