export interface ApiResponse<T> {
  readonly success: boolean;
  readonly message: string;
  readonly data: T;
}

export interface ApiErrorResponse {
  readonly success: boolean;
  readonly message: string;
  readonly errors?: Record<string, string>;
}
