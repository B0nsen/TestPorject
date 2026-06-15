"use client";

interface ProductPriceProps {
  price?: number;
}

export default function ProductPrice({ price = 0 }: ProductPriceProps) {
  const [dollars, cents] = price.toFixed(2).split(".");

  return (
    <div className="flex items-start">
      <span className="text-[11.7px]">$</span>
      <span className="text-[26.1px]">{dollars}.</span>
      <span className="text-[11.7px]">{cents}</span>
    </div>
  );
}