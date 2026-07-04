import type { AuthResponse, LoginCredentials } from "@/types/auth";

/**
 * Authentication API service.
 * Swap the stub implementations with real fetch() calls when the API is ready.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export const authService = {
  /**
   * Authenticate the user with email + password.
   * Returns an AuthResponse containing the user and token.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // TODO: Replace with real API call
    // const res = await fetch(`${API_BASE}/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(credentials),
    // });
    // if (!res.ok) throw new Error("Login gagal. Periksa email dan kata sandi.");
    // return res.json();

    // ── Stub implementation ───────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    if (credentials.email !== "admin@dsmes.id") {
      throw new Error("Email atau kata sandi tidak valid.");
    }
    return {
      user: {
        id: "1",
        name: "Dr. Ahmad Faisal",
        role: "Healthcare Admin",
        puskesmas: "Puskesmas Meuraxa",
        avatarUrl: undefined,
      },
      token: "stub-jwt-token",
    };
  },

  /** Sign the current user out. */
  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 300));
    // TODO: call POST /auth/logout
  },

  /** Request a password reset email. */
  async forgotPassword(email: string): Promise<void> {
    // TODO: POST /auth/forgot-password  { email }
    await new Promise((r) => setTimeout(r, 700));
    void email;
  },

  /**
   * Verify the 6-digit OTP sent to the user's email.
   * POST /auth/verify-reset-code  { email, code }
   */
  async verifyResetCode(email: string, code: string): Promise<void> {
    // TODO: POST /auth/verify-reset-code
    await new Promise((r) => setTimeout(r, 600));
    if (code !== "123456") {
      throw new Error("Kode verifikasi tidak valid atau sudah kedaluwarsa.");
    }
    void email;
  },

  /**
   * Set a new password after successful OTP verification.
   * POST /auth/reset-password  { email, code, password, confirm_password }
   */
  async resetPassword(
    email:           string,
    code:            string,
    password:        string,
    confirmPassword: string
  ): Promise<void> {
    // TODO: POST /auth/reset-password
    await new Promise((r) => setTimeout(r, 800));
    void email; void code; void password; void confirmPassword;
  },
} as const;
