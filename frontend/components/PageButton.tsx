export default function PageButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        w-[48px] h-full flex items-center justify-center
        transition-colors
        ${
          active
            ? "bg-surface-accent text-main"
            : "bg-surface-main text-dark hover:bg-gray-200  "
        }
      `}
    >
      {children}
    </button>
  );
}