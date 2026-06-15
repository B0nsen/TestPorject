"use client";

import AccountNavigation from "@/components/AccountNavigation";
import { usePathname } from "next/navigation";
import { accountNavigationLinks } from "@/components/AccountNavigation";

export default function AccountLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === "/account";
  const currentLink = accountNavigationLinks.find((link) =>
    pathname.startsWith(link.href),
  );

  const pageTitle = currentLink?.label;

  return (
    
    <main className="w-full flex justify-center flex-col items-center bg-transparent layout-account-sm:py-[100px] py-[58px] layout-px">
      <div className="w-full max-w-[1528px] flex flex-col layout-account-sm:flex-row items-start justify-between layout-account-sm:gap-[30px] gap-[20px]">
        <div
          className={`
            w-full gap-[30px] flex flex-col
            layout-account-sm:min-w-[280px] layout-account-sm:w-[373px] 
            ${!isRoot ? "hidden layout-account-sm:block" : ""}
          `}
        >
          <AccountNavigation />
        </div>
        <div
          className={`
          w-full flex flex-col min-w-0
          layout-account-sm:max-w-[1082px] 
            ${isRoot ? "hidden layout-account-sm:flex" : ""}
          `}
        >
          <h1 className="font-semibold text-[24px] leading-[28px] align-middle mb-[20px]">
            {pageTitle}
          </h1>
          
         
          <div className="card-default bg-transparent layout-account-sm:px-[20px] py-[20px] px-[10px] gap-[12px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}