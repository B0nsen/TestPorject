"use client";

import ProductThumbnail from "./ProductThumbnail";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: {
    main: string;
    thumbnails: string[];
  };
}
export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const allImages = [images.main, ...images.thumbnails];
  const [activeImage, setActiveImage] = useState(images.main);

  return (
    <section className="layout-product-xs:max-w-[507px] layout-product-xs:w-[100%] layout-product-md:min-w-[507px] layout-xs:min-w-[386px] w-full">
      <div className="flex flex-col layout-product-xs:flex-row gap-3">
        <div
          className="
            order-2 layout-product-xs:order-1
            flex flex-row layout-product-xs:flex-col gap-2
            max-w-full layout-product-xs:max-h-[442px]
            overflow-x-auto layout-product-xs:overflow-y-auto
            overflow-y-hidden layout-product-xs:overflow-x-hidden
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {allImages.map((src, index) => (
            <ProductThumbnail
              key={index}
              src={src}
              selected={activeImage === src}
              onClick={() => setActiveImage(src)}
            />
          ))}
        </div>

              <div className="order-1 bg-white layout-product-xs:order-2 w-full layout-product-xs:flex-1 h-[442px] flex items-center justify-center rounded-[10px] overflow-hidden relative">
                  <Image
                      src={activeImage}
                      alt="Main image"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-center"
                      priority
                  />
              </div>
      </div>
    </section>
  );
}
