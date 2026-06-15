"use client";

import { useRef } from "react";
import useDraggableScroll from "use-draggable-scroll";
import AddButton from "@/components/AddButton";

type Category = {
  id: number;
  label: string;
};

type WishlistSliderProps = {
  categories: Category[];
  onSelect?: (id: number) => void;
  onAdd?: () => void;
  activeId: number;
};

export default function WishlistSlider({
  categories,
  activeId,
  onSelect,
  onAdd,
}: WishlistSliderProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const { onMouseDown } = useDraggableScroll(ref);

  return (
    <div className="flex items-center justify-between w-full min-w-0 mb-[12px]">
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        className="flex h-[40px] gap-[10px] w-full overflow-x-auto cursor-grab no-scrollbar mr-[16px]"
      >
        {categories.map((item) => {
          const isActive = item.id === activeId;

          return (
            <span
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              className={`px-[15px] rounded-[10px] h-full flex items-center shrink-0 cursor-pointer transition-colors
                ${isActive ? "bg-surface-accent text-main" : "bg-card-light text-dark"}
              `}
            >
              {item.label}
            </span>
          );
        })}
      </div>

      <div onClick={onAdd}>
        <AddButton />
      </div>
    </div>
  );
}
