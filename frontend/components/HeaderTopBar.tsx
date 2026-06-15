"use client";

import AllMenuItem from "@/components/AllMenuItem";
import HeaderUserBtn from "@/components/HeaderUserBtn";
import HeaderCartBtn from "@/components/HeaderCartBtn";
import DeliveryInfo from "@/components/DeliveryInfo";
import SearchBar from "@/components/SearchBar";
import HeaderLogo from "@/components/HeaderLogo";

interface HeaderTopBarProps {
  onAllClick: () => void;
  isLoggedIn: boolean;
  cartCount: number;
  userAvatar?: string;
  userName?: string; 
}

export default function HeaderTopBar({ 
  onAllClick, 
  isLoggedIn, 
  cartCount, 
  userAvatar,
  userName 
}: HeaderTopBarProps) {
  return (
    <div className="flex flex-wrap layout-sm:flex-nowrap w-full bg-surface-dark layout-sm:gap-[59px] header-padding">
      <div className="pt-4 layout-sm:pt-0 order-1 flex-1 flex items-center justify-start layout-sm:justify-between gap-3">
        <AllMenuItem mobile onClick={onAllClick}/>
        <HeaderLogo />
        <DeliveryInfo />
      </div>
      
      <div className="py-[10px] order-3 layout-sm:order-2 w-full max-w-[1126px] flex items-center justify-center">
        <SearchBar />
      </div>
      
      <div className="pt-4 layout-sm:pt-0 order-2 layout-sm:order-3 flex-1 flex items-center justify-end">
        <div className="w-full flex justify-end layout-sm:justify-between items-center gap-3">
          
          
          <HeaderUserBtn 
            isLoggedIn={isLoggedIn} 
            userAvatar={userAvatar} 
            userName={userName} 
          />
          
          
          <HeaderCartBtn isLoggedIn={isLoggedIn} cartCount={cartCount} />
          
        </div>
      </div>
    </div>
  );
}