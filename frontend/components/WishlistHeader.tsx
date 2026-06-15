import WishlistActionButton from "./WishlistActionButton";

type Props = {
  title: string;
  itemCount?: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function WishlistHeader({
  title,
  itemCount,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-[12px]  py-[8.5px] mb-[12px] layout-wishlist-sm:flex-row flex-col">
      <div className="flex items-center gap-[20px]">
        <span className="font-semibold text-[24px] leading-[28px] align-middle">
          {title} list
        </span>

        {/* <span className="text-[16px] leading-[18px] align-middle text-main/60">
          {itemCount} products
        </span> */}
      </div>
      <div
        className="ml-auto flex items-center justify-end gap-[12px]
        layout-wishlist-sm:w-fit w-full
        layout-wishlist-xs:flex-row flex-col"
      >
        <WishlistActionButton onClick={onEdit}>Edit list</WishlistActionButton>
        <WishlistActionButton variant="secondary" onClick={onDelete}>
          Delete list
        </WishlistActionButton>
      </div>
    </div>
  );
}
