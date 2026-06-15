type Item = {
  label: string;
  key: string;
};

type MenuSectionProps = {
  title: string;
  items: Item[];
  onItemClick?: (item: Item) => void;
};

export default function MenuSection({
  title,
  items,
  onItemClick,
}: MenuSectionProps) {
  return (
    <div className="mb-[20px] break-inside-avoid">
      <h3 className="text-category-md mb-[12px]">{title}</h3>

      <ul className="space-y-[12px]">
        {items.map((item) => (
          <li
            key={item.key}
            onClick={() => onItemClick?.(item)}
            className="text-category-sm cursor-pointer hover:underline"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}