"use client";

import React from "react";

interface AboutItemProps {
  tabletOnly?: boolean;
  items?: string[];
}
const AboutItem: React.FC<AboutItemProps> = ({
  tabletOnly = false,
  items = [],
}) => {
  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <hr
        className={`border-surface-1 ${tabletOnly ? "" : "mt-[20px]"} mb-[14px]`}
      />

      <h2 className="text-[19.4px] leading-6  font-bold mb-[5px]">
        About this item
      </h2>
      <div className="flex flex-col gap-[4px]">
        {items.map((text, i) => (
          <p key={i} className="text-[13px] leading-5">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutItem;
