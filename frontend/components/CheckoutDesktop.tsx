import { formatPrice } from "@/lib/utils/formatPrice";
import CheckoutBar from "./CheckoutBar";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import { useRouter } from "next/navigation";
interface CheckoutDesktopProps {
  selectedCount: number;
  discount: number;
  subtotal: number;
  itemTotal: number;
  shipping: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
}

export default function CheckoutDesktop({
  itemTotal,
  discount,
  selectedCount,
  setOpen,
  subtotal,
  shipping,
  total,
}: CheckoutDesktopProps) {
  const router = useRouter();

  return (
    <div className="w-full hidden flex-col gap-[18px] layout-account-sm:flex text-black">
      <div className="flex items-center gap-[12px] card-checkout justify-between min-h-[60px]">
        <span className="checkout-text-lg">
          {subtotal > 0
            ? `Subtotal (${selectedCount} item${selectedCount > 1 ? "s" : ""}):`
            : "No items selected"}
        </span>

        {subtotal > 0 && (
          <span className="whitespace-nowrap cart-price-text">
            {" "}
            {formatPrice(subtotal)}$
          </span>
        )}
      </div>
      {selectedCount > 0 && (
        <>
          <div className="flex-col gap-[14px] card-checkout">
            <OrderSummary
              discount={discount}
              itemTotal={itemTotal}
              shipping={shipping}
            />
            <CheckoutBar
              setOpen={setOpen}
              total={total}
              onCheckout={() => router.push("/checkout")}
            />
          </div>
          <div className="flex-col gap-[12px] card-checkout">
            <span className="checkout-text-md">Pay with</span>

            <PaymentOptions />
            <div className="flex flex-col">
              <span className="checkout-text-md">Protection</span>
              <span>
                Get a full refund if the item is not as described or not
                delivered
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
