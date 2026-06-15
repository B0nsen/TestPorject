import CartQuantityControl from "./CartQuantityControl";
import Image from "next/image";
import deleteIcon from "@/assets/icons/delete.svg";
import CheckCircle from "./CheckCircle";
import CartItemCard from "./CartItemCard";
import { CartItemType } from "@/contexts/cart.context";
import { formatPrice } from "@/lib/utils/formatPrice";

type CartItemProps = {
  item: CartItemType;
  checked?: boolean;
  onToggleCheck: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: (id: number) => void;
};
export default function CartItem({
  item,
  checked,
  onToggleCheck,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemProps) {
  const { id, title, price, quantity, image, discount, listPrice } = item;
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-[12px]">
      {checked !== undefined && (
        <CheckCircle checked={checked} onClick={onToggleCheck} />
      )}
      <CartItemCard>
        <div className="relative size-[60px] sm:size-[135px] rounded-[10px] overflow-hidden shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 60px, 135px"
            className="object-cover"
          />
        </div>

        <div
          className="flex flex-col justify-between w-full
          gap-[12.5px] layout-account-sm:gap-[8px]"
        >
          <div className="flex justify-between items-start gap-[6px]">
            <span className="max-w-[80%] text-[clamp(12px,3vw,24px)] leading-[1.3] font-normal align-middle">
              {title}
            </span>
            <button onClick={() => onDelete(id)}>
              <Image
                src={deleteIcon}
                alt="delete"
                width={20}
                height={23}
                className="shrink-0 cursor-pointer"
              />
            </button>
          </div>

          <div className="flex flex-col gap-[12.5px]">
            <div className="flex sm:flex-row flex-col justify-between items-start w-full">
              <div className="shrink flex w-full items-center justify-between gap-2 border-t border-card-border pt-[13px]">
                <CartQuantityControl
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
                <div className="flex flex-col items-end ">
                  <span className="flex gap-1">
                    {discount != null && discount > 0 && (
                      <span className="cart-price-text text-text-accent-muted">
                        {discount}%
                      </span>
                    )}
                    <span className="cart-price-text">{formatPrice(totalPrice)}$</span>
                  </span>
                  {discount != null && discount > 0 && (
                    <span className="text-right whitespace-nowrap hidden sm:block text-[12px] leading-[16px] text-non-active">
                      List Price: ${listPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CartItemCard>
    </div>
  );
}
