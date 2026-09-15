export const PAGES = {
  FEED: "/",
  LOGIN: "/login",
  ADD: "/add",
  BROWSE: "/browse",
  SEARCH: "/search",
  SETTINGS: "/settings",
  THING: "/thing",
  STORY: "/story",
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

export const storyPath = (id: string) => `${PAGES.STORY}/${id}`;

export const keeperPath = (username: string) => `${PAGES.KEEPER}/${username}`;
