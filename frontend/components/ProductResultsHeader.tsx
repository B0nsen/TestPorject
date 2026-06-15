import { resolveCategoryTitle, useCategories } from "@/lib/hooks/useCategories";
import FilterChip from "./FilterChip";

import { getActiveFilterChips } from "@/lib/utils/filters";
import { SelectedFilters } from "@/lib/utils/filters";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type FilterChip = {
  key: keyof SelectedFilters;
  value: any;
  label: string;
};
export default function ProductResultsHeader({
  className = "",
  selectedFilters,
  currentPage,
  pageSize,
  totalCount,
  removeFilter,
  clearFilters,
}: {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  className?: string;
  selectedFilters: SelectedFilters;
  removeFilter: (key: string, value?: any) => void;
  clearFilters: () => void;
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const department = searchParams.get("department");

  const { start, end } = getPaginationRange(currentPage, pageSize, totalCount);
  const chips = getActiveFilterChips(selectedFilters);

  return (
    <div
      className={`flex layout-catalog-lg:flex-row flex-col w-full
      justify-between layout-catalog-lg:items-center
      gap-[8px] layout-catalog-lg:gap-[20px] ${className}`}
    >
      <h1 className="font-semibold text-[24px] leading-[28px] whitespace-nowrap">
        {department || "All products"}
      </h1>
      {chips.length > 0 && (
        <div
          className="layout-catalog-lg:hidden w-full gap-y-[8px] gap-x-[4px]
            grid  
            layout-filters-lg:grid-cols-5 
            layout-filters-md:grid-cols-4 
            layout-filters-sm:grid-cols-3
            layout-filters-xs:grid-cols-2
            grid-cols-1"
        >
          {chips.map((chip, idx) => (
            <FilterChip
              key={`${chip.key}-${idx}`}
              label={chip.label}
              onClick={() => removeFilter(chip.key, chip.value)}
            />
          ))}
        </div>
      )}

      <button
        onClick={clearFilters}
        className="layout-catalog-lg:hidden text-[14px] leading-[20px] underline w-fit text-accent-muted"
      >
        Clear all
      </button>

      <span className="text-[clamp(16px,1.5vw,20px)] leading-[20px] text-accent-muted">
        {start}-{end} of {totalCount} results
        {search ? ` for "${search}"` : ""}
      </span>
    </div>
  );
}
function getPaginationRange(
  currentPage: number,
  pageSize: number,
  totalCount: number,
) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return { start, end };
}
