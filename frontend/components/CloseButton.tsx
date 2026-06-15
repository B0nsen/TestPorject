import React from "react";
import CloseIcon from "@/assets/icons/close.svg?react";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
};

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "",
  ariaLabel = "Close modal",
}) => {
  return (
    <button
      onClick={onClick}
      className={`size-[32px] flex items-center justify-center rounded-full border border-surface-accent-muted cursor-pointer ${className}`}
      aria-label={ariaLabel}
      type="button"
    >
      <CloseIcon className="size-[14px]" />
    </button>
  );
};