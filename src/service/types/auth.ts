export type APITokens = {
  access: string;
  refresh: string;
};

export type APIUser = {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  born_at: string | null;
  created_at: string;
};

export type APICreateUser = {
  email: string;
  password: string;
};

export type APILoginResponse = APITokens & {
  user: APIUser;
};

export type APIGoogleOauthRedirectURIResponse = {
  redirect_uri: string;
};

export type APIGoogleOauthCallbackResponse = APITokens & {
  next: string;
  user: APIUser;
};
