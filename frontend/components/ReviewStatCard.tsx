import Image from "next/image";

interface StatCardProps {
  iconSrc?: string;
  value: string | number;
  label: string;
  width?: string;
}

export default function ReviewStatCard({
  iconSrc,
  value,
  label,
  width = "w-[258px]",
}: StatCardProps) {
  return (
    <div
      className={`hidden layout-product-sm:flex flex-col items-center ${width} py-[16.5px] gap-[18px] border-l border-gray-300 px-[20px]`}
    >
      {iconSrc && <Image src={iconSrc} alt="icon" width={31} height={31} />}
      <p className="text-[24px] leading-[20px] text-center">{value}</p>
      <p className="text-[16px] leading-[20px] text-center">{label}</p>
    </div>
  );
}
