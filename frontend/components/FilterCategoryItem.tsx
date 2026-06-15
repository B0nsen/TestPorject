"use client";

import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";
import DropdownArrow from "./DropdownArrow";
import { isSelected } from "@/lib/utils/filters";

type Props = {
  filter: {
    key: string;
    title: string;
    type: "single_select" | "multiselect" | "range" | "rating";
    options?: string[];
    min?: number;
    max?: number;
  };

  isOpen: boolean;
  isLast?: boolean;
  selectedFilters: any;

  onToggle: () => void;
  onChange: (key: string, value: any, type: string) => void;
};

export default function FilterCategoryItem({
  filter,
  isOpen,
  isLast,
  onToggle,
  onChange,
  selectedFilters,
}: Props) {
  const { title, type, options, min, max } = filter;
  const handleChange = (value: any) => {
    onChange(filter.key, value, filter.type);
  };

  return (
    <li
      className={`
        text-[14px] text-black 
        ${!isLast ? "border-b pb-[16px]" : ""}
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <span className="font-medium text-[18px] leading-tight text-left">
          {title}
        </span>
        <DropdownArrow isOpen={isOpen} className="text-black" />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] mt-[10px]" : "max-h-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 text-[13px] pb-1 transition-all duration-300 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {type === "range" &&
            min != null &&
            max != null &&
            (() => {
              const currentRange = selectedFilters?.[filter.key];
              return (
                <PriceRange
                  min={min}
                  max={max}
                  dark
                  value={[currentRange?.min ?? min, currentRange?.max ?? max]}
                  onChange={handleChange}
                />
              );
            })()}

          {type === "rating" && (
            <StarsRating
              size={13}
              interactive
              emptyColorClass="text-card-dark"
              rating={selectedFilters?.[filter.key]}
              onChange={handleChange}
            />
          )}

          {type === "single_select" && (
            <ul className="flex flex-col gap-2">
              {options?.map((opt) => {
                const selected = isSelected(selectedFilters, filter.key, opt);

                return (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => handleChange(opt)}
                      className={`
                        text-left w-full py-1 transition
                        ${selected ? "underline" : ""}
                      `}
                    >
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {type === "multiselect" && (
            <ul className="flex flex-col gap-2">
              {options?.map((opt) => {
                const isChecked =
                  selectedFilters?.[filter.key]?.includes(opt) ?? false;

                return (
                  <li key={opt}>
                    <label className="flex gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleChange(opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
