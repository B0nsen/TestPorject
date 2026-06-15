import DotsIcon from "@/assets/icons/dots.svg?react";

type PaginationBreakProps = {
  className?: string;
};

export default function PaginationBreak({ className }: PaginationBreakProps) {
  return (
    <span
      className={`
        w-[34px] h-full flex items-center justify-center
        bg-surface-main
        ${className ?? ""}
      `}
    >
      <DotsIcon className="size-[10px] text-accent-muted" />
    </span>
  );
}