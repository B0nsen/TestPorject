"use client";

import CardNumberIcon from "@/assets/icons/credit_card_payment.svg?react";
import ExpirationIcon from "@/assets/icons/calendar_month.svg?react";
import CardNameIcon from "@/assets/icons/id_card.svg?react";
import CvvIcon from "@/assets/icons/lock.svg?react";

import { PaymentInput } from "@/components/PaymentInput";
import { Checkbox } from "@/components/Checkbox";
import PaymentOptions from "@/components/PaymentOptions";
import FormButton from "@/components/FormButton";

import { paymentSchema, PaymentValues } from "@/lib/validation/payment.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentData } from "@/lib/types/payment";
import { usePaymentStore } from "@/lib/stores/payment-store";

interface PaymentFormProps {
  onSubmit: (data: PaymentData) => void;
  submitLabel?: string;
  disableCheckbox?: boolean;
  defaultValues?: Partial<PaymentValues>;
}
export default function PaymentForm({
  onSubmit,
  submitLabel = "Save Card",
  disableCheckbox = false,
  defaultValues,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });
  const setPayment = usePaymentStore((s) => s.setPayment);

  const handleValidSubmit = (data: PaymentValues) => {
    const saveCard =
      (document.querySelector('[name="setDefault"]') as HTMLInputElement)
        ?.checked ?? false;

    const paymentData = {
      ...data,
      saveCard,
    };

    setPayment(paymentData);
    onSubmit(paymentData);
  };
  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit)}
      className="flex flex-col w-full  gap-[20px] items-start"
    >
      <PaymentOptions />

      <div className="flex flex-col w-full gap-[10px]">
        <PaymentInput
          label="Card number"
          placeholder="Card number"
          Icon={CardNumberIcon}
          {...register("cardNumber")}
          error={errors.cardNumber}
        />

        <PaymentInput
          label="Name on card"
          placeholder="Name Surname"
          Icon={CardNameIcon}
          {...register("nameOnCard")}
          error={errors.nameOnCard}
        />

        <div className="flex gap-[4px]">
          <PaymentInput
            label="Expiration date"
            placeholder="01/29"
            Icon={ExpirationIcon}
            {...register("expiryDate")}
            error={errors.expiryDate}
          />
          <PaymentInput
            label="CVV"
            placeholder="123"
            Icon={CvvIcon}
            {...register("cvv")}
            error={errors.cvv}
          />
        </div>
      </div>

      {!disableCheckbox && (
        <Checkbox
          label="Set as default"
          name="setDefault"
          labelClassName="text-[14px] font-medium"
        />
      )}
      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
