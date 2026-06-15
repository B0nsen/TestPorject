"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const WISHLIST_ITEM_API = `${API_BASE}/api/wishlistitem`;

export function useWishlist() {
   const addToWishlist = async (productId: number, wishlistId: number) => {
    const res = await fetch(WISHLIST_ITEM_API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        wishlistId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to add product to wishlist:", res.status);
      return;
    }

    console.log("Product added to wishlist");
  };

  const removeFromWishlist = async (wishlistItemId: number) => {
    const res = await fetch(`${WISHLIST_ITEM_API}/${wishlistItemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to remove product from wishlist:", res.status);
      return;
    }

    window.location.reload();
  };

  return {
    addToWishlist,
    removeFromWishlist,
  };
}
