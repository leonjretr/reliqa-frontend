"use server";

import { createObject, createStory, createStoryAttachment } from "@/service/api";
import { ActionResult, CaptureInput } from "@/service/types";

export const submitCapture = async ({ story, photo }: CaptureInput): Promise<ActionResult> => {
  const object = await createObject();

  if (!object.success) {
    return { success: false, errors: object.errors };
  }

  const createdStory = await createStory(object.id, story);

  if (!createdStory.success) {
    return { success: false, errors: createdStory.errors };
  }

  if (photo) {
    await createStoryAttachment(createdStory.id, photo);
  }

  return { success: true };
};
