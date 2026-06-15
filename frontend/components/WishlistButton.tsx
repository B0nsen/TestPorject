import Icon from "@/assets/icons/favorite.svg?react";

type WishlistButtonProps = {
  onClick?: () => void;
};

export default function WishlistButton({ onClick }: WishlistButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-[31px] rounded-full shrink-0 flex items-center justify-center cursor-pointer bg-surface-accent-muted"
      aria-label="Add to wishlist"
    >
      <Icon className="w-[19px] h-[15px]" />
    </button>
  );
}