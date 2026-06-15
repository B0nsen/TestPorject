"use client";

type Props = {
  manufacturerBanner?: string;
};

export default function ProductManufacturerInfo({
  manufacturerBanner,
}: Props) {
  return (
    <div className="w-full">
      <h2 className="mb-[18px] text-title-sm">From the manufacturer</h2>

        {manufacturerBanner ? (
          <div className="w-full">
          <img
            src={manufacturerBanner}
            alt="Manufacturer banner"
            className="w-full h-auto object-contain"
          />
          </div>
        ) : (
          <p className="text-[14px]">
            No manufacturer info available
          </p>
        )}
      
    </div>
  );
}