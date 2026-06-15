import { z } from "zod";

export const accountDetailsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
});

export type AccountDetailsValues = z.infer<typeof accountDetailsSchema>;
