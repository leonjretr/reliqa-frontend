import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

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

const isRelativePath = (path: string) => path.startsWith("/") && !path.startsWith("//");

export const GET = async (request: NextRequest) => {
  const failure = new URL("/?error=oauth", request.nextUrl.origin);

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = await popOauthState();

  if (!code || !state || !expectedState || !isSameState(state, expectedState)) {
    return NextResponse.redirect(failure);
  }

  const response = await authenticateGoogleOauthCode(code, state);

  if (!response.success) {
    return NextResponse.redirect(failure);
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });

  const next = response.next && isRelativePath(response.next) ? response.next : "/";
  return NextResponse.redirect(new URL(next, request.nextUrl.origin));
};
