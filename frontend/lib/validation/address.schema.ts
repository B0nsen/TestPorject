import { z } from "zod";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";

export const addressSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .regex(/^[\p{L}\s'-]+$/u, "First name contains invalid characters"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .regex(/^[\p{L}\s'-]+$/u, "Last name contains invalid characters"),

    street: z
      .string()
      .trim()
      .min(1, "Street is required")
      .max(100, "Street is too long"),

    houseNumber: z
      .string()
      .trim()
      .min(1, "House number is required")
      .max(20, "House number is too long"),

    city: z
      .string()
      .trim()
      .min(1, "City is required")
      .regex(/^[\p{L}\s.'-]+$/u, "City contains invalid characters"),

    postalCode: z
      .string()
      .trim()
      .min(1, "Postal code is required")
      .regex(/^[A-Za-z0-9\s-]{3,10}$/, "Invalid postal code format"),

    country: z.string().min(1, "Country is required"),
    phone: z.string().min(1, "Phone number is required"),
  })
  .superRefine((val, ctx) => {
    const country = val.country as CountryCode;
    const phone = parsePhoneNumberFromString(val.phone, country);

    if (!phone?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Invalid phone number",
      });
    }
  });

export type AddressFormValues = z.infer<typeof addressSchema>;
