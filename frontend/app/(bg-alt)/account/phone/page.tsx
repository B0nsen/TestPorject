"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { PhoneSchema } from "@/lib/validation/phone";

type FormData = {
  country: CountryCode;
  number: string;
};

export default function AccountPhones() {
  const countries = getCountries();

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(PhoneSchema),
    mode: "onChange",
    defaultValues: {
      country: "UA",
      number: "",
    },
  });

  const country = watch("country");
  const callingCode = `+${getCountryCallingCode(country)}`;

  return (
    <div>
      <p>Phones</p>

      <div className="flex gap-2 items-center">
        <span>{callingCode}</span>

        <input
          {...register("number")}
          placeholder="phone number"
          className="border px-2 py-1"
        />
      </div>

      <p style={{ color: isValid ? "green" : "red" }}>
        {isValid ? "Valid number" : errors.number?.message ?? "Invalid number"}
      </p>

      <div className="max-h-40 overflow-auto border mt-3">
        {countries.map((c) => (
          <div
            key={c}
            onClick={() => {
              setValue("country", c);
              setValue("number", "");
            }}
            className={`p-2 cursor-pointer hover:bg-gray-100 ${
              country === c ? "bg-gray-200" : ""
            }`}
          >
            {c} (+{getCountryCallingCode(c)})
          </div>
        ))}
      </div>
    </div>
  );
}