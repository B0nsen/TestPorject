import { z } from "zod";
import { passwordSchema } from "./password.schema";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),

  password: passwordSchema.min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;
