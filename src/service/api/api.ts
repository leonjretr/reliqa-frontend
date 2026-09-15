import "server-only";

import { headers } from "next/headers";

import {
  API_DEFAULT_LANGUAGE,
  API_DEFAULT_VERSION,
  API_URL,
  API_VERSION_PLACEHOLDER,
} from "@/config";
import { APIErrorResponse, APISuccessfulResponse } from "@/service/types";

type FetchAPIOptions = {
  accessToken?: string;
  language?: string;
  version?: string;
};

export const fetchAPI = async <T>(
  endpoint: string,
  options?: RequestInit & FetchAPIOptions,
): Promise<(APIErrorResponse | APISuccessfulResponse) & T> => {
  options = options || {};

  const { accessToken, language, version } = options;
  const actualFetchOptions = { ...options, accessToken: undefined };

  const nextHeaders = await headers();
  const clientIp =
    nextHeaders.get("x-forwarded-for")?.split(",").shift()?.trim() ||
    nextHeaders.get("x-real-ip") ||
    "unknown";
  const referer = nextHeaders.get("referer");
  const userAgent = nextHeaders.get("user-agent");
  const acceptLanguage = language || nextHeaders.get("accept-language");
  const requestHeaders: HeadersInit = {
    ...(!(options.body instanceof FormData) && { "Content-Type": "application/json" }),
    "Accept-Language": acceptLanguage || API_DEFAULT_LANGUAGE,
    "X-Forwarded-For": clientIp,
    "X-Client-Referer": referer ?? "",
    "X-Client-User-Agent": userAgent ?? "",
    "X-Client-Accept-Language": acceptLanguage || "",
    ...(actualFetchOptions.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const response = await fetch(
      `${API_URL.replace(API_VERSION_PLACEHOLDER, version ? version : API_DEFAULT_VERSION)}${endpoint}`,
      {
        ...actualFetchOptions,
        headers: requestHeaders,
      },
    );
    const body = await response.text();
    const data = body ? JSON.parse(body) : {};
    return { success: response.ok, ...data };
  } catch (error) {
    console.error(error);
    return { success: false } as APIErrorResponse & T;
  }
};
