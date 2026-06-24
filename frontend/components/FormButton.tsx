import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function FormButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-[20px] px-[34px] py-[10px] text-[20px] leading-[100%] align-middle bg-surface-accent w-fit cursor-pointer ${className}
                  transition-colors duration-200 
                  hover:bg-surface-accent-muted
                  hover:text-card-dark
                  hover:border-transparent
                  active:bg-surface-accent-muted
                  active:text-card-dark
                  active:border-transparent`}
      {...props}
    >
      {children}
    </button>
  );
}