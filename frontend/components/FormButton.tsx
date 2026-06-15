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
      className={`rounded-[20px] px-[34px] py-[10px] text-[20px] leading-[100%] align-middle bg-blue-500 w-fit cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}