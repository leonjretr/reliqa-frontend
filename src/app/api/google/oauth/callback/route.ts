import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { PAGES, QUERIES, QUERY_ERRORS } from "@/config";
import { authenticateGoogleOauthCode } from "@/service/api";
import { popOauthState, setSession } from "@/service/session";

const isSameState = (received: string, expected: string) => {
  const receivedBytes = Buffer.from(received, "utf8");
  const expectedBytes = Buffer.from(expected, "utf8");

  if (receivedBytes.length !== expectedBytes.length) {
    return false;
  }

  return timingSafeEqual(receivedBytes, expectedBytes);
};

const OAUTH_ERROR_PATH = `${PAGES.FEED}?${QUERIES.ERROR}=${QUERY_ERRORS.OAUTH}`;

const isRelativePath = (path: string) => path.startsWith("/") && !path.startsWith("//");

const redirectTo = (path: string) =>
  new NextResponse(null, { status: 303, headers: { Location: path } });

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = await popOauthState();

  if (!code || !state || !expectedState || !isSameState(state, expectedState)) {
    return redirectTo(OAUTH_ERROR_PATH);
  }

  const response = await authenticateGoogleOauthCode(code, state);

  if (!response.success) {
    return redirectTo(OAUTH_ERROR_PATH);
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });

  return redirectTo(response.next && isRelativePath(response.next) ? response.next : PAGES.FEED);
};
