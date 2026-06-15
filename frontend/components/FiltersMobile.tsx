"use client";

import { useState } from "react";
import Image from "next/image";
import filterIcon from "@/assets/icons/filters.svg";

import FilterCategoryItem from "./FilterCategoryItem";
import DropdownArrow from "./DropdownArrow";

export default function FiltersMobile({
  filters,
  onChange,
  selectedFilters,
}: {
  filters: any[];
  onChange: (key: string, value: any, type: string) => void;
  selectedFilters: any;
}) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="gap-[18px] relative z-49 layout-product-px layout-catalog-lg:hidden flex">
      <div className="relative inline-block bg-gray-600 rounded-[20px] px-[12px] w-[220px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-20 flex justify-between items-center w-full h-[34px] gap-5"
        >
          <div className="flex items-center gap-[6px]">
            <Image src={filterIcon} alt="filters" width={19} height={16.5} />
            <span className="font-medium text-[14px] leading-[16px] text-main">
              Filters
            </span>
          </div>

          <DropdownArrow isOpen={open} className="text-main" />
        </button>

        <div
          className={`
            absolute left-0 top-full w-full
            bg-blue-200 z-10
            rounded-[13px]
            mt-[10px]
            transition-all duration-300
            grid overflow-hidden
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col p-[12px] gap-[14px]">
              {filters.map((filter, index) => (
                <FilterCategoryItem
                  key={filter.key}
                  filter={filter}
                  isOpen={activeCategory === filter.key}
                  isLast={index === filters.length - 1}
                  selectedFilters={selectedFilters}
                  onToggle={() =>
                    setActiveCategory((prev) =>
                      prev === filter.key ? null : filter.key,
                    )
                  }
                  onChange={onChange}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
