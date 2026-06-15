import { useMemo } from "react";
import {
  useRouter,
  usePathname,
  ReadonlyURLSearchParams,
} from "next/navigation";

const parseKey = (key: string) => {
  return key.replace(/(_min|_max|_gte)$/, "");
};

export function useFilters(
  filters: any[],
  searchParams: ReadonlyURLSearchParams,
) {
  const router = useRouter();
  const pathname = usePathname();
  const cloneParams = () => new URLSearchParams(searchParams.toString());
  
  const setQueryParams = (
    params: URLSearchParams,
    options?: { scroll?: boolean },
  ) => {
    router.push(`${pathname}?${params.toString()}`, {
      scroll: options?.scroll ?? false,
    });
  };

  const setPage = (page: number) => {
    const params = cloneParams();
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    setQueryParams(params, { scroll: true });
  };

  const allowedFilterKeys = useMemo(() => {
    return new Set(filters.map((f) => f.key));
  }, [filters]);

  const selectedFilters = useMemo(() => {
    if (filters.length === 0) {
      return {};
    }
    const result: any = {};
    const tempRanges: any = {};

    searchParams.forEach((value, key) => {
      if (!allowedFilterKeys.has(parseKey(key))) {
        return;
      }
      if (key.endsWith("_min") || key.endsWith("_max")) {
        const baseKey = parseKey(key);

        if (!tempRanges[baseKey]) {
          tempRanges[baseKey] = {};
        }

        if (key.endsWith("_min")) {
          tempRanges[baseKey].min = Number(value);
        }

        if (key.endsWith("_max")) {
          tempRanges[baseKey].max = Number(value);
        }

        return;
      }
      if (key.endsWith("_gte")) {
        const baseKey = parseKey(key);

        result[baseKey] = {
          type: "rating",
          value: Number(value),
        };

        return;
      }

      if (value.includes(",")) {
        result[key] = {
          type: "multiselect",
          value: value.split(","),
        };
      } else {
        result[key] = {
          type: "single_select",
          value,
        };
      }
    });
    Object.entries(tempRanges).forEach(([key, range]: any) => {
      result[key] = {
        type: "range",
        value: {
          min: range.min,
          max: range.max,
        },
      };
    });

    return result;
  }, [searchParams, filters]);
  const getNormalizedFilters = () => {
    const result: any = {};

    Object.entries(selectedFilters).forEach(([key, filter]: any) => {
      result[key] = filter?.value ?? filter;
    });

    return result;
  };

  const updateFilter = (key: string, value: any, type: string) => {
    const params = cloneParams();

    if (type === "single_select") {
      params.set(key, value);
    }

    if (type === "multiselect") {
      const current = params.get(key)?.split(",") || [];

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (updated.length === 0) {
        params.delete(key);
      } else {
        params.set(key, updated.join(","));
      }
    }

    if (type === "range") {
      params.set(`${key}_min`, value[0]);
      params.set(`${key}_max`, value[1]);
    }

    if (type === "rating") {
      params.set(`${key}_gte`, value);
    }

    setQueryParams(params, { scroll: false });
  };
  const removeFilter = (key: string, value?: any) => {
    const params = cloneParams();

    if (selectedFilters[key]?.type === "rating") {
      params.delete(`${key}_gte`);
      setQueryParams(params, { scroll: false });
      return;
    }
    if (selectedFilters[key]?.type === "range") {
      params.delete(`${key}_min`);
      params.delete(`${key}_max`);
      setQueryParams(params, { scroll: false });
      return;
    }
    const existing = params.get(key);

    if (!existing) return;

    const values = existing.split(",").filter((v) => v !== value);

    if (values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join(","));
    }

    setQueryParams(params, { scroll: false });
  };
  const clearFilters = () => {
    const params = cloneParams();

    Array.from(params.keys()).forEach((key) => {
      const normalizedKey = parseKey(key);

      if (allowedFilterKeys.has(normalizedKey)) {
        params.delete(key);
      }
    });

    setQueryParams(params, { scroll: false });
  };

  return {
    selectedFilters,
    removeFilter,
    setPage,
    allowedFilterKeys,
    getNormalizedFilters,
    updateFilter,
    clearFilters,
  };
}
