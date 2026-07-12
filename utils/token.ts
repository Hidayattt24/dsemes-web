/**
 * Client-side cookie utilities for token management.
 */

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "dsmes_access_token",
  REFRESH_TOKEN: "dsmes_refresh_token",
} as const;

export function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export function setCookie(name: string, value: string, days?: number): void {
  if (typeof window === "undefined") return;
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  // Secure + SameSite=Lax for security
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax; Secure`;
}

export function deleteCookie(name: string): void {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax; Secure`;
}

export const tokenService = {
  getAccessToken(): string | undefined {
    return getCookie(TOKEN_KEYS.ACCESS_TOKEN);
  },
  setAccessToken(token: string): void {
    // Access token usually has shorter TTL (e.g. 1 day or 15 mins)
    // We set cookie expiry to 1 day for convenience or leave it session-based
    setCookie(TOKEN_KEYS.ACCESS_TOKEN, token, 1);
  },
  deleteAccessToken(): void {
    deleteCookie(TOKEN_KEYS.ACCESS_TOKEN);
  },
  getRefreshToken(): string | undefined {
    return getCookie(TOKEN_KEYS.REFRESH_TOKEN);
  },
  setRefreshToken(token: string): void {
    // Refresh token lasts longer (e.g. 7 days)
    setCookie(TOKEN_KEYS.REFRESH_TOKEN, token, 7);
  },
  deleteRefreshToken(): void {
    deleteCookie(TOKEN_KEYS.REFRESH_TOKEN);
  },
  clearTokens(): void {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  },
};
