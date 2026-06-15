import ArrowIcon from "@/assets/icons/page-nav.svg?react";

export default function NavButton({
  direction,
  children,
  onClick,
  disabled = false,
}: {
  direction: "prev" | "next";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        w-[95px] px-[10px] flex items-center justify-center gap-[6px]
        transition
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          flex items-center gap-[6px]
          ${isPrev ? "text-accent-muted" : "text-dark"}
        `}
      >
        {isPrev && <ArrowIcon className="size-[12px] text-current" />}

        {children}

        {!isPrev && (
          <ArrowIcon className="size-[12px] rotate-180 text-current" />
        )}
      </span>
    </button>
  );
}
