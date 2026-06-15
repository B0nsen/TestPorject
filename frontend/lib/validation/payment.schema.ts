import { z } from "zod";

export const paymentSchema = z.object({
  cardNumber: z.string().min(1, "Card number is required"),
  nameOnCard: z.string().min(1, "Name on card is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  cvv: z.string().min(1, "CVV is required"),
});
export type PaymentValues = z.infer<typeof paymentSchema>;
