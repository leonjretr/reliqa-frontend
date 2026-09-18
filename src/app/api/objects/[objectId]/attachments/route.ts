import { NextRequest, NextResponse } from "next/server";

import { createObjectAttachment } from "@/service/api";

export const POST = async (
  request: NextRequest,
  context: RouteContext<"/api/objects/[objectId]/attachments">,
) => {
  const { objectId } = await context.params;
  const formData = await request.formData();
  const file = formData.get("file");
  const position = Number(formData.get("position") ?? 0);

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const result = await createObjectAttachment(objectId, file, position);

  return NextResponse.json(result, { status: result.success ? 201 : 400 });
};
