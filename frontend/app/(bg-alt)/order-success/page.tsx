"use client";

import { useCart } from "@/lib/hooks/useCart";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import { usePaymentStore } from "@/lib/stores/payment-store";
export default function OrderSuccessPage() {
  const { checkedItems } = useCart();

  const router = useRouter();
  console.log(checkedItems);

  const payment = usePaymentStore((s) => s.payment);
  console.log(payment);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center layout-px gap-[100px] mt-[100px] layout-checkout-md:mb-[0px] mb-[100px] ">
      <div
        className="flex flex-col layout-checkout-md:flex-row items-center 
        layout-checkout-md:items-start justify-center layout-checkout-md:justify-between max-w-[1100px] 
        w-full layout-checkout-md:gap-6 gap-15"
      >
        <div className="flex flex-col">
          <span className="font-[Genos] font-normal text-[clamp(96px,6vw,128px)] leading-[clamp(80px,5vw,100px)] tracking-normal mb-[20px]">
            Thank you
          </span>
          <span className="font-[Inter] font-normal text-[clamp(32px,2.5vw,40px)] leading-[clamp(36px,3vw,44px)] tracking-normal mb-[40px] ml-[27px]">
            for your order!
          </span>

          <div className="flex gap-[20px]">
            <Button
              px={24}
              py={10}
              size="lg"
              variant="primary"
              hoverVariant="accent_muted"
              onClick={() => router.push("/")}
            >
              Return to Orbis
            </Button>

            <Button
              px={24}
              py={10}
              size="lg"
              variant="ternary"
              hoverVariant="accent_muted"
              onClick={() => router.push("/catalog")}
            >
              Go to Catalog
            </Button>
          </div>
        </div>

        <div className="bg-card-default rounded-[12px] w-full max-w-[400px] p-[12px] flex flex-col gap-[12px]">
          {checkedItems.map((item) => (
            <div key={item.id} className="flex justify-between gap-[10px]">
              <div className="flex flex-col gap-[6px]">
                <span className="title-checkout-item line-clamp-3">
                  {item.title}
                </span>

                <span className="text-checkout-item">
                  {item.quantity} item: ${item.price * item.quantity}
                </span>
                <span className="text-checkout-item">
                  Order ID: RO-123-456789012345
                </span>
                <span className="text-checkout-item">
                  Order date: March 2, 2025
                </span>
              </div>

              <div className="size-[112px] shrink-0 rounded-[10px] bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain object-center p-1"
                />
              </div>
            </div>
          ))}
          <div className="title-checkout-item">Payment information</div>
          <span className="text-checkout-item">
            {payment?.nameOnCard ?? "—"}
          </span>

          <span className="text-checkout-item">
            {payment?.cardNumber
              ? `Credit card Visa - ${payment.cardNumber.slice(-4)}`
              : "—"}
          </span>

          <span className="text-checkout-item">
            {payment?.expiryDate ?? "—"}
          </span>
        </div>
      </div>
      <span className="max-w-[431px] h-[44px] flex items-center gap-[8px] opacity-100 text-center text-main/60">
        We&apos;ve received your order and it’s now being processed. You will
        receive a confirmation email shortly.
      </span>
    </div>
  );
}
