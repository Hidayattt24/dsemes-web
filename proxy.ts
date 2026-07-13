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

// Decode JWT locally in Node.js runtime
function decodeJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}


// Role-to-dashboard path mapper
const ROLE_DASHBOARDS: Record<string, string> = {
  admin: "/admin/dashboard",
  staff: "/staff/dashboard",
  user: "/dashboard", // future USER dashboard route
};

// Define guest routes (only accessible when NOT logged in)
const GUEST_ROUTES = [
  "/login",
  "/lupa-password",
  "/verifikasi-kode",
  "/atur-ulang-kata-sandi",
  "/berhasil-reset",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(TOKEN_KEYS.REFRESH_TOKEN)?.value;

  const claims = accessToken ? decodeJwt(accessToken) : null;
  
  // Verify token is not expired (exp is in seconds)
  const isExpired = claims?.exp ? claims.exp * 1000 < Date.now() : true;
  const isAuthenticated = !!claims && !isExpired;
  
  // Extract and normalize role (lowercase)
  const role = claims?.role?.toLowerCase();

  // Check route classification
  const isGuestRoute = GUEST_ROUTES.includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin");
  const isStaffRoute = pathname.startsWith("/staff");
  const isUserRoute = pathname.startsWith("/app") || pathname.startsWith("/user");
  const isProtectedRoute = isAdminRoute || isStaffRoute || isUserRoute;

  // 1. Guest access logic: Not authenticated
  if (!isAuthenticated) {
    // If attempting to access a protected route, redirect to login
    if (isProtectedRoute) {
      const loginUrl = new URL("/login", request.url);
      // If tokens are present but invalid/expired, indicate expiration
      if (accessToken || refreshToken) {
        loginUrl.searchParams.set("expired", "true");
      }
      return NextResponse.redirect(loginUrl);
    }
    // Allow access to guest routes and other public routes
    return NextResponse.next();
  }

  // 2. Authenticated user logic
  if (isAuthenticated && role) {
    // Redirect authenticated users away from guest routes or "/" to their dashboard
    if (isGuestRoute || pathname === "/") {
      const dashboardPath = ROLE_DASHBOARDS[role];
      if (dashboardPath) {
        return NextResponse.redirect(new URL(dashboardPath, request.url));
      }
    }

    // Role-based route protection checks
    if (isAdminRoute && role !== "admin") {
      // If staff tries to access admin routes, redirect to staff dashboard
      if (role === "staff") {
        return NextResponse.redirect(new URL(ROLE_DASHBOARDS.staff, request.url));
      }
      // If future user tries to access admin, redirect to their dashboard
      if (role === "user") {
        return NextResponse.redirect(new URL(ROLE_DASHBOARDS.user, request.url));
      }
      // Unknown role fallback: clear cookies and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
      response.cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
      return response;
    }

    if (isStaffRoute && role !== "staff") {
      // If admin tries to access staff routes, redirect to admin dashboard
      if (role === "admin") {
        return NextResponse.redirect(new URL(ROLE_DASHBOARDS.admin, request.url));
      }
      // If future user tries to access staff, redirect to their dashboard
      if (role === "user") {
        return NextResponse.redirect(new URL(ROLE_DASHBOARDS.user, request.url));
      }
      // Unknown role fallback
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
      response.cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
      return response;
    }

    if (isUserRoute && role !== "user") {
      // If admin/staff tries to access user routes, redirect to their respective dashboard
      const dashboardPath = ROLE_DASHBOARDS[role];
      if (dashboardPath) {
        return NextResponse.redirect(new URL(dashboardPath, request.url));
      }
      // Unknown role fallback
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
      response.cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
      return response;
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths, excluding static assets and APIs
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images (public images)
     * - icons (public icons)
     */
    "/((?!api|_next/static|_next/image|images|icons|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
