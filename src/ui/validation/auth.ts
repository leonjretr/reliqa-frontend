import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: process.env.NODE_ENV === "production" ? z.string().min(8) : z.string(),
});

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
