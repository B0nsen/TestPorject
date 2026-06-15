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
  onWishlistClick?: (productId: number) => void;
}export default function ProductPurchaseActions({
  maxQuantity,
  inStock = true,
  tabletOnly = false,
  productId,
  onWishlistClick,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productId, quantity);
  };

  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden max-w-[206px]"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <div className="flex flex-col gap-2">
        <span className="text-[17px] leading-[24px] align-middle">
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        <ProductQuantitySelector
          maxCount={maxQuantity}
          value={quantity}
          onChange={setQuantity}
        />

        <div className="flex gap-[9px]">
          <ProductActionButton
            onClick={handleAddToCart}
            className="bg-surface-accent text-text-main"
          >
            Add to Cart
          </ProductActionButton>

          <WishlistButton onClick={() => onWishlistClick?.(productId)} />
        </div>
      </div>
    </div>
  );
}