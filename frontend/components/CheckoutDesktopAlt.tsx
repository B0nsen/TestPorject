import { formatPrice } from "@/lib/utils/formatPrice";
import CheckoutBar from "./CheckoutBar";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import CheckoutBarAlt from "./CheckoutBarAlt";

interface CheckoutDesktopProps {
  selectedCount: number;
  discount: number;
  subtotal: number;
  itemTotal: number;
  shipping: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  onCheckout: () => void;
}

export default function CheckoutDesktopAlt({
  itemTotal,
  discount,
  selectedCount,
  setOpen,
  subtotal,
  shipping,
  total,
  onCheckout,
}: CheckoutDesktopProps) {
  return (
    <div className="w-full hidden flex-col gap-[18px] layout-account-sm:flex text-black">
      <div className="flex flex-col gap-[12px] card-checkout justify-between min-h-[60px]">
        <div className="flex items-center gap-[12px] justify-between ">
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
        <button
          onClick={onCheckout}
          className="w-fit layout-account-sm:w-full layout-account-sm:h-[32px] h-[45px] 
          bg-surface-accent rounded-full px-5 font-semibold layout-account-sm:text-[14px] text-[20px] leading-[20px] text-text-main 
          cursor-pointer
          hover:bg-surface-accent-muted
          hover:text-card-dark
          hover:border-transparent
          active:bg-surface-accent-muted
          active:text-card-dark
          active:border-transparent transition-colors duration-200 "
        >
          Checkout
        </button>
      </div>

      {selectedCount > 0 && (
        <>
          <div className="flex-col gap-[14px] card-checkout">
            <OrderSummary
              discount={discount}
              itemTotal={itemTotal}
              shipping={shipping}
            />
            <CheckoutBarAlt setOpen={setOpen} total={total} />
          </div>
        </>
      )}
    </div>
  );
}
