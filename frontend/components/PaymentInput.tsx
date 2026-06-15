"use client";

import { FormInput } from "@/components/FormInput";
import { InputWrapper } from "@/components/InputWrapper";
import type { ComponentType, SVGProps } from "react";
import { FieldError } from "react-hook-form";
import { FormError } from "./FormError";

type PaymentInputProps = {
  label: string;
  placeholder?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;


export function PaymentInput({
  label,
  placeholder,
  Icon,
  error,
  ...props
}: PaymentInputProps) {
  return (
    <InputWrapper label={label} className="w-full">
      <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px] px-[16px] gap-[6px]">
        <Icon className="shrink-0 text-input" />
         <FormInput
          placeholder={placeholder}
          className="!p-0 w-full"
          {...props}
        />
      </div>
       <FormError message={error?.message} />
    </InputWrapper>
  );
}