"use client";

import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  price: string;
  imageSrc: string;
  href: string; 
}

export default function CatalogSliderCard({ 
  title,  
  price, 
  imageSrc, 
  href 
}: CardProps) {
  return (
    <Link href={href} className="flex flex-col w-full shrink-0 gap-[10px] group/card cursor-pointer">
      
      <div className="
        relative w-full aspect-square 
        rounded-[15px] border border-[#2F3A52] 
        overflow-hidden bg-[#1F2636]
        transition-colors duration-200 group-hover/card:border-[#3f4d6d]
      ">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
          sizes="(max-w-768px) 50vw, 300px"
          priority
        />
      </div>

      <div className="flex flex-col gap-[4px] md:gap-[8px]">
        <p className="font-sans font-bold text-[14px] md:text-[20px] leading-tight md:leading-[27px] text-[#E6ECF5] line-clamp-2 h-[36px] md:h-[54px] group-hover/card:underline">
          {title}
        </p>   
        
        <div className="flex flex-row items-baseline font-bold text-[24px] md:text-[36px] text-[#E6ECF5]">
          <span className="mr-[1px] text-[#E6ECF5] opacity-70">$</span>
          <span className="text-[#E6ECF5] opacity-70">{price}</span>
        </div>
      </div>
    </Link>
  );
}