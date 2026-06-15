"use client";

import Image from "next/image";
import placeholder from "@/assets/img/catalog-img.png";
import StarsRating from "@/components/StarsRating";
import DeleteButton from "@/components/DeleteButton";
import { formatPrice } from "@/lib/utils/formatPrice";
import { StaticImageData } from "next/image";
import WishlistActionButton from "./WishlistActionButton";

type WishlistItemProps = {
  title: string;
  rating: number;
  price: number;
  onDelete?: () => void;
  onAddToCart?: () => void;
  imageSrc?: string | StaticImageData;
};

export default function WishlistItem({
  title,
  rating,
  price,
  onDelete,
  onAddToCart,
  imageSrc = placeholder,
}: WishlistItemProps) {
  return (
    <div className="flex py-[16px] px-[20px] card-default gap-[8px]">
      <div className="w-[87px] h-[87px] relative rounded-[12px] overflow-hidden shrink-0">
        <Image src={imageSrc} alt="product" fill className="object-cover" />
      </div>
      <div className="flex w-full justify-between sm:flex-row flex-col gap-[8px]">
        <div className="flex flex-col gap-[8px]">
          <span className="font-semibold text-[20px] leading-[32px] align-middle">
            {title}
          </span>
          <div className="flex items-center">
            <span className="text-main/50">{rating}</span>
            <StarsRating size={13} rating={rating} />
          </div>
        </div>

        <div className="flex flex-col sm:items-end items-start sm:gap-[4px] gap-[8px]">
          <DeleteButton onClick={onDelete} className="sm:block hidden" />
          <span className="text-[20px] leading-[100%]">
            {formatPrice(price)}$
          </span>

          <WishlistActionButton onClick={onAddToCart}>
            Add to cart
          </WishlistActionButton>
          <WishlistActionButton
            onClick={onDelete}
            variant="secondary"
            className="sm:hidden block"
          >
            Remove
          </WishlistActionButton>
        </div>
      </div>
    </div>
  );
}
