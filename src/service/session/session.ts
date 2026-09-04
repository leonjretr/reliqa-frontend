"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { SESSION_OPTIONS } from "@/config";
import { Session } from "@/service/types";

const isReadonlyCookiesError = (error: unknown): boolean =>
  error instanceof Error &&
  ((error as { __NEXT_ERROR_CODE?: string }).__NEXT_ERROR_CODE === "E1180" ||
    error.message.includes("Cookies can only be modified"));

const persistSession = async (write: () => void | Promise<void>): Promise<boolean> => {
  try {
    await write();
    return true;
  } catch (error) {
    if (isReadonlyCookiesError(error)) {
      return false;
    }
    throw error;
  }
};

export const getSession = async (): Promise<Session | undefined> => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);

  if (session.accessToken) {
    return session;
  }
};

export const setSession = async (session: Session) => {
  const currentSession = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  currentSession.accessToken = session.accessToken || currentSession.accessToken;
  currentSession.refreshToken = session.refreshToken || currentSession.refreshToken;
  await persistSession(() => currentSession.save());
  return currentSession;
};

export const clearSession = async () => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  await persistSession(() => session.destroy());
};

export const setOauthState = async (state: string) => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  session.oauthState = state;
  await session.save();
};

export const popOauthState = async () => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  const state = session.oauthState;
  delete session.oauthState;
  await session.save();
  return state;
};
