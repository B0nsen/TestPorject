export const createDefaultWishlist = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Wishlist`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Default",
        }),
    });

    if (!res.ok) {
        console.error("Failed to create wishlist:", res.status);
        return null;
    }

    return await res.json();
};

export const loadUserWishlists = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Wishlist/my`, {
        credentials: "include",
    });

    if (!res.ok) {
        console.error("Failed to load wishlists:", res.status);
        return [];
    }

    return await res.json();
};