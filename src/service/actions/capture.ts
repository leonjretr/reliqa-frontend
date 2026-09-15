"use server";

import { createObject, createStory } from "@/service/api";
import { CaptureInput, CaptureResult } from "@/service/types";

import { toActionFailure } from "./result";

export const submitCapture = async ({
  name,
  category,
  tags,
  story,
  shortStory,
}: CaptureInput): Promise<CaptureResult> => {
  const object = await createObject({ name, categories: [category], tags });

  if (!object.success) {
    return toActionFailure(object);
  }

  const createdStory = await createStory(object.id, story, shortStory);

  if (!createdStory.success) {
    return toActionFailure(createdStory);
  }

  return { success: true, storyId: createdStory.id };
};
