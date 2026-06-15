"use client";

interface ProductInfoRow {
  label: string;
  value?: string;
  isLink?: boolean;
}

interface ProductInfoTableProps {
  data: {
    shipper?: string;
    returns?: string;
    payment?: string;
  };
}

export default function ProductInfoTable({ data }: ProductInfoTableProps) {
  const rows: ProductInfoRow[] = [
    { label: "Shipper / Seller", value: data?.shipper, isLink: true },
    { label: "Returns", value: data?.returns || "FREE 30-day refund/replacement", isLink: true },
    { label: "Payment", value: data?.payment || "Secure transaction" },
  ];

  return (
    <section className="w-full border-t border-[#10141C]/10 pt-[10px] mt-1">
      <div className="flex flex-col gap-[10px] text-[14px] font-normal text-[#10141C]/80 font-['Inter',_sans-serif]">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-[100px_1fr] gap-1 items-start">
            <span className="text-[#10141C]/60 select-none">{row.label}</span>
            
            {/* ИСПРАВЛЕНО: Ссылочные мета-поля получили фирменный синий ховер с подчеркиванием как на оригинальном Amazon */}
            {row.isLink && row.value !== "-----------" ? (
              <span className="text-[#10141C] font-normal break-words cursor-pointer transition-colors duration-150 hover:text-[#4C7DFF] hover:underline">
                {row.value ?? "-----------"}
              </span>
            ) : (
              <span className="text-[#10141C] font-normal break-words select-none">
                {row.value ?? "-----------"}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}