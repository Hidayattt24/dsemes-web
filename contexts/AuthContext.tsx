"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { authService } from "@/services/authService";
import { tokenService } from "@/utils/token";
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

      // If we have tokens but no user is set in Zustand, or we want to double check session validity
      if (accessToken && !user) {
        setLoading(true);
        try {
          // Fetch current staff member profile
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1"}/staff/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            const staff = result.data;
            setUser({
              id: staff.id,
              name: staff.full_name,
              email: staff.email,
              role: staff.role,
              puskesmas: "",
            });
          } else {
            // Token is invalid, try to refresh or clear
            storeLogout();
            tokenService.clearTokens();
          }
        } catch (error) {
          console.error("Failed to restore session profile:", error);
          // If network is offline, we can keep the offline Zustand session if it exists,
          // but if we had no user in state, we clear tokens
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
