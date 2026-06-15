"use client";

import ProductInfoTable from "./ProductInfoTable";
import ProductPrice from "./ProductPrice";
import ProductPurchaseActions from "./ProductPurchaseActions";

interface ProductActionsSectionProps {
  product: any;
  isFavorite?: boolean;
  onWishlistClick?: (productId: number) => void;
}

export default function ProductActionsSection({ product, isFavorite = false, onWishlistClick }: ProductActionsSectionProps) {
  const hasDiscount = product.price?.oldPrice && product.price?.currentPrice;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price.oldPrice - product.price.currentPrice) / product.price.oldPrice) * 100)
    : 16;

  return (
    <section
      className="w-full layout-product-xs:w-[244px] block layout-product-xs:hidden layout-product-lg:block shrink-0 
      bg-[#E6ECF5] px-[18px] py-[14px] text-[#10141C] rounded-[8px] border border-[#2F3A52]/10 shadow-sm font-['Inter',_sans-serif]"
    >
      <div className="flex flex-col gap-[10px]">
        
        {/* Ряд цены и процента скидки */}
        <div className="flex items-start justify-between w-full mb-0.5">
          <ProductPrice price={product.price?.currentPrice} />
          <span className="text-[20px] font-normal text-[#10141C]/60 mt-1 tracking-tight select-none">
            -{discountPercent}%
          </span>
        </div>

        {/* Текст бесплатной доставки */}
        <p className="text-[14px] leading-[20px] font-normal text-[#10141C] select-none">
          {product.actionsSection?.deliveryText || "FREE delivery"}{" "}
          <span className="font-bold">
            {product.actionsSection?.deliveryDate || "Monday, February 2"}
          </span>
        </p>

        {/* ИСПРАВЛЕНО: Локация доставки получила интерактивный hover-эффект (цвет меняется на синий, текст города подчеркивается) */}
        <div className="flex items-center gap-2 text-[#10141C] my-0.5 cursor-pointer group transition-colors duration-150 hover:text-[#4C7DFF]">
          <svg className="w-[16px] h-[14px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM19.5 18.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 5.25h11.25v10.5H2.25zM13.5 7.5h6.25l3 4.5v3.75h-9.25V7.5Z" />
          </svg>
          <span className="text-[14px] leading-[20px] font-normal select-none">
            Delivery to <span className="font-bold group-hover:underline">{product.actionsSection?.shippingLocation || "Constanta"}</span>
          </span>
        </div>

        {/* Блок селектора и кнопок действий */}
        <ProductPurchaseActions
          maxQuantity={product.maxQuantity}
          inStock={product.inStock}
          productId={product.id}
          isFavorite={isFavorite}
          onWishlistClick={onWishlistClick}
        />

        {/* Сводная таблица */}
        <ProductInfoTable data={product.actionsSection} />
      </div>
    </section>
  );
}