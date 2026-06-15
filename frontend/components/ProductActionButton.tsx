"use client";

interface ProductActionButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

export default function ProductActionButton({
  children,
  onClick,
  className = "",
}: ProductActionButtonProps) {
  return (
    <button
      className={`w-full h-[32px] font-inter font-normal text-[14px] cursor-pointer leading-[19px] text-center align-middle  rounded-full ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}