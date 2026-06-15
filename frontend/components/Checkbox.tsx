"use client";
import CheckboxIcon from "@/assets/icons/check_box_empty.svg?react";
import CheckboxCheckedIcon from "@/assets/icons/check_box.svg?react";

type CheckboxProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    labelClassName?: string;
  };

export function Checkbox({
  label,
  error,
  labelClassName = "text-[11px] leading-none",
  checked,
  ...props
}: CheckboxProps) {
  const Icon = checked
    ? CheckboxCheckedIcon
    : CheckboxIcon;

  return (
    <div>
      <label className="flex items-center justify-center gap-[13px] cursor-pointer">
      <input
          type="checkbox"
          checked={checked}
          className="hidden"
          {...props}
        />

        <div className="size-[18px] flex items-center justify-center shrink-0">
          <Icon width={18} height={18} />
        </div>

        <span className={labelClassName}>{label}</span>
      </label>

       {error && (
        <p className="text-center error-text">
          {error}
        </p>
      )}
    </div>
  );
}