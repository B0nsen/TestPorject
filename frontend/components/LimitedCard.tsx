"use client";

import { Limited } from "@/lib/types/limited";
import CatalogProductCard from "./CatalogProductCard";

export default function LimitedCard({ product }: { product: Limited }) {
  const [integerPart, decimalPart] = product.price.toFixed(2).split(".");
  const listPrice = product.listPrice ?? product.price;
  return (
    <CatalogProductCard product={product} variant="limited">
      <div className="p-[10px] flex flex-col gap-[14px] text-main ">
        <p className="layout-catalog-md:line-clamp-3 line-clamp-2 font-medium text-[16px] leading-[20px]">
          {product.title}
        </p>

        <div className="flex items-start flex-col">
          <div className="flex justify-between w-full items-center">
            <span className="flex justify-between items-top">
              <span className="text-[11px] leading-[100%]">$</span>
              <span className="text-[20px] leading-[100%]">{integerPart}.</span>

              <span className="text-[11px] leading-[100%]">{decimalPart}</span>
            </span>
            <span
              className={`font-light text-[24px] leading-[32px] ${
                product.discountPercent ? "text-main" : "text-transparent"
              }`}
            >
              {product.discountPercent ? `-${product.discountPercent}%` : "%"}
            </span>
          </div>

          <span className="text-[12px] leading-[16px] ">
            List price: ${listPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </CatalogProductCard>
  );
}
