import SuccessIcon from "@/assets/icons/review_success.svg?react";

type UserReviewStatusProps = {
  onDelete: () => void;
};

export default function UserReviewStatus({ onDelete }: UserReviewStatusProps) {
  return (
    <div className="w-full flex items-center gap-[8px]">
      <SuccessIcon width={60} height={60} className="shrink-0" />

      <div className="flex flex-col gap-[9px]">
        <span className="font-semibold text-[20px] leading-[32px] align-middle">
          Your review is submitted
        </span>
        <span className="text-[14px] leading-[20px] align-middle opacity-60">
          Thanks for sharing your thoughts. You can edit your review anytime.
        </span>
      </div>

      <button
        onClick={onDelete}
        type="button"
        className="text-main/60 ml-auto rounded-[20px] border border-main/60 px-[24px] py-[6px] cursor-pointer
        font-semibold text-[14px] leading-[20px] text-center align-middle  "
      >
        Delete review
      </button>
    </div>
  );
}
