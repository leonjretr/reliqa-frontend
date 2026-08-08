export type APIResponse = {
  success: boolean;
};

export type APISuccessfulResponse = {
  success: true;
} & APIResponse;

export type APIError = {
  code?: string;
  detail?: string;
  attr?: string;
};

export type APIErrorResponse = {
  success: false;
  message?: string;
  errors: APIError[];
} & APIResponse;

export type APIPaginatedResponse<T> = {
  next?: string;
  previous?: string;
  count: number;
  results: T[];
} & APISuccessfulResponse;

export type APIPaginationParams = {
  limit?: number;
  offset?: number;
};

export type APIOrderingParams = {
  ordering?: string;
};
