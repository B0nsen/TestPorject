import { z } from "zod";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

export const PhoneSchema = z.object({
  country: z.custom<CountryCode>(),
  number: z.string().min(1),
}).superRefine((val, ctx) => {
  const phone = parsePhoneNumberFromString(val.number, val.country);

  if (!phone?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["number"],
      message: "Invalid phone number",
    });
  }
});