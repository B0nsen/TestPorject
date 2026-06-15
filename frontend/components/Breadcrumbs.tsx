"use client";
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import HomeIcon from "@/assets/icons/other_houses.svg?react";
import React, { useMemo } from "react";

function formatSegment(segment: string) {
  return segment.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
export default function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/").filter(Boolean);
  const department = searchParams.get("department");

  const breadcrumbItems = useMemo(() => {
    return segments;
  }, [segments]);

  const getLabel = (segment: string, isLast: boolean) => {
    const isCatalog =
      segment.toLowerCase() === "catalog" || pathname.includes("/catalog");

    if (isCatalog && isLast && department) {
      return formatSegment(department);
    }

    return formatSegment(segment);
  };

  return (
    <>
      <div className="w-full layout-mobile:flex hidden flex-col items-center justify-center layout-px gap-[8px] mt-[clamp(66px,8vw,100px)]">
        <div className="w-full max-w-[1500px] flex-col flex gap-[8px]">
          <div className="flex gap-[5px] items-stretch h-[14px]">
            <Link href="/" className="flex items-center">
              <HomeIcon className="w-[16px] h-[14px]" />
            </Link>

            <div className="flex items-center gap-[5px]">
              {breadcrumbItems.map((segment, index) => {
                const href =
                  "/" + breadcrumbItems.slice(0, index + 1).join("/");

                const isLast = index === breadcrumbItems.length - 1;

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbDivider />

                    {isLast ? (
                      <BreadcrumbLabel text={getLabel(segment, isLast)} />
                    ) : (
                      <Link href={href}>
                        <BreadcrumbLabel
                          className="hover:underline"
                          text={getLabel(segment, false)}
                        />
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="border-t border-main/20 w-full"></div>
        </div>
      </div>
    </>
  );
}

type DividerProps = {
  className?: string;
};

export function BreadcrumbDivider({ className }: DividerProps) {
  return (
    <span className="text-[14px] pb-[4px]" aria-hidden="true">
      ›
    </span>
  );
}
type BreadcrumbLabelProps = {
  text: string;
  className?: string;
};

export function BreadcrumbLabel({ text, className }: BreadcrumbLabelProps) {
  return (
    <span className={`text-[11px] flex items-center ${className ?? ""}`}>
      {text}
    </span>
  );
}
