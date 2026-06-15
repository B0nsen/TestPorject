import React from "react";

type ButtonVariant = "primary" | "ternary";
type ButtonHoverVariant = "primary" | "ternary" | "accent_muted";
type ButtonSize = "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  hoverVariant?: ButtonHoverVariant;
  size?: ButtonSize;
  px?: number;
  py?: number;
}

const baseStyles =
  "rounded-[20px] w-fit text-center align-middle transition-colors duration-200 cursor-pointer";

const variantBaseStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-surface-accent
    text-white
  `,
  ternary: `
    bg-transparent
    border border-main
  `,
};

const sizeStyles: Record<ButtonSize, string> = {

  md: "text-[14px] leading-[20px] font-semibold",
  lg: "font-inter text-[18px] leading-[18px] font-normal text-center align-middle tracking-normal",
};

const hoverVariantStyles: Record<ButtonHoverVariant, string> = {
  primary: `
    hover:bg-button-hover
    active:bg-button-hover
  `,
  ternary: `
    hover:text-button-hover
    hover:border-button-hover
    active:text-button-hover
    active:border-button-hover
  `,
  accent_muted: `
    hover:bg-surface-accent-muted
    hover:text-card-dark
    hover:border-transparent
    active:bg-surface-accent-muted
    active:text-card-dark
    active:border-transparent
  `,
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  hoverVariant = variant,
  px = 24,
  size = "md",
  py = 6,
  className = "",
  children,
  ...props
}) => {
  const padding = `px-[${px}px] py-[${py}px]`;

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${padding}
        ${variantBaseStyles[variant]}
        ${hoverVariantStyles[hoverVariant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
