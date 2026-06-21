"use client";import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";

import { PhoneSchema } from "@/lib/validation/phone";

type FormData = {
  name: string;
  email: string;
  country: CountryCode;
  number: string;
};

export default function AccountPhones() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormData>({
    resolver: zodResolver(PhoneSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      country: "UA",
      number: "",
    },
  });

  const callingCode = `+${getCountryCallingCode("UA")}`;

  const onSubmit = (data: FormData) => {
    console.log("Saved:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="border px-2 py-1 w-full"
        />

        {isSubmitted && errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border px-2 py-1 w-full"
        />

        {isSubmitted && errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>

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
          <p style={{ color: errors.number ? "red" : "green" }}>
            {errors.number?.message ?? "Valid number"}
          </p>
        )}
      </div>

      <button type="submit">Save</button>
    </form>
  );
}