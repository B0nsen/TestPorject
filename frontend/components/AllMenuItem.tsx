"use client";

import Image from "next/image";
import categoriesIcon from "@/assets/icons/categs.svg";

interface AllMenuItemProps {
  label?: string;
  mobile?: boolean;
  desktop?: boolean;
  onClick?: () => void;
}

export default function AllMenuItem({
  label = "Categories", 
  mobile = false,
  desktop = false,
  onClick,
}: AllMenuItemProps) {
  const visibilityClass = mobile
    ? "flex layout-sm:hidden"
    : desktop
    ? "hidden layout-sm:flex"
    : "flex";

  return (
    <div
      onClick={onClick}
      className={`${visibilityClass} items-center gap-[5px] cursor-pointer font-sans font-bold text-[13px] leading-[12px] select-none`}
    >
  
      <div className="relative w-[20px] h-[16px] flex-shrink-0">
        <Image
          src={categoriesIcon}
          alt="Categories"
          fill
          sizes="20px"
          className="object-contain"
          priority
        />
      </div>
      
      <span className="translate-y-px text-[#E6ECF5]">{label}</span>
    </div>
  );
}