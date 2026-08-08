"use server";

import { getSession } from "@/service/session";

import { fetchAPI } from "./api";

type FetchAuthenticatedOptions = {
  version?: string;
};

export const fetchAuthenticated = async <T>(
  endpoint: string,
  options?: RequestInit & FetchAuthenticatedOptions,
) => {
  const session = await getSession();
  return await fetchAPI<T>(endpoint, {
    accessToken: session?.accessToken,
    ...options,
  });
};
