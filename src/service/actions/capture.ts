"use server";

import { createObject, createStory } from "@/service/api";
import { CaptureInput, CaptureResult } from "@/service/types";

export const submitCapture = async ({
  name,
  category,
  tags,
  story,
  shortStory,
}: CaptureInput): Promise<CaptureResult> => {
  const object = await createObject({ name, categories: [category], tags });

  if (!object.success) {
    return { success: false, errors: object.errors };
  }

  const createdStory = await createStory(object.id, story, shortStory);

  if (!createdStory.success) {
    return { success: false, errors: createdStory.errors };
  }

  return { success: true, storyId: createdStory.id };
};
