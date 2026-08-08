import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
