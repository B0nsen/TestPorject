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

import { useState } from "react";

import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

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
  const [open, setOpen] = useState(false);
  const countries = getCountries() as CountryCode[];
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("UA");
  const [phoneNumber, setPhoneNumber] = useState("");
  const phone = parsePhoneNumberFromString(phoneNumber, selectedCountry);

  const isValid = phone?.isValid() ?? false;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      ...defaultValues,
      country: defaultValues?.country || DEFAULT_COUNTRY,
    },
  });

  const country = watch("country");
  const addressError = getFirstErrorMessage([
    errors.street,
    errors.houseNumber,
    errors.city,
    errors.postalCode,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[30px]"
    >
      <div className="flex flex-col gap-[10px]">
        <div className="flex bg-white relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-3 h-full border"
            >
              <span>+{getCountryCallingCode(selectedCountry)}</span>
              <span>▼</span>
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-1 bg-white border shadow-md rounded-md z-10 max-h-60 overflow-auto">
                {countries.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(c);
                      setOpen(false);
                      setPhoneNumber("");
                    }}
                    className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${
                      country === c ? "bg-gray-100" : ""
                    }`}
                  >
                    {c} (+{getCountryCallingCode(c)})
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            className="flex-1 px-3 outline-none"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value.replace(/[^\d+]/g, ""))
            }
            placeholder="Phone number"
          />
        </div>
        {!isValid && phoneNumber.length > 0 && (
          <p style={{ color: "red" }}>Not valid</p>
        )}

        <NameFields register={register} errors={errors} />

        {/* <PhoneField register={register} error={errors} /> */}
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
          <FormError message={addressError} />
        </InputWrapper>

        <InputWrapper className="max-w-[200px]" label="Country">
          <CountrySelect
            value={country || DEFAULT_COUNTRY}
            onChange={(val) => setValue("country", val)}
            error={errors.country?.message}
          />
        </InputWrapper>
      </div>

      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
