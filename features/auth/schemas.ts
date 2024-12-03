import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password1: z.string().min(8, "Password must be at least 8 characters long"),
    password2: z.string().min(8, "Passwords must match"),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

export type SignUpData = z.infer<typeof SignUpSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});
