import NavButton from "./NavButton";
import PageButton from "./PageButton";
import { buildPagination } from "@/lib/utils/buildPagination";
import PaginationBreak from "./PaginationBreak";
import { useEffect, useState } from "react";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isDesktop;
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isDesktop = useIsDesktop();

  const siblingCount = isDesktop ? 1 : 0;
  const pages = buildPagination(currentPage, totalPages, siblingCount);

  return (
    <div className="flex items-center justify-center w-full h-[48px]">
      <div className="flex bg-white h-[48px] rounded-[24px] overflow-hidden">
        <NavButton
          direction="prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </NavButton>

        {pages.map((p, i) => {
          if (p.type === "break") {
            return <PaginationBreak key={`break-${i}`} />;
          }

          return (
            <PageButton
              key={p.value}
              active={p.value === currentPage}
              onClick={() => onPageChange(p.value)}
            >
              {p.value}
            </PageButton>
          );
        })}

        <NavButton
          direction="next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </NavButton>
      </div>
    </div>
  );
}
