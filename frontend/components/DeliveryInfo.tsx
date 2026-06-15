"use client";

import Image from "next/image";
import truckIcon from "@/assets/icons/delivery.svg"; 

export default function DeliveryInfo() {
  return (
    <div 
      className="hidden layout-sm:flex items-center gap-1 w-[130px] h-[40px] py-[5px] text-[#E6ECF5] flex-shrink-0"
    >
      <div className="w-[40px] h-[40px] relative flex-shrink-0">
        <Image
          src={truckIcon}
          alt="Delivery truck"
          fill
          className="object-contain"
        />
      </div>

     
      <div className="flex flex-col justify-center leading-tight text-text-main">
        <span className="text-[11px] font-normal leading-[14px]">
          Delivery to:
        </span>
        <span className="text-[13px] font-bold leading-[15px]">
          Constanta
        </span>
      </div>
    </div>
  );
}