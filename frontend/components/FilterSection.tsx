"use client";
import { useState, ReactNode } from "react";

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <div className="flex flex-col gap-[24px] ">
      <div className="flex flex-col gap-[16px]">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <h3 className="font-medium text-[18px] leading-[16px] border-t pt-[14px] w-full text-start">{title}</h3>
          <span
            className={`font-normal w-[18px] text-[12px] leading-[14px] transition-transform duration-300 ${
              isOpen ? "rotate-90" : "-rotate-90"
            }`}
            style={{ fontFamily: "Inter" }}
          >
            ›
          </span>
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden pr-[18px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
