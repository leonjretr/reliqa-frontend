import type {
  ActionFailure,
  ActionResult,
  APIErrorResponse,
  APISuccessfulResponse,
} from "@/service/types";

export const toActionFailure = (response: APIErrorResponse): ActionFailure => ({
  success: false,
  errors: response.errors,
});

export const toActionResult = (response: APIErrorResponse | APISuccessfulResponse): ActionResult =>
  response.success ? { success: true } : toActionFailure(response);
