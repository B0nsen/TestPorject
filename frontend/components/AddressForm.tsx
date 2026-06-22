"use client";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import FormButton from "@/components/FormButton";
import { getFirstErrorMessage } from "@/lib/utils/formErrors";
import {
  AddressFormValues,
  addressSchema,
} from "@/lib/validation/address.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "./FormError";
import CountrySelect from "./CountrySelector";

import { DEFAULT_COUNTRY } from "@/lib/utils/countries";

import { getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { PhoneInput } from "./PhoneInput";

type AddressFormProps = {
  defaultValues?: Partial<AddressFormValues>;
  onSubmit: (data: AddressFormValues) => Promise<void> | void;
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
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ...defaultValues,
      country: defaultValues?.country || DEFAULT_COUNTRY,
    },
  });
  const country = watch("country");
  const selectedCountry = country as CountryCode;
  const callingCode = `+${getCountryCallingCode(selectedCountry)}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[30px]"
    >
      <div className="flex flex-col gap-[10px]">
        <NameFields register={register} errors={errors} />
        <PhoneInput
          countryCode={selectedCountry}
          callingCode={callingCode}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
        />
        <InputWrapper label="Address" className="gap-[5px]">
          <div className="flex gap-[4px]">
            <FormInput {...register("street")} placeholder="Street" />
          </div>
          <div className="flex gap-[4px]">
            <FormInput
              {...register("houseNumber")}
              placeholder="House number"
            />

            <FormInput {...register("city")} placeholder="City" />
            <FormInput {...register("postalCode")} placeholder="Postal code" />
          </div>
          <FormError
            message={getFirstErrorMessage([
              errors.street,
              errors.houseNumber,
              errors.city,
              errors.postalCode,
            ])}
          />
        </InputWrapper>

        <InputWrapper className="max-w-[200px]" label="Country">
          <CountrySelect
            value={country}
            onChange={(val) => {
              setValue("country", val, {
                shouldValidate: true,
                shouldDirty: true,
              });
              console.log("revalidate");
              trigger("number");
            }}
            error={errors.country?.message}
          />
        </InputWrapper>
      </div>
      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
