import { NextRequest, NextResponse } from "next/server";

import { fetchAPI } from "@/service/api";
import { setSession } from "@/service/session";

type GoogleOAuthCallbackResponse = {
  access: string;
  refresh: string;
  next: string;
};

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/login?error=google_oauth_failed", request.url));
  }

  const response = await fetchAPI<GoogleOAuthCallbackResponse>("/google/oauth/callback/", {
    method: "POST",
    body: JSON.stringify({ code, state }),
  });

  if (!response.success) {
    return NextResponse.redirect(new URL("/login?error=google_oauth_failed", request.url));
  }

  await setSession({ accessToken: response.access, refreshToken: response.refresh });

  return NextResponse.redirect(new URL(response.next || "/", request.url));
};
