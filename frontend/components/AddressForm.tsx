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

const DEFAULT_PHONE_COUNTRY = "UA";

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
  const callingCode = `+${getCountryCallingCode(DEFAULT_PHONE_COUNTRY)}`;
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[30px]"
    >
      <NameFields register={register} errors={errors} />
      <div>
        <div className="flex gap-2 items-center">
          <span>{callingCode}</span>

          <input
            {...register("number")}
            placeholder="Phone number"
            className="border px-2 py-1"
          />
        </div>

        {isSubmitted && (
          <span style={{ color: errors.number ? "red" : "green" }}>
            {errors.number?.message ?? "Valid phone number"}
          </span>
        )}
      </div>
      <div>
        <FormInput {...register("street")} placeholder="Street" />
        <FormInput {...register("houseNumber")} placeholder="House number" />
        <FormInput {...register("city")} placeholder="City" />
        <FormInput {...register("postalCode")} placeholder="Postal code" />

        <FormError
          message={getFirstErrorMessage([
            errors.street,
            errors.houseNumber,
            errors.city,
            errors.postalCode,
          ])}
        />
      </div>

      <CountrySelect
        value={country}
        onChange={(val) =>
          setValue("country", val, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        error={errors.country?.message}
      />

      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}

//  <form
//     onSubmit={handleSubmit(onSubmit)}
//     className="flex flex-col gap-[30px]"
//   >
//     <div className="flex flex-col gap-[10px]">

//       <NameFields register={register} errors={errors} />

//       {/* <PhoneField register={register} error={errors} /> */}
//       <InputWrapper label="Address" className="gap-[5px]">
//         <div className="flex gap-[4px]">
//           <FormInput {...register("street")} placeholder="Street" />
//         </div>
//         <div className="flex gap-[4px]">
//           <FormInput
//             {...register("houseNumber")}
//             placeholder="House number"
//           />

//           <FormInput {...register("city")} placeholder="City" />
//           <FormInput {...register("postalCode")} placeholder="Postal code" />
//         </div>
//         <FormError message={addressError} />
//       </InputWrapper>

//       <InputWrapper className="max-w-[200px]" label="Country">
//         <CountrySelect
//           value={country || DEFAULT_COUNTRY}
//           onChange={(val) => setValue("country", val)}
//           error={errors.country?.message}
//         />
//       </InputWrapper>
//     </div>

//     <FormButton type="submit">{submitLabel}</FormButton>
//   </form>
