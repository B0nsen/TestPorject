"use client";

import Link from "next/link";
import Image from "next/image";
import cartIcon from "@/assets/icons/shopping_cart.svg"; 
import cartCounterIcon from "@/assets/icons/cart_amount.svg"; 
import defaultAvatar from "@/assets/icons/avatar.svg"; 

interface HeaderActionItemProps {
  label: string;
  hideOnMobile?: boolean;
  className?: string;
  onClick?: () => void;
  fixedWidth?: boolean;
  href?: string;
  isCart?: boolean;
  isLoggedIn?: boolean;
  cartCount?: number;
  isProfile?: boolean;
  userAvatar?: string;
}

export default function HeaderActionItem({
  label,
  hideOnMobile = false,
  className = "",
  onClick,
  fixedWidth = false,
  href,
  isCart = false,
  isLoggedIn = false,
  cartCount = 0,
  isProfile = false,
  userAvatar,
}: HeaderActionItemProps) {

  const showBadge = isCart && isLoggedIn && cartCount > 0;

  const content = (
    <div
      onClick={onClick}
      className={`
        flex items-center text-light cursor-pointer font-[700] text-[13px] text-[#E6ECF5] leading-[18px]
        ${hideOnMobile ? "hidden layout-xs:flex" : "flex"}
        ${fixedWidth ? "w-auto layout-xs:w-[92px]" : ""}
      `}
    >
     
      <div className="relative w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0">
        {isCart ? (
          <Image 
            src={cartIcon} 
            alt="Cart" 
            width={24} 
            height={24} 
            className="object-contain block w-full h-full"
          />
        ) : isProfile ? (
          isLoggedIn && userAvatar ? (
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image 
                src={userAvatar} 
                alt="User Avatar" 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Image 
              src={defaultAvatar} 
              alt="Default Avatar" 
              width={24} 
              height={24} 
              className="object-contain block w-full h-full"
            />
          )
        ) : (
          <div className="w-full h-full rounded-full bg-surface-light" />
        )}

       
        {showBadge && (
          <div className="absolute top-0 right-0 w-[18px] h-[18px] z-10 translate-x-[30%] -translate-y-[30%] flex items-center justify-center">
            <Image 
              src={cartCounterIcon} 
              alt="Count background" 
              fill
              className="object-contain"
              priority
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold leading-none select-none pb-[1px]">
              {cartCount}
            </span>
          </div>
        )}
      </div>

      {!isCart && (
        <div className={`ml-2 hidden layout-xs:block ${className}`}>
          {isProfile && isLoggedIn ? (
            <div className="flex flex-col text-left font-[400] text-[12px] leading-[14px] text-light">
              <span>Your</span>
              <span className="font-[700] text-[14px] leading-[16px] underline decoration-1">Account</span>
            </div>
          ) : (
            <span className="font-[700] text-[13px] leading-[18px]">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}