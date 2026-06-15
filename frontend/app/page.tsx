import promises from "fs/promises";
import path from "path";
import Link from "next/link"; 

import SalesBanner from "@/components/SalesBanner";
import RecommendRow1 from "@/components/RecommendRow1";
import RecommendRow2 from "@/components/RecommendRow2";
import RecommendRow3 from "@/components/RecommendRow3";
import BestSellersBanner from "@/components/BestSellersBanner";
import CatalogSlider from "@/components/CatalogSlider";

async function getHomepageData() {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/homepage`;

  try {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (res.ok) {
      console.log("Данные главной страницы успешно загружены с API!");
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);

  } catch (error) {
    console.warn(
      `Бэкенд (${API_URL}) недоступен. Переключаюсь на резервный public/data/homepage.json...`
    );

    try {
      const filePath = path.join(process.cwd(), "public", "data", "homepage.json");
      const jsonData = await promises.readFile(filePath, "utf-8");
      
      console.log("Данные успешно восстановлены из локального кэша JSON");
      return JSON.parse(jsonData);
      
    } catch (fileError) {
      console.error("Критическая ошибка: Не удалось прочитать локальный JSON-файл:", fileError);
      return null;
    }
  }
}

export default async function Home() {
  const data = await getHomepageData();

  if (!data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-[100px] text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error data loading</h1>
        <p className="text-gray-600 max-w-[500px]">
          Error backend, Error json.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-0 sm:px-4 flex flex-col items-center gap-[40px] pt-[60px] relative bg-top bg-no-repeat home-responsive-bg">
      <span className="is-homepage_desktop_bg_active hidden" />
      <div className="hidden layout-sm:block h-[140px] w-full shrink-0" />

      <RecommendRow1 data={data.recommendedRow1 || []} />

      <BestSellersBanner
        title="Best Sellers in Grocery & Gourmet Food"
        imageSrc="/images/homepage/best_sellers.jpg"
        href="/catalog?department=grocery"
      />

      <RecommendRow2 data={data.recommendedRow2 || []} />
      
      <CatalogSlider data={data.catalogSlider || []} />

      <div className="w-full layout-px">
        <SalesBanner
          title="Cosmic Sale"
          imageSrc="/images/homepage/cosmic_sales1.png" 
        >
          <div className="flex flex-col gap-[6px] sm:gap-[10px] items-start select-none">
            <h2 className="banner-title">
              Cosmic <span className="text-accent-muted">Sale</span>
            </h2>

            <div className="banner-badge">
              Up to <span className="text-[#AFCBFF] px-1">50%</span> off
            </div>
          </div>

                  <Link href="/catalog?sale=true" className="banner-btn">
                      Shop Now
                  </Link>
        </SalesBanner>
      </div>

      <RecommendRow3 data={data.recommendedRow3 || []} />

      <div className="pb-[80px]" />
    </div>
  );
}