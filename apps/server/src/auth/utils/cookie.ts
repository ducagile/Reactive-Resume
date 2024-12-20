import { CookieOptions } from "express";

export const getCookieOptions = (
  grantType: "access" | "refresh",
  isAdminRequest?: boolean,
): CookieOptions => {
    const isProduction = process.env.NODE_ENV === "production";

  const baseOptions: CookieOptions = {
    httpOnly: !!isProduction,
    sameSite: isProduction ? "none" : "lax",
    secure: (process.env.PUBLIC_URL ?? "").includes("https://") || isProduction,
    // path: isAdminRequest ? "/api/admin" : "/api",
  };

  // Options For Access Token
  if (grantType === "access") {
    return {
      ...baseOptions,
      expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    };
  }

  // Options For Refresh Token
  return {
    ...baseOptions,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
  };
};
