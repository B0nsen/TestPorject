"use client";

type PriceInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function PriceInput({ value, onChange, className }: PriceInputProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={onChange}
      className={`w-[65px] h-[25px] rounded-[10px] px-[6px] text-center
        [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none
        focus:outline-none focus:border-transparent  ${className}`
      }
    />
  );
}