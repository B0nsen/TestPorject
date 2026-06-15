"use client";

import { useRef } from "react";
import CatalogSliderCard from "./CatalogSliderCard";
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import ArrowRight from "@/assets/icons/arrow-right.svg?react";

interface CatalogItemJSON {
  id: number;
  title: string;
  price: number;
  rating?: number;
  imageUrl: string;
}

interface CatalogSliderProps {
  data: CatalogItemJSON[];
}
export default function CatalogSlider({ data }: CatalogSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!data?.length) return null;

  const getScrollAmount = () => {
    const container = scrollRef.current;
    if (!container) return 300;

    const card = container.querySelector(".catalog-card") as HTMLElement;
    if (!card) return 300;

    const styles = getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || "0");

    return card.offsetWidth + gap;
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = getScrollAmount();

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-[1528px] mx-auto">
      <h2 className="text-[#E6ECF5] font-bold text-[20px] mb-4  px-4 md:px-0">
        Catalog slider
      </h2>

      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-[26px] h-[44px]" />
        </button>
        <div
          ref={scrollRef}
          className="
            flex
            gap-[31px]
            overflow-x-auto
            scroll-smooth
            w-full
            no-scrollbar
             px-4 md:px-0
          "
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="
                catalog-card
                shrink-0
                w-[260px]
              "
            >
              <CatalogSliderCard
                title={item.title}
                price={String(item.price)}
                imageSrc={item.imageUrl}
                href={`/product/${item.id}`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowRight className="w-[26px] h-[44px]" />
        </button>
      </div>
    </div>
  );
}
