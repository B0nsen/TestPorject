"use client";
import { useEffect, useState } from "react";
export const dynamic = 'force-dynamic';
import ProductCard from "@/components/ProductCard";
import FiltersDesktop from "@/components/FiltersDesktop";
import FiltersMobile from "@/components/FiltersMobile";
import LimitedCard from "@/components/LimitedCard";
import ProductResultsHeader from "@/components/ProductResultsHeader";
import Pagination from "@/components/Pagination";

import { CatalogGrid } from "@/components/CatalogGrid";

import { useFilters } from "@/lib/hooks/useFilters";
import { useIsAbove } from "@/lib/hooks/useIsAbove";
import { Limited } from "@/lib/types/limited";

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [limitedProducts, setLimitedProducts] = useState<Limited[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    // Безопасная инициализация параметров URL без использования useSearchParams
    const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams());
    const [page, setPageInternal] = useState(1);

    // Синхронизируем параметры URL только при рендере в браузере
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setSearchParams(params);
            setPageInternal(Number(params.get("page")) || 1);
        }
    }, []);

    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);

    // Вызываем кастомный хук useFilters ОДИН раз и сразу забираем всё необходимое
    const {
        selectedFilters,
        getNormalizedFilters,
        updateFilter,
        removeFilter,
        clearFilters,
        setPage: handlePageChange, // Переименовали, чтобы избежать конфликта имен
    } = useFilters(filters, searchParams);

    const showThird = useIsAbove(847);

  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetch(`http://localhost:5012/api/product/filters`);
      const data = await res.json();
      setFilters(data);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("fetch for page:", page);
      console.log("raw filters:", selectedFilters);

      const params = new URLSearchParams(searchParams.toString());
      const queryString = params.toString();

      console.log("final query string:", queryString);
      const pageSize = 9;
      const url = `http://localhost:5012/api/product/catalog/${pageSize}?${queryString}`;

      console.log("final request URL:", url);

      const res = await fetch(url);
      const data = await res.json();

      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
      setPageSize(data.pageSize);
      setCurrentPage(data.currentPage);
      setProducts(data.products);
      setLimitedProducts(data.limited);

      console.log(data.limited);
    };

    fetchProducts();
  }, [page, searchParams]);

  if (showThird === null) {
    return null;
  }

  return (
    <main className="w-full flex flex-col pt-[50px] gap-[21px]">
      {products.length > 0 && (
        <ProductResultsHeader
          selectedFilters={selectedFilters}
          removeFilter={removeFilter}
          clearFilters={clearFilters}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          className="layout-catalog-lg:hidden layout-product-px"
        />
      )}
      <FiltersMobile
        filters={filters}
        onChange={updateFilter}
        selectedFilters={getNormalizedFilters()}
      />
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] layout-product-px">
        <FiltersDesktop
          filters={filters}
          onChange={updateFilter}
          selectedFilters={getNormalizedFilters()}
        />
        <div className="w-full flex flex-col gap-[24px]">
          <ProductResultsHeader
            selectedFilters={selectedFilters}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            className="layout-catalog-lg:flex hidden"
          />
          <CatalogGrid
            className="
              layout-catalog-xs:grid-cols-[repeat(auto-fit,minmax(188px,1fr))]
              xl:grid-cols-3
            "
          >
            {limitedProducts
              .slice(0, showThird ? 3 : 2)
              .map((limited, index) => (
                <LimitedCard key={`${limited.id}-${index}`} product={limited} />
              ))}
          </CatalogGrid>
          <CatalogGrid
            className="
              layout-catalog-xs:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
              layout-catalog-lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
              xl:grid-cols-5
            "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CatalogGrid>
          <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
