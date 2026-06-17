import { useState, useEffect, useRef } from "react";
import StarsRating from "./StarsRating";
import MediaUploadButton from "./MediaUploadButton";
import UserReviewField from "./UserReviewField";
import Image from "next/image";
import { validateReviewForm } from "@/lib/validation/reviewValidation";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";
import CtaButton from "./CtaButton";
import UploadedFilesList from "./UploadedFilesList";
import { Review } from "@/lib/types/review";
import UserReviewStatus from "./UserReviewActions";

type ReviewModalProps = {
  isOpen: boolean;
  product: any;
  onClose: () => void;
  userReview?: Review | null;
  onReviewCreated: () => void;
};
export default function ReviewModal({
  isOpen,
  product,
  userReview,
  onReviewCreated,
  onClose,
}: ReviewModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const hasReview = !!userReview;
  const hasInitialized = useRef(false);

  console.log(userReview);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) {
      hasInitialized.current = false;
      return;
    }

    if (hasInitialized.current) return;

    if (userReview) {
      setTitle(userReview.title ?? "");
      setReview(userReview.fullText ?? "");
      setRating(userReview.rating ?? 5);
    } else {
      resetForm();
    }

    hasInitialized.current = true;
  }, [isOpen, userReview]);

  const resetForm = () => {
    setRating(5);
    setTitle("");
    setReview("");
    setImages([]);
    setVideos([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    const isEditMode = !!userReview;
    setIsSubmitting(true);

    const formData = { rating, title, review };
    const validationErrors = validateReviewForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setIsSubmitting(false);
      return;
    }

    const content = new FormData();
    content.append("Title", title);
    content.append("Review", review);
    content.append("Rating", rating.toString());
    content.append("ProductId", product.id);

    if (images?.length) {
      images.forEach((file) => content.append("Images", file));
    }

    try {
      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/review/edit`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/review/create`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: content,
      });

      if (!response.ok) {
        console.error(
          isEditMode ? "Failed to update review" : "Failed to create review",
        );
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      onReviewCreated();
      resetForm();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 layout-px"
      onClick={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="card-default p-[20px] rounded-[20px] w-[1082px] max-h-[95vh] flex flex-col gap-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        {userReview && (
          <UserReviewStatus onDelete={() => console.log("delete review")} />
        )}
        <div className="overflow-y-auto flex flex-col gap-[18px] no-scrollbar">
          <UserReviewField label="Make a review about">
            <div className="flex items-top gap-[12px]">
              <div className="size-[72px] relative shrink-0 rounded-[10px] overflow-hidden bg-img">
                <Image
                  src={product.images.main}
                  alt={product.title}
                  fill
                  className="object-contain object-center p-[3px]"
                />
              </div>
              <div className="flex-col flex gap-[8px]">
                <span className="text-[20px] leading-[18px]">
                  {product.title}
                </span>
                <span className="font-normal text-[14px] leading-[20px] align-middle opacity-60">
                  {product.description}
                </span>
              </div>
            </div>
          </UserReviewField>

          <UserReviewField label="Rate this product">
            <StarsRating
              size={30}
              rating={rating}
              interactive
              onChange={setRating}
            />
          </UserReviewField>
          <UserReviewField label="Review Title" optional>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a short title for your review"
              className="input-default px-[14px] py-[7px] "
            />
          </UserReviewField>
          <UserReviewField label="Review">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="input-default px-[14px] py-[7px]"
              rows={6}
            />
          </UserReviewField>
          <UserReviewField label="Add real photos of the product">
            <div className="sm:flex-row flex-col flex items-top gap-[20px] sm:items-center items-start">
              <UploadedFilesList
                images={images}
                videos={videos}
                onRemoveImage={(index) =>
                  setImages((prev) => prev.filter((_, i) => i !== index))
                }
                onRemoveVideo={(index) =>
                  setVideos((prev) => prev.filter((_, i) => i !== index))
                }
              />
              <MediaUploadButton
                type="image"
                onFilesSelect={(files) => {
                  setImages((prev) => [...prev, ...files]);
                }}
              />
            </div>
          </UserReviewField>

          <CtaButton
            type="submit"
            disabled={isSubmitting}
            className="text-[16px] max-w-[289px] shrink-0"
          >
            {isSubmitting
              ? "Submitting review"
              : hasReview
                ? "Save changes"
                : "Submit review"}
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
