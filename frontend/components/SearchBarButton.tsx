"use client";

import Image from "next/image";

interface SearchBarButtonProps {
  icon: string;
  label?: string;
  className?: string;
  hiddenOnMobile?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  onClick?: () => void; // ДОБАВЛЕНО
}

export default function SearchBarButton({
  icon,
  label,
  className = "text-[#E6ECF5]",
  iconWidth = 17,
  iconHeight = 17,
  hiddenOnMobile = false,
  onClick, // ДОБАВЛЕНО
}: SearchBarButtonProps) {
  return (
    <button
      type="button" // ИСПРАВЛЕНО: предотвращает submit формы при клике на "All"
      onClick={onClick} // ДОБАВЛЕНО
      className={`w-[45px] h-full gap-1 flex items-center justify-center flex-shrink-0 cursor-pointer ${hiddenOnMobile ? "hidden layout-sm:flex" : ""} ${className}`}
    >
      <span className="text-[11px] text-[#E6ECF5]">{label}</span>
      <Image
        src={icon}
        alt={label ?? "icon"}
        width={iconWidth}
        height={iconHeight}
        className="object-contain"
      />
    </button>
  );
}