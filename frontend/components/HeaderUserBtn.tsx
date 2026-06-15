"use client";

import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/Avatar"; 
import defaultAvatar from "@/assets/icons/avatar.svg"; 

interface HeaderUserBtnProps {
  isLoggedIn: boolean;
  userAvatar?: string;
  userName?: string;
}

export default function HeaderUserBtn({ isLoggedIn, userAvatar, userName }: HeaderUserBtnProps) {
  return (
    <Link 
      href={isLoggedIn ? "/account" : "/login"} 
      /* ИСПРАВЛЕНО: Убрана жесткая ширина layout-xs:w-[92px], текст встает свободно в один ряд без сжатия хедера */
      className="flex items-center text-light cursor-pointer w-auto flex-shrink-0"
    >
      <div className="relative w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0 flex items-center justify-center">
        {isLoggedIn ? (
          <Avatar src={userAvatar} size={24} />
        ) : (
          <Image 
            src={defaultAvatar} 
            alt="Default Avatar" 
            width={24} 
            height={24} 
            className="object-contain block w-full h-full"
          />
        )}
      </div>

      <div className="ml-2 hidden layout-xs:block">
        {isLoggedIn ? (
          <div className="flex flex-col text-left font-[400] text-[12px] leading-[14px] text-light">
            <span className="truncate max-w-[70px]">
              {userName ? `${userName}'s` : "Your"}
            </span>
            <span className="font-[700] text-[14px] leading-[16px] underline decoration-1">Account</span>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1 text-left font-[500] text-[12.5px] leading-[15px] text-light select-none whitespace-nowrap">
            <span>Sign in</span>
            <span className="text-light/40 font-normal">/</span>
            <span>Register</span>
          </div>
        )}
      </div>
    </Link>
  );
}