/**
 * Client-side token storage utilities.
 *
 * Hybrid storage strategy:
 *  - localStorage  → primary store used by Axios interceptor (reliable on http://localhost)
 *  - Cookie        → secondary store read by Next.js Edge middleware for SSR route protection
 *
 * The cookie is written WITHOUT the `Secure` flag on HTTP so that localhost development works.
 * In production (HTTPS) the `Secure` flag is added automatically.
 */

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "dsmes_access_token",
  REFRESH_TOKEN: "dsmes_refresh_token",
} as const;

function localGet(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem(key) ?? undefined;
}

function localSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

function localRemove(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

/** Write a plain (non-HttpOnly) cookie readable by Next.js middleware. */
function cookieSet(name: string, value: string, days: number): void {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Lax${secureFlag}`;
}

function cookieRemove(name: string): void {
  if (typeof window === "undefined") return;
  const secureFlag = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax${secureFlag}`;
}

export const tokenService = {
  getAccessToken(): string | undefined {
    // Prefer localStorage (always set on HTTP); fall back to nothing
    return localGet(TOKEN_KEYS.ACCESS_TOKEN);
  },
  setAccessToken(token: string): void {
    localSet(TOKEN_KEYS.ACCESS_TOKEN, token);
    cookieSet(TOKEN_KEYS.ACCESS_TOKEN, token, 1); // 1-day cookie for middleware
  },
  deleteAccessToken(): void {
    localRemove(TOKEN_KEYS.ACCESS_TOKEN);
    cookieRemove(TOKEN_KEYS.ACCESS_TOKEN);
  },
  getRefreshToken(): string | undefined {
    return localGet(TOKEN_KEYS.REFRESH_TOKEN);
  },
  setRefreshToken(token: string): void {
    localSet(TOKEN_KEYS.REFRESH_TOKEN, token);
    cookieSet(TOKEN_KEYS.REFRESH_TOKEN, token, 7); // 7-day cookie for middleware
  },
  deleteRefreshToken(): void {
    localRemove(TOKEN_KEYS.REFRESH_TOKEN);
    cookieRemove(TOKEN_KEYS.REFRESH_TOKEN);
  },
  clearTokens(): void {
    this.deleteAccessToken();
    this.deleteRefreshToken();
  },
};
