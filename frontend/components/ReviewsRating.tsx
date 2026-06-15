import StarsRating from "./StarsRating";

interface ReviewsRatingProps {
  averageRating: number;
  ratingCount: number;
}

export default function ReviewsRating({ averageRating, ratingCount }: ReviewsRatingProps) {
  return (
    <div className="flex flex-col layout-product-sm:w-[183px] w-full items-start layout-product-sm:items-center">
      <div className="flex flex-col items-center w-fit">
        <h1 className="font-normal text-[64px] leading-none -mt-[8px] mb-[26px]">
          {averageRating}
        </h1>
        <div className="flex mb-[9px]">
          <StarsRating rating={averageRating} size={18} />
        </div>
        <p className="font-normal text-[14px] leading-[20px] align-middle whitespace-nowrap">
          {ratingCount.toLocaleString("en-US")} global ratings
        </p>
      </div>
    </div>
  );
}