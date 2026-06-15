import { z } from "zod";

const NAME_MIN = 2;
const NAME_MAX = 50;

import { passwordSchema } from "./password.schema";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(NAME_MIN, `First name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `First name must be less than ${NAME_MAX} characters`),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(NAME_MIN, `Last name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Last name must be less than ${NAME_MAX} characters`),

  email: z.string().min(1, "Email is required").email("Invalid email format"),

  password: passwordSchema.min(1, "Password is required"),

  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept Terms and Privacy Policy",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;
