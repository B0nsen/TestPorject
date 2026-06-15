import { Review } from "@/lib/types/review";
import StarsRating from "./StarsRating";
import { useState } from "react";
import Avatar from "./Avatar";

interface UserReviewProps {
  review: Review;
  isUserReview?: boolean;
}

export default function UserReview({ review, isUserReview }: UserReviewProps) {
  const {
    id,
    userName,
    title,
    date,
    country,
    fullText,
    helpfulCount,
    images,
    rating,
    userAvatar,
  } = review;
  const [count, setCount] = useState(helpfulCount);
  const [isLiked, setIsLiked] = useState(Boolean);
  const AddHelpful = () => {
    const offset = isLiked ? -1 : 1;
    fetch(`http://localhost:5012/api/review/helpful/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        setCount((prev) => prev + offset);
        setIsLiked(!isLiked);
      }
    });
  };
  return (
    <div className="flex flex-col gap-[11px]">
      <div className="flex items-c  enter gap-[10px]">
        <Avatar src={userAvatar ?? undefined} alt={userName} size={27} />
        <span className="font-sans font-normal text-[12px] leading-[19px] align-middle">
          {userName}
        </span>

        {isUserReview && (
          <span
            className="text-main/60 ml-auto rounded-[20px] border border-main/60 px-[24px] py-[3.5px] cursor-pointer
              font-semibold text-[14px] leading-[20px] text-center align-middle  "
          >
            Your review
          </span>
        )}
      </div>
      <div className="flex gap-[2px]">
        <StarsRating rating={rating} size={16} gap={2} />
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="text-title">{title}</p>
        <p className="text-body">
          Reviewed in {country} on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <p className="text-body">{fullText}</p>

      <div className="ml-[6px] flex gap-[6px] overflow-x-auto no-scrollbar snap-x ">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-[66px] h-[88px] rounded-[12px] flex-shrink-0 bg-gray-300 snap-start"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
      <p className="text-body">{count} people found this helpful</p>
      <div className="flex gap-2">
        <button
          className="btn-pill bg-surface-accent-muted cursor-pointer"
          onClick={AddHelpful}
        >
          Like
        </button>
        <button className="btn-pill bg-transparent border border-white text-white">
          Report
        </button>
      </div>
    </div>
  );
}
