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
    address: z.object({
      street: z.string().min(1, "Street is required"),
      houseNumber: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      postalCode: z.string().min(1, "Postal code is required"),
    }),
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
