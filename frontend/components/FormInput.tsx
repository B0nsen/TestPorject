type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function FormInput({ className = "", ...props }: FormInputProps) {
  return (
    <input
      {...props}
      className={` text-input bg-input-surface-default
        w-full h-[40px] px-[15px]
        text-[14px] leading-[13px] align-middle
        rounded-[10px]
        border border-transparent
        outline-none focus:outline-none focus:border-transparent focus:ring-0
        ${className}
      `}
    />
  );
}
