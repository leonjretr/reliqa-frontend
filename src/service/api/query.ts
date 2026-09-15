export type QueryParams = Record<string, string | undefined>;

export const withQuery = (endpoint: string, params: QueryParams) => {
  const entries = Object.entries(params).filter((entry): entry is [string, string] =>
    Boolean(entry[1]),
  );
  const search = new URLSearchParams(entries).toString();
  return search ? `${endpoint}?${search}` : endpoint;
};
