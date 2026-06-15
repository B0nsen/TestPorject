export type PriceFilter = {
  min: number;
  max: number;
};

export type SelectedFilters = {
  brand?: string[];
  condition?: string[];
  department?: string;
  price?: PriceFilter;
  rating?: number;
};

export type FilterChip = {
  key: keyof SelectedFilters;
  value: string | number | PriceFilter;
  label: string;
};

export function getActiveFilterChips(filters: SelectedFilters): FilterChip[] {
  const chips: FilterChip[] = [];

  Object.entries(filters).forEach(([key, raw]) => {
    if (!raw) return;
    const value = (raw as any).value ?? raw;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        chips.push({
          key: key as keyof SelectedFilters,
          value: v,
          label: String(v),
        });
      });
      return;
    }

    if (key === "price" && typeof value === "object") {
      chips.push({
        key: "price",
        value,
        label: `${value.min} - ${value.max}`,
      });
      return;
    }

    if (key === "rating") {
      chips.push({
        key: "rating",
        value,
        label: `${value}★`,
      });
      return;
    }

    chips.push({
      key: key as keyof SelectedFilters,
      value,
      label: String(value),
    });
  });

  return chips;
}
export function isSelected(selectedFilters: any, key: string, value: any) {
  const raw = selectedFilters?.[key];
  const selectedValue = typeof raw === "object" ? raw?.value : raw;
  return selectedValue === value;
}