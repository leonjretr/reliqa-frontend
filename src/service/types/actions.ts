import type { APIError } from "./api";

export type ActionFailure = {
  success: false;
  errors?: APIError[];
};

export type ActionResult<T = unknown> = ({ success: true } & T) | ActionFailure;
