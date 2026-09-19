"use server";

import { createObject } from "@/service/api";
import { CaptureInput, CaptureResult } from "@/service/types";

import { toActionFailure } from "./result";

export const submitCapture = async ({
  name,
  category,
  tags,
  story,
  shortStory,
  source,
  location,
  acquiredAt,
  previousOwner,
  isPrivate,
}: CaptureInput): Promise<CaptureResult> => {
  const object = await createObject({
    name,
    categories: [category],
    tags,
    story,
    short_story: shortStory,
    source,
    location,
    acquired_at: acquiredAt,
    previous_owner: previousOwner,
    is_private: isPrivate,
  });

  if (!object.success) {
    return toActionFailure(object);
  }

  return { success: true, objectId: object.id };
};
