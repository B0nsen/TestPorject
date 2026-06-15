"use client";

import { useCart } from "@/lib/hooks/useCart";
import CatalogProductCard from "./CatalogProductCard";
import StarsRating from "./StarsRating";
import { Button } from "./Button";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <CatalogProductCard product={product} variant="product">
      <div className="p-[10px] flex flex-col gap-[8px]">
        <p className="line-clamp-2 font-medium text-[16px] leading-[20px]">
          {product.title}
        </p>

        <div className="flex gap-1 items-center">
          <span>{product.rating}</span>
          <StarsRating size={13} rating={product.rating} />
        </div>

        <div className="flex items-center gap-1">
          <span>$</span>
          <span className="text-[26px] leading-[100%]">{product.price}</span>
        </div>
        <Button size="md" hoverVariant="accent_muted" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product.id, 1);
          }}> Add to cart</Button>
      </div>
    </CatalogProductCard>
  );
}
