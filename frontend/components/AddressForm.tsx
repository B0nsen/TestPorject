"use client";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";
import FormButton from "@/components/FormButton";
import { getFirstErrorMessage } from "@/lib/utils/formErrors";

import Image from "next/image";
import flagRomania from "@/assets/img/flag-romania.png";
import {
  AddressFormValues,
  addressSchema,
} from "@/lib/validation/address.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "./FormError";

type AddressFormProps = {
  defaultValues?: any;
  onSubmit: (data: any) => Promise<void> | void;
  submitLabel?: string;
};

export default function AddressForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const addressError = getFirstErrorMessage([
    errors.street,
    errors.houseNumber,
    errors.city,
    errors.state,
    errors.postalCode,
  ]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[30px]"
    >
      <div className="flex flex-col gap-[10px]">
        <NameFields register={register} errors={errors} />

        <PhoneField register={register} error={errors} />

        <InputWrapper label="Address" className="gap-[5px]">
          <div className="flex gap-[4px]">
            <FormInput {...register("street")} placeholder="Street" />
            <FormInput {...register("houseNumber")} placeholder="House" />
          </div>
          <div className="flex gap-[4px]">
            <FormInput {...register("city")} placeholder="City" />
            <FormInput {...register("state")} placeholder="State" />
            <FormInput {...register("postalCode")} placeholder="Postal code" />
          </div>
          <FormError message={addressError} />
        </InputWrapper>

        <InputWrapper className="max-w-[200px]" label="Country">
          <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px]">
            <button
              type="button"
              className="h-full flex items-center pl-[15px] gap-[6px]"
            >
              <Image
                src={flagRomania}
                alt="Romania Flag"
                width={30}
                height={16}
                className="rounded-[2px] object-cover mr-[3px]"
              />
            </button>

            <FormInput
              className="h-full pl-[4px] flex-1"
              placeholder="Country"
              {...register("country")}
            />

            <button
              type="button"
              className="h-full flex items-center pr-[15px]"
            >
              <span className="rotate-90 text-[13px]">›</span>
            </button>
          </div>
          <FormError message={errors.country?.message} />
        </InputWrapper>
      </div>

      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
