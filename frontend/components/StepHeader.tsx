interface StepHeaderProps {
  step?: number;
  title?: string;
  onChange?: () => void;
  changeLabel?: string;
  disabled?: boolean;
}

export default function StepHeader({
  step = 1,
  title = "Select delivery address",
  onChange,
  disabled = false,
  changeLabel,
}: StepHeaderProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className={`
        flex items-center gap-3 w-full text-left
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <div
        className={`
      size-[48px] rounded-full shrink-0 flex items-center justify-center border font-semibold text-[18px] leading-[28px] text-center
      ${
        disabled
          ? "border-card-border text-card-border"
          : "border-accent text-accent"
      }
    `}
      >
        {step}
      </div>
      <span
        className={` 
      font-semibold text-[20px] leading-[27px]
      ${disabled ? "text-card-border" : ""}
    `}
      >
        {title}
      </span>
      {changeLabel && !disabled && (
        <span className="ml-auto font-semibold text-[20px] leading-[28px] underline layout-account-sm:block hidden">
          {changeLabel}
        </span>
      )}
    </button>
  );
}
