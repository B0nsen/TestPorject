"use client";

import RemoveIcon from "@/assets/icons/remove.svg?react";
import AddIcon from "@/assets/icons/add.svg?react";

function CartQuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  function ControlButton({
    Icon,
    onClick,
    alt,
  }: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick?: () => void;
    alt: string;
  }) {
    return (
      <button
        onClick={onClick}
        aria-label={alt}
        className="size-[22px] sm:size-[32px] rounded-full bg-surface-accent flex items-center justify-center cursor-pointer"
      >
        <Icon className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px]" />
      </button>
    );
  }

  return (
    <div className="flex items-center sm:gap-[14px] gap-[8px]">
      <ControlButton Icon={RemoveIcon} onClick={onDecrease} alt="Decrease" />

      <span className="text-center text-[clamp(12px,2vw,20px)]">
        {quantity}
      </span>

      <ControlButton Icon={AddIcon} onClick={onIncrease} alt="Increase" />
    </div>
  );
}

export default CartQuantityControl;