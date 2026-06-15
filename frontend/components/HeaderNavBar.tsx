"use client";

import AllMenuItem from "./AllMenuItem";
import Link from "next/link";

const navItems = [
  { label: "Deals", href: "/deals" },
  { label: "Delivery today", href: "/delivery-today" },
  { label: "Verified sellers", href: "/verified-sellers" },
  { label: "Easy returns", href: "/easy-returns" },
];

export default function HeaderNavBar({ onAllClick }: { onAllClick: () => void }) {
  return (
    <div className="w-full  flex items-center bg-[#232938] text-[#E6ECF5] header-padding">
      
      <div className="flex-1 flex items-center">
        <AllMenuItem desktop onClick={onAllClick} />
      </div>

     
      <div className="w-full max-w-[700px] h-full flex items-center justify-between gap-[10px] ">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="h-full flex items-center justify-center text-center text-[#E6ECF5] py-[10px]"
          >
            {item.label}
          </Link>
        ))}
      </div>
     
      <div className="flex-1 flex items-center" />
    </div>
  );
}