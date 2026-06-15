export type ReviewFormData = {
  rating: number;
  title: string;
  review: string;
};

export type ReviewValidationErrors = {
  rating?: string;
  review?: string;
};

export function validateReviewForm(
  data: ReviewFormData
): ReviewValidationErrors {
  const errors: ReviewValidationErrors = {};

  if (!data.rating || data.rating < 1) {
    errors.rating = "Please select at least 1 star rating";
  }
  if (!data.review || data.review.trim().length === 0) {
    errors.review = "Review text is required";
  }

  return errors;
}

export function isReviewFormValid(data: ReviewFormData): boolean {
  return Object.keys(validateReviewForm(data)).length === 0;
}