"use client";

import EditIcon from "@/assets/icons/edit.svg?react";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

export default function EditButton({ onClick, className }: EditButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex items-center cursor-pointer gap-[10px] 
      font-semibold text-[16px] leading-[32px] text-accent ${className || ""}`}
    >
      <EditIcon className="size-[18px]" />
      Edit
    </button>
  );
}