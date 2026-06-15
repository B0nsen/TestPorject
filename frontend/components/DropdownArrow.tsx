import ArrowDown from "@/assets/icons/arrow-back.svg?react";

interface DropdownArrowProps {
  isOpen?: boolean;
  height?: number;
  width?: number;
  className?: string;
}

export default function DropdownArrow({
  isOpen = false,
  height = 6,
  width = 11,
  className = "",
}: DropdownArrowProps) {
  return (
    <ArrowDown
      width={width}
      height={height}
      className={`
        transition-transform duration-300
        ${isOpen ? "rotate-180" : "rotate-0"}
        ${className}
      `}
    />
  );
}