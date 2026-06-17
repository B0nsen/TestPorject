"use client";

import Image from "next/image";
import Link from "next/link";
import { Limited } from "@/lib/types/limited";

export default function LimitedCard({ product }: { product: Limited }) {
    const [integerPart, decimalPart] = product.price.toFixed(2).split(".");
    const listPrice = product.listPrice ?? product.price;

    return (
        <Link
            href={`/product/${product.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
        cursor-pointer w-full overflow-hidden
        flex flex-col justify-between card-default !rounded-[10px]
        h-auto layout-catalog-xs:h-[430px]
      `}
        >
            <div className="relative w-full aspect-[188/261] layout-catalog-xs:flex-1 layout-catalog-xs:aspect-auto overflow-hidden bg-white">
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain object-center h-full p-2"
                    sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute top-[10px] left-[8px] bg-surface-accent text-main text-[11px] leading-[16px] px-[6px] py-[4px] rounded-[3px]">
                    Limited time deal
                </div>
            </div>

            <div className="p-[10px] flex flex-col gap-[14px] text-main">
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
                            className={`font-light text-[24px] leading-[32px] ${product.discountPercent ? "text-main" : "text-transparent"
                                }`}
                        >
                            {product.discountPercent ? `-${product.discountPercent}%` : "%"}
                        </span>
                    </div>

                    <span className="text-[12px] leading-[16px]">
                        List price: ${listPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
