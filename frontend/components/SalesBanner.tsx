"use client";

import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string;
  imageSrc: string;
  children?: React.ReactNode;
}

export default function SalesBanner({ title, imageSrc, children }: BannerProps) {
  return (
    /* ИСПРАВЛЕНО: Внутренние отступы полностью убраны, чтобы баннер занимал 
      всю ширину контейнера (w-full). Границы адаптивности (px-4 md:px-0) 
      теперь вынесены на уровень выше в макет страницы для идеального выравнивания.
    */
    <div className="w-full">
      <div className="
        relative w-full overflow-hidden rounded-[15px] border border-[#2F3A52] shrink-0
        h-[160px] sm:h-[220px] md:h-[281px] transition-all duration-300
      ">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1528px) 100vw, 1528px"
          priority
        />

        {children && (
          <div className="
            absolute inset-0 z-10 w-full h-full 
            flex flex-row items-end justify-between
            p-[15px] sm:p-[30px] md:pb-[38px] md:pt-[38px] md:px-[40px]
          ">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}