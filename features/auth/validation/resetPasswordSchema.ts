import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Kata sandi wajib diisi.")
      .min(8, "Minimal 8 karakter.")
      .regex(/[A-Z]/, "Minimal 1 huruf besar.")
      .regex(/[0-9]/, "Minimal 1 angka."),

    confirmPassword: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi dan konfirmasi tidak cocok.",
    path:    ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
