import { useState } from "react";
import UserReview from "./UserReview";
import { Review } from "@/lib/types/review";

interface UserReviewsProps {
  reviews: Review[];
  userReview?: Review | null;
}
export default function UserReviews({ reviews, userReview }: UserReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="w-full flex flex-col gap-[16px]">
      {userReview && <UserReview review={userReview} isUserReview />}
      {reviews.slice(0, visibleCount).map((review) => (
        <UserReview key={review.id} review={review} />
      ))}

      {visibleCount < reviews.length && (
        <button
          onClick={handleLoadMore}
          className="font-medium text-meta bg-transparent border w-fit mx-auto h-[29px] rounded-[25px] flex items-center px-[20px] mt-[10px]"
        >
          See more reviews
        </button>
      )}
    </div>
  );
}
