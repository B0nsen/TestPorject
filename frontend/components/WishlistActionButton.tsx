type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  className?: string;
  style?: React.CSSProperties;
};

export default function WishlistActionButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  style,
}: Props) {
  const baseStyles = `
    whitespace-nowrap text-[14px] leading-[20px] text-center align-middle
    h-[32px] px-[24px] rounded-[20px] cursor-pointer
    layout-wishlist-sm:w-fit w-full
  `;
  const variantStyles = {
    primary: "bg-surface-accent",
    secondary:
      "bg-transparent border border-accent-muted text-accent-muted",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}