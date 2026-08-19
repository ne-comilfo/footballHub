import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  nickname: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const credentialsSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(8, "Минимальная длина - 8 символов"),
});

export type Credentials = z.infer<typeof credentialsSchema>;

export const registerSchema = z.object({
  nickname: z
    .string()
    .min(5, "Минимальная длина - 5 символов")
    .max(32, "Максимальная длина - 32 символа")
    .regex(/^[A-Za-z0-9]+$/, "Только латинские буквы и цифры"),
  email: z.email("Некорректный email"),
  password: z
    .string()
    .min(8, "Минимальная длина - 8 символов")
    .max(128, "Слишком длинный пароль"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const registerFormSchema = registerSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Пароли не совпадают",
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;

export const authTokensSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  refreshExpiresAt: z.string(),
});

export type AuthTokens = z.infer<typeof authTokensSchema>;

export const sessionSchema = z.object({
  user: userSchema,
});

export const meSchema = z.object({
  user: userSchema.nullable(),
});

export type Me = z.infer<typeof meSchema>;
