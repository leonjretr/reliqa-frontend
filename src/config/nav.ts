export const PAGES = {
  FEED: "/",
  LOGIN: "/login",
  ADD: "/add",
  BROWSE: "/browse",
  MARKETPLACE: "/marketplace",
  SEARCH: "/search",
  SETTINGS: "/settings",
  THING: "/thing",
  KEEPER: "/keeper",
};

export const QUERIES = {
  CATEGORY: "category",
  QUERY: "query",
  ERROR: "error",
};

export const QUERY_ERRORS = {
  OAUTH: "oauth",
};

export const thingPath = (id: string) => `${PAGES.THING}/${id}`;

export const keeperPath = (username: string) => `${PAGES.KEEPER}/${username}`;

export const PATHNAME_HEADER = "x-pathname";

export const ROUTE_HANDLERS = {
  CURRENT_USER: "/api/users/me",
};

export const objectAttachmentsRoute = (objectId: string) => `/api/objects/${objectId}/attachments`;
