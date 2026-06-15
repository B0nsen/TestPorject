"use client";

import Image from "next/image";
import arrowUpIcon from "@/assets/icons/Back_to_top_btn.svg";

export default function BackToTopBtn() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      type="button"
      className="w-[35px] h-[36px] relative flex items-center justify-center transition-transform active:scale-95 hover:-translate-y-[2px] duration-200 select-none bg-transparent border-none outline-none"
      aria-label="Back to top"
    >
      <Image
        src={arrowUpIcon}
        alt="Back to top"
        width={35}
        height={36}
        className="object-contain block w-full h-full"
        priority
      />
    </button>
  );
}