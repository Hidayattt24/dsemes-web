import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, "Kode verifikasi wajib diisi.")
    .length(6, "Kode verifikasi harus 6 digit.")
    .regex(/^\d{6}$/, "Kode hanya boleh berisi angka."),
});

export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
