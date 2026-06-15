"use client";

import { useState, useRef, useEffect } from "react";
import arrowDown from "@/assets/icons/arrow-down-quantity.svg";
import Image from "next/image";

interface QuantitySelectorProps {
  maxCount?: number;
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  maxCount = 5,
  value,
  onChange,
}: QuantitySelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const numbers = Array.from({ length: maxCount }, (_, i) => i + 1);

  return (
    <div className="w-full relative text-text-dark" ref={containerRef}>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="w-full flex items-center justify-between bg-white py-[5px] px-[9px] border border-b-0 rounded-lg ">
          <span className="text-[13px] relative z-20">Quantity: {value}</span>

          <Image src={arrowDown} alt="arrow down" width={10} height={8} />
        </div>
        <div
          className={`
        absolute left-0 w-full translate-y-[-8px] rounded-b-lg
        grid transition-[grid-template-rows] duration-300 ease-in-out
        ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
      `}
        >
          <div className="overflow-hidden rounded-b-lg bg-white border border-t-0 py-[4px]">
            <div className="pt-[10px]">
              {numbers.map((num) => (
                <div
                  key={num}
                  className="px-2 text-[13px] cursor-pointer hover:bg-gray-100 h-[26px]"
                  onClick={() => {
                    onChange(num);
                    setOpen(false);
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
