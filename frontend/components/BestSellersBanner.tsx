"use client";

import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function BestSellersBanner({ title, imageSrc, href = "/catalog?department=grocery" }: Banner) {
    return (
      <div className="w-full">
        {/* Весь баннер працює як Link (кнопка-посилання).
            Додано утилітарний клас group для відстеження ховеру на батьківському елементі.
            hover:border-[#3f4d6d] забезпечує плавне підсвічування рамки всього блоку.
        */}
        <Link 
          href={href}
          className="
            flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] shadow-xl
            w-full h-auto 
            p-[15px_20px] 
            transition-all duration-300 hover:border-[#3f4d6d]
            group cursor-pointer block select-none
          "
        >
          <div className="flex flex-col w-full gap-[12px] max-md:gap-[10px]">
                
            {/* Контейнер заголовка */}
            <div className="flex items-center w-full min-h-[31px]">
              {/* При наведенні миші на будь-яку область банера (group-hover), 
                  назва плавно підкреслюється (underline) та стає чисто білою (text-white).
              */}
              <h2 className="font-sans font-bold text-[20px] text-[#E6EAF2] leading-tight max-md:leading-[31px] transition-all duration-200 group-hover:text-white group-hover:underline">
                {title}
              </h2>
            </div>
    
            {/* Контейнер зображення */}
            <div className="
              relative w-full rounded-[10px] overflow-hidden bg-white/5
              aspect-[345/220] 
              md:h-[220px] md:aspect-auto
            ">
               <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 1528px) 100vw, 1528px"
                priority
              /> 
            </div>
          </div>
        </Link>
      </div>
    );
}