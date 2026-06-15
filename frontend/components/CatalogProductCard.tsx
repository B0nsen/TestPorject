"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
type ProductBase = {
  id: number;
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
};
type CatalogProductCardProps = {
  product: ProductBase;
  variant: "product" | "limited";
  children: React.ReactNode;
  className?: string;
};
export default function CatalogProductCard({
  product,
  variant,
  children,
  className = "",
}: CatalogProductCardProps) {
  const router = useRouter();

  return (
    <Link
      href={`/product/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        cursor-pointer w-full overflow-hidden
        flex flex-col justify-between card-default !rounded-[10px]
        h-auto layout-catalog-xs:h-[430px]
        ${className}
      `}
    >
      <div className="relative w-full aspect-[188/261] layout-catalog-xs:flex-1 layout-catalog-xs:aspect-auto">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />

        {variant === "limited" && (
          <div className="absolute top-[10px] left-[8px] bg-surface-accent text-main text-[11px] leading-[16px] px-[6px] py-[4px] rounded-[3px]">
            Limited time deal
          </div>
        )}
      </div>
      {children}
    </Link>
  );
}
