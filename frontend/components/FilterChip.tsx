import CloseIcon from "@/assets/icons/close_small.svg?react";
import CheckIcon from "@/assets/icons/check.svg?react";

type FilterChipProps = {
  label: string;
  onClick: () => void;
};
export default function FilterChip({ label, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center
        rounded-[12px] border border-non-active  text-main/60
        px-[12px]  gap-[6.5px]
        hover:border-black transition
       
        max-w-full
        h-[27px]
      "
    >
      <CheckIcon className="w-[9px] h-[9px] flex-shrink-0 text-main" />

      <span className="min-w-0 truncate text-[14px] leading-[20px] align-middle">
        {label}
      </span>

      <CloseIcon className="w-[6px] h-[6px] flex-shrink-0 ml-auto" />
    </button>
  );
}
