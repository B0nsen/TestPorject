"use client";

import Link from "next/link";
import Image from 'next/image';

interface CategoryData {
  id: number;
  type: "category";
  title: string;
  imageSrc: string | null; // Разрешаем null тип
  url: string;
}

interface CategoryCardProps {
  category: CategoryData;
}

export default function RecommendR3CategoryCard({ category }: CategoryCardProps) {
  const { title, imageSrc, url } = category;

  return (
    <div className="flex flex-col bg-[#E6ECF5] rounded-[15px] border border-[#2F3A52] p-[26px] w-full h-[454px] md:h-full overflow-hidden shadow-lg">

      <div className="flex justify-between items-center w-full mb-[16px] shrink-0">
        <h2 className="font-sans font-bold text-[19px] text-[#10141C] truncate mr-2">
          {title}
        </h2>
        <Link 
          href={url} 
          className="text-[14px] text-[#10141C]/60 font-bold hover:text-[#10141C] transition-colors shrink-0 whitespace-nowrap"
        >
          More &rarr;
        </Link>
      </div>

      <Link 
        href={url} 
        className="relative flex-1 min-h-0 w-full overflow-hidden rounded-[10px] block cursor-pointer group bg-[#1A2030]/5"
      >
        {/* ИСПРАВЛЕНО: Рендерим картинку только если есть валидный src */}
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 300px"
            className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]" 
            priority
          />
        ) : (
          /* Красивая заглушка, пока бэк не пришлет картинку */
          <div className="w-full h-full flex items-center justify-center text-[#10141C]/30 text-[14px] font-sans">
            No image available
          </div>
        )}
      </Link>
    </div>
  );
}