"use client";

import { useEffect, useRef } from "react";
import CategoryItem from "./CategoryItem";
import ImageCard from "./ImageCard";
import MenuSection from "./MenuSection";
import { useRouter } from "next/navigation";
import { Category, RecommendedItem } from "@/lib/types/menu";

export default function AllMenuModal({
  categories,
  recommended,
  selectedCategory,
  setSelectedCategory,
  onClose,
  onHeightChange,
}: {
  categories: Category[];
  recommended: RecommendedItem[];
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  onClose: () => void;
  onHeightChange: (h: number) => void;
}) {
  const router = useRouter();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isReady =
    categories.length > 0 &&
    selectedCategory !== null &&
    recommended.length > 0;

  useEffect(() => {
    if (!isReady) return;

    const el = modalRef.current;
    if (!el) return;

    let frame1: number;
    let frame2: number;

    const measure = () => {
      frame1 = requestAnimationFrame(() => {
        frame2 = requestAnimationFrame(() => {
          const height = el.getBoundingClientRect().height;
          onHeightChange(height);
        });
      });
    };

    measure();

    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);

      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);

      onHeightChange(0);

      document.body.style.minHeight = "";
    };
  }, [isReady, selectedCategory, categories, recommended, onHeightChange]);

  const handleNavigate = (key: string) => {
    console.log("Navigating to:", key);
    router.push(`/catalog?department=${key}`);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedLeft = leftRef.current?.contains(target);
      const clickedRight = rightRef.current?.contains(target);

      if (!clickedLeft && !clickedRight) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-50" />
      <div
        ref={modalRef}
        className="absolute top-full left-0 w-full flex z-[60]
        sm:px-[10px] sm:py-[25px] sm:gap-[16px]
        px-[4px] py-[5px] gap-[4px]
      "
      >
        <div
          ref={leftRef}
          className="bg-main w-[clamp(130px,50vw,400px)] h-fit sm:h-[700px] sm:max-h-[700px] overflow-hidden
          category-rounded sm:pr-[16px]"
        >
          <div
            className="h-full overflow-y-auto sm:py-[30px] custom-scrollbar"
            style={
              { "--scrollbar-track-margin": "30px" } as React.CSSProperties
            }
          >
            <ul className="flex flex-col sm:gap-[26px]">
              {categories.map((cat) => (
                <CategoryItem
                  key={cat.title}
                  label={cat.title}
                  icon={cat.icon}
                  isActive={selectedCategory?.title === cat.title}
                  onClick={() => setSelectedCategory(cat)}
                />
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={rightRef}
          className="w-full
            sm:max-h-[700px]
            flex
            flex-col
            overflow-hidden
            category-rounded
            bg-[linear-gradient(to_bottom,transparent_0px,transparent_26px,var(--color-main)_26px)]"
        >
          <div
            className="bg-non-active shrink-0
            category-px pb-[10px] sm:pt-[30px] pt-[8px]"
          >
            <span className=" text-category-lg mb-[14px]">Recommended</span>

            <div
              className="grid grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] w-full 
              gap-[12px] sm:py-[10px]"
            >
              {recommended.map((item) => (
                <ImageCard
                  key={item.key}
                  label={item.title}
                  image={item.image}
                  onClick={() => handleNavigate(item.title)}
                />
              ))}
            </div>
          </div>
          <div
            className=" text-black flex-1 overflow-y-auto custom-scrollbar mr-[10px]"
            style={
              { "--scrollbar-track-margin": "14px" } as React.CSSProperties
            }
          >
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-5 gap-6 category-px pt-[10px] sm:pb-[30px]">
              {selectedCategory?.subsections.map((section) => (
                <MenuSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  onItemClick={(item) => handleNavigate(item.label)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
