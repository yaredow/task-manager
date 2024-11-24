import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters")
    .min(1, "Password is required"),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required") // Ensures non-empty
      .max(50, "Name must not exceed 50 characters"), // Maximum name length
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password must not exceed 128 characters")
      .min(1, "Password is required"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export type SignUpData = z.infer<typeof SignUpSchema>;
