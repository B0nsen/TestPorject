import WishlistClient from "@/components/WishlistClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API = `${API_BASE}/api/wishlist`;

type WishlistItemDTO = {
  id: number;
  wishlistId: number;
  productId: number;
  productName: string;
  productPrice: number;
  productRating: number;
  productImageUrl?: string | null;
};

type WishlistDTO = {
  id: number;
  userId: number;
  name: string;
  items: WishlistItemDTO[];
};

const getImageSrc = (imageUrl?: string | null) => {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${API_BASE}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const wishlistId = Number(categoryId);

  if (!Number.isFinite(wishlistId) || wishlistId <= 0) {
    console.error("Invalid wishlist id:", categoryId);
    return <WishlistClient items={[]} />;
  }

  const res = await fetch(`${API}/${wishlistId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to load wishlist:", res.status);
    return <WishlistClient items={[]} />;
  }

  const wishlist: WishlistDTO = await res.json();
  console.log(wishlist);
  const wishlistItems = (wishlist.items || []).map((item) => ({
    id: item.id,
    title: item.productName,
    rating: item.productRating,
    price: item.productPrice,
    image: getImageSrc(item.productImageUrl),
  }));

  return <WishlistClient items={wishlistItems} />;
}
