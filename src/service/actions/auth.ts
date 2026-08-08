"use server";

import { redirect } from "next/navigation";

import { getGoogleOauthRedirectUri, login, register } from "@/service/api";
import { setOauthState, setSession } from "@/service/session";
import { ActionResult, APICreateUser } from "@/service/types";

export const signIn = async (email: string, password: string): Promise<ActionResult> => {
  const response = await login(email, password);

  if (!response.success) {
    return { success: false, errors: response.errors };
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });
  return { success: true };
};

export const signUp = async (user: APICreateUser): Promise<ActionResult> => {
  const response = await register(user);

  if (!response.success) {
    return { success: false, errors: response.errors };
  }

  return await signIn(user.email, user.password);
};

export const startGoogleOauth = async (next?: string) => {
  const response = await getGoogleOauthRedirectUri(next);

  if (!response.success) {
    return { success: false, errors: response.errors };
  }

  const state = new URL(response.redirect_uri).searchParams.get("state");

  if (!state) {
    return { success: false };
  }

  await setOauthState(state);
  redirect(response.redirect_uri);
};
