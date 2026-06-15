import { z } from "zod";

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 20;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
  .max(PASSWORD_MAX, `Password must be less than ${PASSWORD_MAX} characters`)
  .regex(/^\S*$/, "Password must not contain spaces");