"use client";

interface ProductPriceProps {
    price?: number;
    colorClass?: string;
}

export default function ProductPrice({
    price = 0,
    colorClass = "text-[#10141C]",
}: ProductPriceProps) {
    const [dollars, cents] = price.toFixed(2).split(".");

    return (
        <div className={`flex items-start font-['Inter',_sans-serif] ${colorClass}`}>
            <span className="text-[13px] font-normal mt-0.5 mr-0.5">$</span>
            <span className="text-[32px] leading-[32px] font-bold tracking-tight">
                {dollars}
            </span>
            <span className="text-[13px] font-normal mt-0.5">{cents}</span>
        </div>
    );
}