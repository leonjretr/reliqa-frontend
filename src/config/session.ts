export const SESSION_COOKIE_NAME = "session";
export const SESSION_SECRET = process.env.SESSION_SECRET!;
export const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60;

export const SESSION_OPTIONS = {
  password: SESSION_SECRET,
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
};
