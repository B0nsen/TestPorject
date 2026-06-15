import CheckCircle from "@/components/CheckCircle";

type ShippingCheck = {
  label: string;
  subLabel: string;
};

interface ShippingChecksProps {
  items: readonly ShippingCheck[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function ShippingChecks({
  items,
  selectedIndex,
  onSelect,
}: ShippingChecksProps) {
  return (
    <div className="flex flex-col gap-[10px] sm:py-[34px]">
      {items.map((item, index) => {
        const isSelected = selectedIndex === index;
        return (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className="flex gap-[10px] cursor-pointer"
          >
            <CheckCircle size={20} checked={isSelected} />

            <div className="flex flex-col gap-[6px] align-middle">
              <span className="text-[16px] leading-[18px]">{item.label}</span>

              <span className="text-[14px] leading-[22px] text-accent-muted">
                {item.subLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
