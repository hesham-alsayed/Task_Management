export const accessToken = "access_token";
export const refreshToken = "refresh_token";

export const ACCESS_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 10,
};

export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 2592000,
};
