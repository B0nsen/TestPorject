"use client";

import Image from 'next/image';
import Link from 'next/link';

interface GridItem {
  id: number;
  title: string;
  imageSrc: string;
  href: string; // ИСПРАВЛЕНО: принимаем готовый href
}

interface RecommendR1CardProps {
  mainTitle: string;
  items: GridItem[];
  className?: string;
}

export default function RecommendR1CardBlock({ mainTitle, items = [], className = '' }: RecommendR1CardProps) {
  return (
    <div className={`
      flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] shadow-xl w-full 
      p-[16px] gap-[12px]
      md:pt-[14px] md:px-[18px] md:pb-[18px] md:gap-[10px]
      lg:p-[20px_28px] lg:gap-[12px]
      ${className}`}
    >
      <h2 className="text-[#E6ECF5] font-sans font-bold text-[18px] leading-[27px] md:text-[20px] lg:text-[20px]">
        {mainTitle}
      </h2>

      <div className="grid gap-y-[12px] gap-x-[12px] grid-cols-2 md:gap-x-[6px] md:gap-y-[6px] lg:gap-x-[28px] lg:gap-y-[10px]">
        {items.slice(0, 4).map((item, index) => (
          <Link 
            key={index} 
            href={item.href} // ИСПРАВЛЕНО: перенаправляем в каталог Артёма
            className="flex flex-col gap-[5px] w-full group cursor-pointer"
          >
            <div className="relative w-full rounded-[10px] overflow-hidden bg-white/5 aspect-[146/120] md:h-[84px] md:aspect-auto lg:aspect-[146/120] lg:h-auto transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(max-w-768px) 50vw, (max-w-1024px) 25vw, 150px"
                className="object-cover"
              />
            </div>
            <span className="font-sans font-normal text-[#E6ECF5] truncate text-[12px] leading-[18px] md:text-[10px] md:leading-[14px] lg:text-[16px] lg:leading-[18px] group-hover:underline">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}