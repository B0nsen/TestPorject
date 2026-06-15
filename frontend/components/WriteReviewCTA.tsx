import CtaButton from "./CtaButton";

type Props = {
  onClick: () => void;
  hasReview: boolean | null;
};
export default function WriteReviewCTA({ onClick, hasReview }: Props) {
  const isEdit = hasReview === true;
  return (
    <div className="layout-product-lg:w-[283px] w-full max-w-[283px] flex flex-col gap-[13px]">
      <p className="font-bold text-[19px] leading-[24px]">
        {isEdit ? "Your review is submitted" : "Review this product"}
      </p>
      <p className="text-[14px] leading-[20px]">
        {isEdit
          ? "Thanks for sharing your thoughts. You can edit it anytime."
          : "Share your thoughts with other customers"}
      </p>

      <CtaButton  onClick={onClick} className="text-body border-interactive">
        {isEdit ? "Edit your review" : "Write a customer review"}
      </CtaButton>
    </div>
  );
}
