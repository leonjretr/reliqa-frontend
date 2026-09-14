import { APIError } from "./api";

export type CaptureInput = {
  name: string;
  category: string;
  tags: string[];
  story: string;
  shortStory: string;
};

export type CaptureResult =
  { success: true; storyId: string } | { success: false; errors?: APIError[] };
