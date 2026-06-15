export default function ProductInformation({
  productInfo,
  warranty,
}: {
  productInfo: any[];
  warranty: string;
}) {
  const infoSections = [
    {
      title: "Warranty & Support",
      content: `Product Warranty: ${warranty}`,
    },
    {
      title: "Feedback",
      content: "Would you like to tell us about a lower price?",
    },
  ];
  return (
    <section className="flex flex-col w-full layout-product-sm:gap-[140px] gap-[20px] layout-product-sm:flex-row">
      <div className="w-full flex flex-col gap-[24px]">
        <h2 className="text-title-md">Product information</h2>

        <div className="w-full flex flex-col gap-[12px]">
          {productInfo.map((item, index) => (
            <div
              key={index}
              className="flex justify-between w-full border-t py-[4px] gap-[20px]"
            >
              <span className="font-inter font-bold text-[14px] leading-[20px]">
                {item.label}
              </span>
              <span className="font-inter font-normal text-[14px] leading-[20px] text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        {infoSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[10px]">
            <h3 className="text-title-sm">{section.title}</h3>
            <p className="border-t pt-[4px]">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
