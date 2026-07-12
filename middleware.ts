import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_KEYS = {
  ACCESS_TOKEN: "dsmes_access_token",
  REFRESH_TOKEN: "dsmes_refresh_token",
} as const;

interface DecodedToken {
  user_id: string;
  email: string;
  role: string;
  exp?: number;
}

function decodeJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(TOKEN_KEYS.REFRESH_TOKEN)?.value;

  const claims = accessToken ? decodeJwt(accessToken) : null;
  const isAuthenticated = !!claims;
  const role = claims?.role;

  // Paths that require authentication
  const isAdminPath = pathname.startsWith("/admin");
  const isStaffPath = pathname.startsWith("/staff");
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/lupa-password" ||
    pathname === "/verifikasi-kode" ||
    pathname === "/atur-ulang-kata-sandi" ||
    pathname === "/berhasil-reset";

  // 1. If not authenticated and trying to access protected paths
  if (!isAuthenticated && (isAdminPath || isStaffPath)) {
    const loginUrl = new URL("/login", request.url);
    if (accessToken || refreshToken) {
      loginUrl.searchParams.set("expired", "true");
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. If authenticated
  if (isAuthenticated && role) {
    // If trying to access auth pages (like /login), redirect to correct dashboard
    if (isAuthPage) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      if (role === "staff") {
        return NextResponse.redirect(new URL("/staff/dashboard", request.url));
      }
    }

    // Role-based route protection
    if (isAdminPath && role !== "admin") {
      // Staff cannot access admin routes
      if (role === "staff") {
        return NextResponse.redirect(new URL("/staff/dashboard", request.url));
      }
      // Any other role (like user) gets redirected to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
      response.cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
      return response;
    }

    if (isStaffPath && role !== "staff") {
      // Admin cannot access staff-only routes
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      // Any other role gets redirected to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
      response.cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
      return response;
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: [
    "/login",
    "/lupa-password",
    "/verifikasi-kode",
    "/atur-ulang-kata-sandi",
    "/berhasil-reset",
    "/admin/:path*",
    "/staff/:path*",
  ],
};
