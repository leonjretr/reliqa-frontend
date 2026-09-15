import type { ActionResult } from "./actions";

export type CaptureInput = {
  name: string;
  category: string;
  tags: string[];
  story: string;
  shortStory: string;
};

export type CaptureResult = ActionResult<{ storyId: string }>;
