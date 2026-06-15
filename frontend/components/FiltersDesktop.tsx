"use client";
import FilterSection from "./FilterSection";
import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";
import { isSelected } from "@/lib/utils/filters";

export default function FiltersDesktop({
  filters,
  onChange,
  selectedFilters,
}: {
  filters: any[];
  onChange: (key: string, value: any, type: string) => void;
  selectedFilters: any;
}) {
  const handleChange = (key: string, type: string) => (value: any) => {
    onChange(key, value, type);
  };
  
  return (
    <div className="w-full max-w-[200px] flex-col layout-catalog-lg:flex hidden">
      {filters.map((filter) => (
        <FilterSection key={filter.key} title={filter.title}>
          {filter.type === "single_select" && (
            <ul className="flex flex-col gap-[20px] pb-[16px]">
              {filter.options?.map((item: any) => {
                const selected = isSelected(selectedFilters, filter.key, item);
                return (
                  <li
                    key={item}
                    className={`
                      text-[14px] leading-[16px] cursor-pointer transition
                      ${selected ? "underline" : ""}
                    `}
                    onClick={() => handleChange(filter.key, filter.type)(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          )}

          {filter.type === "multiselect" && (
            <ul className="flex flex-col gap-[10px] pb-[16px]">
              {filter.options?.map((item: any) => (
                <li
                  key={item}
                  className="flex items-center gap-[8px] text-[14px] leading-[16px]"
                >
                  <label className="flex items-center gap-[8px] cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={
                        selectedFilters?.[filter.key]?.includes(item) ?? false
                      }
                      onChange={() =>
                        handleChange(filter.key, filter.type)(item)
                      }
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {filter.type === "range" && (
            <div className="flex flex-col gap-[20px] pb-[16px]">
              <PriceRange
                min={filter.min!}
                max={filter.max!}
                value={[
                  selectedFilters?.[filter.key]?.min ?? filter.min!,
                  selectedFilters?.[filter.key]?.max ?? filter.max!,
                ]}
                onChange={handleChange(filter.key, filter.type)}
              />
            </div>
          )}

          {filter.type === "rating" && (
            <div className="flex flex-col gap-[10px] pb-[16px]">
              <StarsRating
                size={13}
                interactive
                rating={selectedFilters[filter.key]}
                onChange={handleChange(filter.key, filter.type)}
              />
            </div>
          )}
        </FilterSection>
      ))}
    </div>
  );
}
