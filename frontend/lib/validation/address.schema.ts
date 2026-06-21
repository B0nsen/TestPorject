import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const addressSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),

    street: z.string().min(1, "Street is required"),
    houseNumber: z.string().min(1, "House number is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),

    country: z.string().min(1, "Country is required"),

    number: z.string().min(1, "Phone number is required"),
  })
  .superRefine((val, ctx) => {
    const phone = parsePhoneNumberFromString(val.number, "UA");

    if (!phone?.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["number"],
        message: "Invalid phone number",
      });
    }
  });

export type AddressFormValues = z.infer<typeof addressSchema>;