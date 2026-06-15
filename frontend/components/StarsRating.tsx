import Star from "@/assets/icons/review-star.svg?react";

interface StarsProps {
  size?: number;
  gap?: number;
  dark?: boolean;
  rating?: number;

  interactive?: boolean;
  emptyColorClass?: string;
  onChange?: (rating: number) => void;
}

export default function StarsRating({
  size = 16,
  gap = 2,
  dark = false,
  rating,
  emptyColorClass,
  interactive = false,
  onChange,
}: StarsProps) {
  const value = rating !== undefined ? Math.floor(rating) : 0;
  const defaultEmptyColor = dark ? "text-gray-900" : "text-main";
  const handleClick = (idx: number) => {
    if (!interactive || !onChange) return;
    onChange(idx + 1);
  };

  return (
    <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const isFilled = idx < value;

        return (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              width={size}
              height={size}
              className={
                isFilled
                  ? "text-star"
                  : emptyColorClass ?? defaultEmptyColor
              }
            />
          </div>
        );
      })}
    </div>
  );
}
