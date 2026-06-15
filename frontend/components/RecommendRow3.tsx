"use client";

import RecommendR3CategoryCard from "./RecommendR3CategoryCard";
import RecommendR3SliderCard from "./RecommendR3SliderCard";

interface Row3Product {
  id: number;
  type: "product";
  title: string | null;
  name: string | null;
  price: number | null;
  images: string[] | null;
  imageSrc: string | null;
}

interface Row3Category {
  id: number;
  type: "category";
  title: string | null;
  name: string | null;
  price: number | null;
  images: string[] | null;
  imageSrc: string | null;
}

type Row3Item = Row3Product | Row3Category;

interface RecommendRow3Props {
  data: Row3Item[];
}

export default function RecommendRow3({ data }: RecommendRow3Props) {
  if (!data || data.length === 0) return null;

  const products = data.filter((item) => item.type === "product") as Row3Product[];
  const categories = data.filter((item) => item.type === "category") as Row3Category[];
  
  const alternatedData: Row3Item[] = [];
  const maxLength = Math.max(products.length, categories.length);

  for (let i = 0; i < maxLength; i++) {
    if (products[i]) alternatedData.push(products[i]);
    if (categories[i]) alternatedData.push(categories[i]);
  }

  return (
    <div className="grid grid-cols-1 gap-[12px] px-4 w-full md:grid-cols-5 lg:grid-cols-4 lg:px-0 lg:gap-[12px] max-w-[1528px] mx-auto pb-8 items-stretch">
      {alternatedData.map((item, idx) => {
        const pairIndex = Math.floor(idx / 2);
        const isEvenRow = pairIndex % 2 === 1;
        const desktopOrder = `lg:order-${idx + 1}`;

        if (item.type === "product") {
          const productImages = item.images || [];
          const formattedItems = productImages.map((img) => ({
            productName: item.name || "",
            price: item.price !== null ? String(item.price) : "0",
            imageSrc: img || null, 
            href: `/product/${item.id}`
          }));

          const tabletOrder = isEvenRow ? "md:order-2" : "md:order-none";

          return (
            <div key={idx} className={`col-span-1 md:col-span-2 lg:col-span-1 ${tabletOrder} ${desktopOrder}`}>
              <RecommendR3SliderCard requestTitle={item.title || ""} items={formattedItems} />
            </div>
          );
        }

        if (item.type === "category") {
          const tabletOrder = isEvenRow ? "md:order-1" : "md:order-none";

          const formattedCategory = {
            id: item.id,
            type: item.type,
            title: item.title || "",
            imageSrc: item.imageSrc || null, 
            // ИСПРАВЛЕНО: передаем текстовое имя категории с Большой буквы вместо id под бэк Артема
            url: `/catalog?department=${encodeURIComponent(item.name || item.title || "")}`
          };

          return (
            <div key={idx} className={`col-span-1 md:col-span-3 lg:col-span-1 ${tabletOrder} ${desktopOrder}`}>
              <RecommendR3CategoryCard category={formattedCategory} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}