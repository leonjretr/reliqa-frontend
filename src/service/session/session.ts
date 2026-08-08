"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import { SESSION_OPTIONS } from "@/config";
import { Session } from "@/service/types";

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
  await currentSession.save();
  return currentSession;
};

export const clearSession = async () => {
  const session = await getIronSession<Session>(await cookies(), SESSION_OPTIONS);
  session.destroy();
};
