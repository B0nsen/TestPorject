"use client";

import EasyShoppingIcon from "@/assets/icons/easy_shopping.svg?react";
import SaveTimeIcon from "@/assets/icons/save_time.svg?react";
import SecurePaymentIcon from "@/assets/icons/secure_payment.svg?react";

const benefits = [
  {
    Icon: SecurePaymentIcon,
    text: "Secure payment",
  },
  {
    Icon: SaveTimeIcon,
    text: "Save time and power",
  },
  {
    Icon: EasyShoppingIcon,
    text: "Easy shopping",
  },
];

export default function PaymentBenefits() {
  return (
    <div className="flex flex-col sm:w-[440px] gap-[16px] h-fit">
      {benefits.map(({ Icon, text }) => (
        <div key={text} className="flex items-center gap-[20px]">
          <Icon className="w-[56px] h-[56px] shrink-0" />
          <span className="text-[20px] leading-[100%] tracking-[0%] ">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}