"use client";
import { useState } from "react";

import VisibilityIcon from "@/assets/icons/visibility.svg?react";
import VisibilityOffIcon from "@/assets/icons/visibility_off.svg?react";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  errorType?: string;
  onErrorClick?: () => void;
};

export function AuthInput({
  placeholder,
  autoComplete,
  onErrorClick,
  errorType,
  error,
  type,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <div
        className={`relative text-input flex bg-input-surface-default rounded-[10px] overflow-hidden 
          ${error ? "border border-error" : "border border-transparent"}`}
      >
        <input
          {...props}
          type={inputType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full h-[40px] bg-input-surface-default p-[15px] 
          font-normal text-[13px] focus:outline-none `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className={`bg-input-surface-default h-[40px] cursor-pointer flex items-start pr-[15px] ${
              showPassword ? "pt-[11px]" : "pt-[9px]"
            }`}
          >
            <div>
              {showPassword ? (
                <VisibilityIcon className="w-[22px] h-[17px]" />
              ) : (
                <VisibilityOffIcon className="w-[22px] h-[24px]" />
              )}
            </div>
          </button>
        )}
      </div>
      {error &&
        (errorType === "forgot-password" ? (
          <div onClick={onErrorClick} className="cursor-pointer block">
            <p className="mt-[10px] text-right text-error text-[13px] leading-[13px] underline">
              {error}
            </p>
          </div>
        ) : (
          <p className="mt-[10px] text-right text-error text-[13px] leading-[13px]">
            {error}
          </p>
        ))}
    </div>
  );
}
