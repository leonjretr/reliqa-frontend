"use server";

import { API_ENDPOINTS } from "@/config";
import { clearSession, getSession, setSession } from "@/service/session";
import { APIRefreshResponse } from "@/service/types";

import { fetchAPI } from "./api";

type FetchAuthenticatedOptions = {
  version?: string;
};

const REFRESHABLE_CODES = ["token_not_valid", "not_authenticated"];

const refreshTokens = async (refreshToken: string) =>
  await fetchAPI<APIRefreshResponse>(API_ENDPOINTS.REFRESH, {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });

export const fetchAuthenticated = async <T>(
  endpoint: string,
  options?: RequestInit & FetchAuthenticatedOptions,
) => {
  const session = await getSession();
  const response = await fetchAPI<T>(endpoint, {
    accessToken: session?.accessToken,
    ...options,
  });

  if (response.success) {
    return response;
  }

  if (
    !session?.refreshToken ||
    !response.errors?.some((error) => REFRESHABLE_CODES.includes(error.code))
  ) {
    return response;
  }

  const refreshed = await refreshTokens(session.refreshToken);

  if (!refreshed.success) {
    await clearSession();
    return response;
  }

  await setSession({ accessToken: refreshed.access, refreshToken: refreshed.refresh });

  return await fetchAPI<T>(endpoint, {
    accessToken: refreshed.access,
    ...options,
  });
};
