import Link from "next/link";

type FooterItem = {
  name: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  items: FooterItem[];
};

export default function FooterColumn({ title, items }: FooterColumnProps) {
  return (
   
    <div className="w-full flex flex-col gap-3 text-[#E6ECF5]">
      
      
      <h2 className="font-semibold text-[16px] layout-sm:text-[18px] leading-[24px] layout-sm:leading-[28px] tracking-normal md:whitespace-nowrap">
        {title}
      </h2>

     
      <ul className="flex flex-col gap-[11px]">
        {items.map((item, index) => (
          <li key={index} className="text-[13px] layout-sm:text-[14px] leading-[16px] font-normal opacity-90 hover:opacity-100 hover:underline transition-opacity">
            <Link href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}