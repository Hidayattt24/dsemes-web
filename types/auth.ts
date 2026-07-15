/**
 * Authentication domain types.
 */

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
}

export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email?: string;
  readonly role: string;
  readonly puskesmas: string;
  readonly positionTitle?: string;
  readonly avatarUrl?: string;
}

export interface AuthResponse {
  readonly user: AuthUser;
  readonly token: string;
}

export interface AuthError {
  readonly message: string;
  readonly code?: string;
}
