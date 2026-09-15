import { NextRequest, NextResponse } from "next/server";

import { updateCurrentUser } from "@/service/api";

export const PATCH = async (request: NextRequest) => {
  const formData = await request.formData();
  const result = await updateCurrentUser(formData);

  return NextResponse.json(result, { status: result.success ? 200 : 400 });
};
