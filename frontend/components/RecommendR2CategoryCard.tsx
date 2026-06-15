"use client";

import Link from "next/link";
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendR2CategoryCard({ 
  title, 
  imageSrc, 
  href = '#', 
}: CategoryCardProps) {
  return (
    <div className="flex flex-col w-full bg-[#1F2636] border border-[#2F3A52] rounded-[15px] p-[20px] gap-[12px] transition-all hover:border-[#3f4d6d] h-full">
      <div className="flex items-center justify-between w-full h-[27px]">
        <h2 className="text-[#E6ECF5] text-[20px] font-bold leading-[27px] truncate pr-2">
          {title}
        </h2>
        <Link 
          href={href} 
          className="flex items-center text-[#E6ECF5]/60 text-[14px] font-bold hover:text-[#E6ECF5] transition-colors flex-shrink-0"
        >
          More <span className="ml-1 text-[10px]">→</span>
        </Link>
      </div>

      {/* ИСПРАВЛЕНО: Обернули картинку в Link для удобного клика на десктопе + добавили эффект масштабирования */}
      <Link href={href} className="relative w-full aspect-[345/300] overflow-hidden rounded-[10px] flex-grow block cursor-pointer group">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1528px) 25vw, 380px"
        />
      </Link>
    </div>
  );
}