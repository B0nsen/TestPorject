type GridProps = {
  children: React.ReactNode;
  className?: string;
};

export function CatalogGrid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`
        grid items-stretch gap-x-[10px] gap-y-[18px]
        grid-cols-[repeat(auto-fill,minmax(140px,1fr))]
        ${className}
      `}
    >
      {children}
    </div>
  );
}