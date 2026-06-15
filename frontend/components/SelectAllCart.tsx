"use client";

import CheckCircle from "./CheckCircle";

type SelectAllCartProps = {
  checked: boolean;
  count: number;
  onToggle?: () => void;
};

export default function SelectAllCart({
  checked,
  count,
  onToggle,
}: SelectAllCartProps) {
  const disabled = count === 0;
  const showCount = count > 1;

  return (
    <div className="flex gap-[10px] items-center">
      <CheckCircle
        checked={checked}
        disabled={count === 0}
        onClick={onToggle}
      />

      <span
        className={`text-[16px] leading-[28px] font-semibold transition ${
          disabled ? "text-non-active" : "text-main"
        }`}
      >
        Select all{showCount ? ` (${count})` : ""}
      </span>
    </div>
  );
}
