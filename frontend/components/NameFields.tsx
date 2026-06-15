import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { FormError } from "./FormError";

interface NameFieldsProps {
  register: any;
  errors: any;
  stackOnMobile?: boolean;
}

export function NameFields({
  register,
  errors,
  stackOnMobile = false,
}: NameFieldsProps) {
  return (
    <div
      className={`flex ${
        stackOnMobile
          ? "sm:flex-row flex-col sm:gap-[28px]"
          : "flex-row gap-[28px]"
      }`}
    >
      <InputWrapper
        className="w-full layout-account-sm:max-w-[200px]"
        label="First name"
      >
        <FormInput placeholder="First name" {...register("firstName")} />
        <FormError message={errors.firstName?.message} />
      </InputWrapper>

      <InputWrapper
        className="w-full layout-account-sm:max-w-[200px]"
        label="Last name"
      >
        <FormInput placeholder="Last name" {...register("lastName")} />
        <FormError message={errors.lastName?.message} />
      </InputWrapper>
    </div>
  );
}
