export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupDetails = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type AuthActionResult =
  | { success: true }
  | {
      success: false;
      message: string;
    };

export type GoogleOAuthRedirectResult =
  { success: true; redirectUri: string } | { success: false; message: string };
