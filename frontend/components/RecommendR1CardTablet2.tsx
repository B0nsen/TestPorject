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

export default function RecommendR1CardTablet2({ mainTitle, items = [], className = '' }: RecommendR1CardProps) {
  return (
    <div className={`flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] 
      w-full pt-[14px] px-[18px] pb-[18px] gap-[10px] shadow-lg ${className}`}>
      
      <h2 className="text-[#E6EAF2] font-sans font-bold text-[20px] leading-[27px]">
        {mainTitle}
      </h2>

      <div className="flex flex-col gap-[6px]">
        {items.slice(0, 4).map((item, index) => (
          <Link 
            key={index} 
            href={item.href} // ИСПРАВЛЕНО: перенаправляем в каталог Артёма
            className="flex flex-col gap-[4px] w-full group cursor-pointer"
          >
            <div className="relative w-full h-[43px] rounded-[10px] overflow-hidden bg-white/5 transition-transform duration-200 group-hover:scale-[1.01]">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                sizes="(max-w-1024px) 33vw, 250px"
                className="object-cover"
              />
            </div>
            <span className="font-sans text-[10px] leading-[14px] text-[#E6EAF2] font-normal opacity-90 group-hover:underline truncate">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}