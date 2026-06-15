"use client";

import CheckCircle from "./CheckCircle";
import EditButton from "./EditButton";

interface CheckoutCardProps {
  data: string[];
  onEdit?: () => void;
  checked?: boolean;
  onSelect?: () => void;
}

export default function CheckoutCard({
  data,
  onEdit,
  checked,
  onSelect,
}: CheckoutCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-non-active rounded-[20px] max-w-[650px] px-[20px] py-[33px] flex items-center gap-[10px] cursor-pointer"
    >
      <CheckCircle size={21} checked={checked} />
      <span className="flex flex-col text-accent-muted">
        {data.map((text, index) => (
          <span
            key={index}
            className={
              index === 0
                ? "text-[20px] leading-[28px] mb-[5px] font-semibold"
                : "text-[16px] font-normal leading-[18px]"
            }
          >
            {text}
          </span>
        ))}
      </span>

       {onEdit && <EditButton className="ml-auto" onClick={onEdit} />}
    </div>
  );
}
