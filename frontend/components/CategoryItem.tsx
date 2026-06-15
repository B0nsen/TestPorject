import Image from "next/image";

type CategoryItemProps = {
  label: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function CategoryItem({
  label,
  icon,
  isActive = false,
  onClick,
}: CategoryItemProps) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer flex items-center sm:h-fit h-[50px]
      gap-[16px] px-[12px] sm:py-[9px] sm:px-[30px] text-black 
      ${isActive ? "bg-blue-200 font-medium" : "hover:bg-blue-200"}`}
    >
      {icon && (
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="sm:block hidden object-contain shrink-0 size-[32px]"
        />
      )}
      <span className="text-category-md">{label}</span>
    </li>
  );
}
