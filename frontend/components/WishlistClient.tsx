"use client";

import WishlistItem from "@/components/WishlistItem";
import { useWishlist } from "@/lib/hooks/useWishlist";
type WishlistItemType = {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: any;
};

export default function WishlistClient({
  items,
}: {
  items: WishlistItemType[];
}) {
  const { removeFromWishlist } = useWishlist();
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">No items in this category.</p>;
  }

  return (
    <>
      {items.map((item) => (
        <WishlistItem
          key={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          imageSrc={item.image}
          onDelete={() => removeFromWishlist(item.id)}
        />
      ))}
    </>
  );
}
