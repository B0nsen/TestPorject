import CheckoutBar from "./CheckoutBar";
import OrderSummary from "./OrderSummary";

interface CheckoutMobileProps {
  open: boolean;
  discount: number;
  itemTotal: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shipping: number;
  total: number;
  onCheckout?: () => void;
}

export default function CheckoutMobile({
  open,
  discount,
  itemTotal,
  setOpen,
  shipping,
  onCheckout,
  total,
}: CheckoutMobileProps) {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-90 bg-white layout-account-sm:hidden flex h-[80px] items-center px-[30px]">
        <CheckoutBar  onCheckout={onCheckout} open={open} setOpen={setOpen} total={total} 
         />
      </div>

      <div
        className={`px-[40px] pt-[24px] pb-[12px] fixed z-49 left-0 bottom-[80px] w-full bg-white transition-transform duration-300 layout-account-sm:hidden -mb-[1px] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <OrderSummary discount={discount} itemTotal={itemTotal} shipping={shipping} />
      </div>
    </>
  );
}
