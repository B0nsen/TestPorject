import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";
import ReviewStatCard from "./ReviewStatCard";
import RatingBars from "./RatingBars";
import ReviewModal from "./ReviewModal";

import checkCircle from "@/assets/icons/check_circle.svg";
import thumbUp from "@/assets/icons/thumb_up.svg";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Review } from "@/lib/types/review";

interface ReviewSectionProps {
  reviews: Review[];
  userReview?: Review | null;
  product: any;
  onReviewCreated: () => Promise<void>;
  reviewStats: {
    averageRating: number;
    ratingCount: number;
    ratingCounts: number[];
    verifiedCount: number;
    recommendedCount: number;
  };
}
export default function ReviewSection({
  reviews,
  userReview,
  onReviewCreated,
  product,
  reviewStats,
}: ReviewSectionProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasReview = !!userReview;
  const {
    averageRating,
    ratingCount,
    ratingCounts,
    verifiedCount,
    recommendedCount,
  } = reviewStats;

  const router = useRouter();
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (hasReview) {
      console.log("user already has review. open edit");
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/islogin`, {
          credentials: "include",
        });

        const loggedIn = await loginRes.json();
        setIsLoggedIn(loggedIn);
      } catch (e) {
        console.error(e);
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);
  return (
    <section className="flex flex-col gap-[42px] justify-center items-center">
      <h2 className="text-title-md self-start">Customer reviews</h2>

      <div className="w-full flex flex-col layout-product-sm:flex-row items-stretch justify-between gap-[21px]">
        <ReviewsRating
          averageRating={averageRating}
          ratingCount={ratingCount}
        />
        <RatingBars ratings={ratingCounts} />
        <ReviewStatCard
          iconSrc={checkCircle}
          value={verifiedCount}
          label="Verified reviews"
        />
        <ReviewStatCard
          iconSrc={thumbUp}
          value={recommendedCount}
          label="Clients recommend this product"
          width="w-[300px]"
        />
        <WriteReviewCTA hasReview={hasReview} onClick={handleWriteReview} />
      </div>

      <div className="flex flex-col max-w-[1076px] gap-[21px] w-full">
        {/* <ReviewFilters /> */}
        <UserReviews reviews={reviews} userReview={userReview} />
      </div>

      <ReviewModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewCreated={async () => {
          console.log("Review created successfully");
          await onReviewCreated();
        }}
        userReview={userReview}
      />
    </section>
  );
}
