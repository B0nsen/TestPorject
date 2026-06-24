"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

// Імпорт Ваших SVG іконок як React-компонентів
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import ArrowRight from "@/assets/icons/arrow-right.svg?react";

interface ProductItem {
  productName: string;
  price: string;
  imageSrc: string | null;
  href: string; 
}

interface ProductSliderCardProps {
  requestTitle: string;
  items: ProductItem[];
}

export default function RecommendR3SliderCard({ 
  requestTitle, 
  items = [] 
}: ProductSliderCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col bg-surface-11 rounded-[15px] border border-[#2F3A52] overflow-hidden shrink-0 shadow-lg w-full h-[454px] md:h-full">
        <div className="px-[26px] pt-[24px] pb-4">
          <p className="text-white/50">No items available</p>
        </div>
      </div>
    );
  }

  const currentProduct = items[currentIndex];

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col bg-[#E6ECF5] rounded-[15px] border border-[#2F3A52] overflow-hidden shrink-0 shadow-lg w-full h-[454px] md:h-full">
      
      <div className="px-[26px] pt-[24px] pb-[16px] shrink-0">
        <h2 className="font-sans font-bold text-[20px] text-[#10141C] leading-[27px]">
          {requestTitle}
        </h2>
      </div>

      {/* Контейнер слайдера з чистим фоном для картки товару */}
      <div className="relative flex-1 w-full flex items-center justify-center bg-[#E6ECF5] min-h-0">
        
        {/* Кнопка "Назад": Повернуто оригінальну темну плашку-заокруглення, 
            але додано анімацію збільшення (hover:scale-110) як у CatalogSlider.
            Текст іконки примусово фарбуємо в білий (text-white).
        */}
        <button 
          onClick={prevSlide}
          type="button"
          className="absolute left-[16px] z-10 w-[45px] h-[55px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#1A2030]/70 active:scale-95 cursor-pointer text-white border-none outline-none select-none"
          aria-label="Previous image"
        >
          <ArrowLeft className="w-[26px] h-[44px] block text-white" />
        </button>

        <div className="relative w-[150px] h-[210px] md:w-[181px] md:h-[255px]">
          {currentProduct.imageSrc ? (
            <Image
              key={currentIndex}
              src={currentProduct.imageSrc}
              alt={currentProduct.productName}
              fill
              sizes="(max-width: 768px) 150px, 181px"
              className="object-contain"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#10141C]/30 text-[14px] font-sans">
              No image
            </div>
          )}
        </div>

        {/* Кнопка "Вперед": Повернуто оригінальну темну плашку-заокруглення,
            але додано анімацію збільшення (hover:scale-110) як у CatalogSlider.
            Текст іконки примусово фарбуємо в білий (text-white).
        */}
        <button 
          onClick={nextSlide}
          type="button"
          className="absolute right-[16px] z-10 w-[45px] h-[55px] md:w-[55px] md:h-[69px] bg-[#1A2030]/50 rounded-[10px] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#1A2030]/70 active:scale-95 cursor-pointer text-white border-none outline-none select-none"
          aria-label="Next image"
        >
          <ArrowRight className="w-[26px] h-[44px] block text-white" />
        </button>
      </div>

      <Link 
        href={currentProduct.href} 
        className="h-[112px] shrink-0 bg-[#1F2636] px-[26px] flex flex-col justify-center hover:bg-[#2A3347] transition-all duration-200 group border-t border-[#2F3A52]/50"
      >
        <div className="text-white font-sans font-bold text-[18px] leading-[27px] mb-0.5 truncate group-hover:underline">
          {currentProduct.productName}
        </div>
        
        <div className="text-white flex items-start">
          <span className="text-[20px] font-bold mt-1.5 mr-0.5">$</span>
          <span className="text-[36px] font-bold leading-none">{currentProduct.price}</span>
        </div>
      </Link>
      
    </div>
  );
}