import React from "react";

type CtaButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export default function CtaButton({
  children,
  onClick,
  disabled=false,
  type = "button",
  className = "",
}: CtaButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        bg-surface-accent
        h-[32px]
        rounded-[100px]
        cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}