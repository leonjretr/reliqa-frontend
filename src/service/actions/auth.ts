"use server";

import { redirect as rootRedirect } from "next/navigation";

import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getGoogleOauthRedirectUri, login, register } from "@/service/api";
import { clearSession, setOauthState, setSession } from "@/service/session";
import { ActionResult, APICreateUser } from "@/service/types";

import { toActionFailure } from "./result";

export const signIn = async (email: string, password: string): Promise<ActionResult> => {
  const response = await login(email, password);

  if (!response.success) {
    return toActionFailure(response);
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });
  return { success: true };
};

export const signUp = async (user: APICreateUser): Promise<ActionResult> => {
  const response = await register(user);

  if (!response.success) {
    return toActionFailure(response);
  }

  return await signIn(user.email, user.password);
};

export const startGoogleOauth = async (next?: string) => {
  const response = await getGoogleOauthRedirectUri(next);

  if (!response.success) {
    return toActionFailure(response);
  }

  const state = new URL(response.redirect_uri).searchParams.get("state");

  if (!state) {
    return { success: false };
  }

  await setOauthState(state);
  rootRedirect(response.redirect_uri);
};

export const signOut = async (locale: string) => {
  await clearSession();
  redirect({ href: PAGES.LOGIN, locale });
};
