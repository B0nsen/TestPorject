import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormError } from "./FormError";
import { InputWrapper } from "./InputWrapper";
import { FormInput } from "./FormInput";
import { CountryCode } from "libphonenumber-js";

type Props = {
  callingCode: string;
  countryCode: CountryCode;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubmitted: boolean;
  name?: string;
};

export const PhoneInput = ({
  callingCode,
  countryCode,
  register,
  errors,
  isSubmitted,
  name = "phone",
}: Props) => {
  const getFlagUrl = (code: string) =>
    `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  return (
    <InputWrapper label="Phone number">
      <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px] text-default">
        <div className="h-full flex items-center pl-[15px] gap-[6px] cursor-pointer">
          <img
            src={getFlagUrl(countryCode)}
            alt={countryCode}
            className="w-[30px] h-[16px] object-cover rounded-[2px] mr-[3px]"
          />
          <span className="text-[14px] text-input leading-[13px]">
            {callingCode}
          </span>
        </div>
        <FormInput
          className="h-full pl-[4px] flex-1"
          placeholder="Phone number"
          {...register(name)}
        />
      </div>
      {isSubmitted && errors?.[name] && (
        <FormError message={errors[name]?.message as string} />
      )}
    </InputWrapper>
  );
};
