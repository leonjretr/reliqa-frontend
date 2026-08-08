import { APIError } from "./api";

export type ActionResult = {
  success: boolean;
  errors?: APIError[];
};
