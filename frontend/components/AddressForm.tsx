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
  onSubmit: (data: AddressPayload) => Promise<void> | void;
  submitLabel?: string;
};
type AddressPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
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
       address: {
    street: defaultValues?.address?.street ?? "",
    houseNumber: defaultValues?.address?.houseNumber ?? "",
    city: defaultValues?.address?.city ?? "",
    postalCode: defaultValues?.address?.postalCode ?? "",
  },
      country: defaultValues?.country || DEFAULT_COUNTRY,
    },
  });
  
  const country = watch("country");
  const selectedCountry = country as CountryCode;
  const callingCode = `+${getCountryCallingCode(selectedCountry)}`;

  const handleFormSubmit = (data: AddressFormValues) => {
    const flattened = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      country: data.country,
      street: data.address.street,
      houseNumber: data.address.houseNumber,
      city: data.address.city,
      postalCode: data.address.postalCode,
    };

    return onSubmit(flattened);
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
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
            <FormInput {...register("address.street")} placeholder="Street" />
          </div>
          <div className="flex gap-[4px]">
            <FormInput
              {...register("address.houseNumber")}
              placeholder="House number"
            />

            <FormInput {...register("address.city")} placeholder="City" />
            <FormInput
              {...register("address.postalCode")}
              placeholder="Postal code"
            />
          </div>
          <FormError
            message={getFirstErrorMessage([
              errors.address?.street,
              errors.address?.houseNumber,
              errors.address?.city,
              errors.address?.postalCode,
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
              trigger("phone");
            }}
            error={errors.country?.message}
          />
        </InputWrapper>
      </div>
      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
