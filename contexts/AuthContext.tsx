"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { authService } from "@/services/authService";
import { tokenService } from "@/utils/token";
import { axiosInstance } from "@/lib/axios";
import type { AuthUser, LoginCredentials } from "@/types/auth";
import { ROUTES } from "@/constants/routes";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const { user, isAuthenticated, isLoading, setUser, logout: storeLogout, setLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Handle session persistence / validation on initialization
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = tokenService.getAccessToken();
      const refreshToken = tokenService.getRefreshToken();

      if (!accessToken && !refreshToken) {
        // No session tokens, clear state
        storeLogout();
        setIsInitialized(true);
        return;
      }

      // If we have tokens but no user is set in Zustand, restore the session
      if (accessToken && !user) {
        setLoading(true);
        try {
          // Decode the JWT payload to determine role WITHOUT verifying signature
          // (signature is verified server-side; this is only for routing to the correct endpoint)
          let role: string | null = null;
          try {
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            role = payload?.role ?? null;
          } catch {
            // Malformed token — fall through to clear tokens
          }

          if (!role) {
            storeLogout();
            tokenService.clearTokens();
            setIsInitialized(true);
            return;
          }

          // Choose the correct /me endpoint based on the user's role
          const meEndpoint = role === "admin" ? "/admin/me" : "/staff/me";

          // Use axiosInstance so expired tokens trigger the 401 refresh interceptor automatically
          const response = await axiosInstance.get(meEndpoint);
          const staff = response.data.data;
          setUser({
            id: staff.id,
            name: staff.full_name,
            email: staff.email,
            role: staff.role,
            puskesmas: "",
            positionTitle: staff.position_title ?? undefined,
            avatarUrl: staff.profile_photo_url ?? undefined,
          });
        } catch (error) {
          console.error("Failed to restore session profile:", error);
          // If token is invalid or refresh failed, clear tokens and logout
          if (!user) {
            storeLogout();
            tokenService.clearTokens();
          }
        } finally {
          setLoading(false);
        }
      }
      setIsInitialized(true);
    };

    void initAuth();
  }, [setUser, storeLogout, setLoading, user]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);

      // Fetch full profile (position_title, profile_photo_url) after login
      try {
        const meEndpoint = response.user.role === "admin" ? "/admin/me" : "/staff/me";
        const profileRes = await axiosInstance.get(meEndpoint);
        const staff = profileRes.data.data;
        setUser({
          id: staff.id,
          name: staff.full_name,
          email: staff.email,
          role: staff.role,
          puskesmas: "",
          positionTitle: staff.position_title ?? undefined,
          avatarUrl: staff.profile_photo_url ?? undefined,
        });
      } catch {
        // Non-critical — use basic login data
      }

      if (response.user.role === "admin") {
        router.push(ROUTES.DASHBOARD);
      } else if (response.user.role === "staff") {
        router.push(ROUTES.STAFF_DASHBOARD);
      }
    } catch (error) {
      storeLogout();
      tokenService.clearTokens();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      storeLogout();
      tokenService.clearTokens();
      router.push(ROUTES.LOGIN);
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: isAuthenticated && isInitialized,
    isLoading: isLoading || !isInitialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
