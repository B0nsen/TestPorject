"use client";

import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductActionButton from "./ProductActionButton";
import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import WishlistButton from "./WishlistButton";

interface ProductPurchaseActionsProps {
  maxQuantity?: number;
  inStock?: boolean;
  tabletOnly?: boolean;
  productId: number;
  isFavorite?: boolean;
  onWishlistClick?: (productId: number) => void;
}

export default function ProductPurchaseActions({
  maxQuantity,
  inStock = true,
  tabletOnly = false,
  productId,
  isFavorite = false,
  onWishlistClick,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productId, quantity);
  };

  const handleWishlistClick = () => {
    if (onWishlistClick) {
      onWishlistClick(productId);
    }
  };

  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden w-full max-w-[206px]"
          : "block w-full"
      }
    >
      <div className="flex flex-col gap-[10px]">
        {/* Статус наличия товара */}
        <span className="text-[16px] font-medium text-[#007600] leading-none mb-0.5 block">
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        {/* Селектор количества (добавили плавный border-hover во внутренний ProductQuantitySelector, если он кастомный, 
            либо оборачиваем в контейнер с ховером) */}
        {inStock && (
          <div className="transition-all duration-200 hover:opacity-90">
            <ProductQuantitySelector
              maxCount={maxQuantity}
              value={quantity}
              onChange={setQuantity}
            />
          </div>
        )}

        {/* Ряд действий: Кнопка Add to Cart и WishlistButton */}
        <div className="flex gap-[10px] items-center w-full">
          {/* ИСПРАВЛЕНО: Добавлен премиальный ховер-эффект с потемнением и легким scale / тенью */}
          <ProductActionButton
            onClick={handleAddToCart}
            className="flex-1 h-[34px] bg-[#4C7DFF] hover:bg-[#3462df] hover:shadow-md active:scale-[0.99] text-white font-semibold text-[13px] rounded-[100px] flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            Add to Cart
          </ProductActionButton>

          {/* ИСПРАВЛЕНО: Добавлены инвертированные ховеры для обоих состояний кнопки вишлиста */}
          <div 
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 shadow-sm cursor-pointer transition-all duration-200 active:scale-[0.95]
              ${isFavorite 
                ? "bg-[#E6ECF5] border border-[#10141C]/20 hover:bg-[#10141C] hover:text-white [&_svg]:hover:!invert-0" 
                : "bg-[#10141C] hover:bg-[#4C7DFF]"
              }
              ${isFavorite ? "[&_svg]:!invert" : ""}
              [&_button]:!bg-transparent [&_button]:!w-[34px] [&_button]:!h-[34px] [&_button]:!size-auto`}
          >
            <WishlistButton onClick={handleWishlistClick} />
          </div>
        </div>
      </div>
    </div>
  );
}