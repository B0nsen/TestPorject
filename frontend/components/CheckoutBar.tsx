"use client";

import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-down-cart.svg";
import { formatPrice } from "@/lib/utils/formatPrice";

interface CheckoutBarProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onCheckout?: () => void;
  total: number;
}

export default function CheckoutBar({
  open,
  setOpen,
  onCheckout,
  total,
}: CheckoutBarProps) {
  return (
    <div className="flex flex-row layout-account-sm:flex-col justify-between items-center w-full gap-[14px]">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-start justify-between gap-[10px] layout-account-sm:w-full w-fit text-black"
      >
        <div className="flex items-center gap-[10px] ">
          <button className="layout-account-sm:hidden flex items-center shrink-0">
            <Image
              src={arrowDown}
              alt="Toggle order summary"
              width={11}
              height={6}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <span
            className="whitespace-nowrap shrink-0 
          checkout-text-lg font-normal layout-account-sm:font-semibold"
          >
            Item total:
          </span>
        </div>

        <span className="layout-account-sm:checkout-text-md checkout-text-lg">
          {formatPrice(total)}$
        </span>
      </div>

      <button onClick={onCheckout} className="w-fit layout-account-sm:w-full layout-account-sm:h-[32px] h-[45px] 
        bg-surface-accent rounded-full px-5 font-semibold layout-account-sm:text-[14px] text-[20px] leading-[20px] text-text-main   hover:bg-surface-accent-muted
        hover:text-card-dark
        hover:border-transparent
        active:bg-surface-accent-muted
        active:text-card-dark
        active:border-transparent cursor-pointer transition-colors duration-200 "> 
        Checkout
      </button>
    </div>
  );
}
