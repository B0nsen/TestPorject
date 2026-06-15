type InputWrapperProps = {
  label: string;
  className?: string;
  labelClassName?: string;
  children: React.ReactNode;
};

export function InputWrapper({
  label,
  className = "",
  labelClassName = "",
  children,
}: InputWrapperProps) {
  return (
    <div className={`flex flex-col gap-[5px] ${className}`}>
      <span
        className={`font-semibold text-[16px] leading-[32px] align-middle text-surface-accent-muted ${labelClassName}`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}