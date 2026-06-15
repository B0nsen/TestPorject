"use client";

import Link from "next/link";
import AboutItem from "./AboutItem";
import ProductPrice from "./ProductPrice";
import ProductPurchaseActions from "./ProductPurchaseActions";
import Stars from "./StarsRating";

export default function AboutProduct({
  product,
  onWishlistClick,
}: {
  product: any;
  onWishlistClick?: (productId: number) => void;
}) {
  return (
    <section className="w-full layout-product-xl:w-[637px] flex flex-col gap-[4px]">
      <h1 className="text-2xl leading-8 align-middle">{product.title}</h1>

      <div className="flex flex-col gap-[3px]">
        <Link
          href={product.storeLink}
          className="text-[12.9px] leading-5 align-middle"
        >
          Visit the Store
        </Link>

        <div className="flex items-center gap-[3px] text-small-default">
          <span>{product.rating}</span>
          <Stars rating={product.rating} size={13} gap={2} />
          <span>({product.ratingCount.toLocaleString("en-US")})</span>
        </div>
      </div>

      <hr className="mb-[20px] border-surface-1" />

      <div className="flex justify-between items-center">
        <span className="flex flex-col">
          <ProductPrice price={product.price.currentPrice} />
          <span className="flex items-center text-xs leading-4">
            <span className="layout-product-product-hidden ">
              List Price: ${product.price.listPrice}
            </span>
            <span className="w-3 h-3 rounded-full bg-surface-3 ml-1 shrink-0 layout-product-product-hidden"></span>
          </span>
        </span>

        <span className="flex flex-col items-center text-2xl leading-8 font-light  layout-product-product-hidden">
          -{product.price.discountPercent}%
        </span>
      </div>

      <ProductPurchaseActions
        maxQuantity={product.maxQuantity}
        inStock={product.inStock}
        tabletOnly
        productId={product.id}
        onWishlistClick={onWishlistClick}
      />

      <AboutItem items={product.aboutItems} />
    </section>
  );
}
