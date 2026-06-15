"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import HeaderTopBar from "./HeaderTopBar";
import HeaderNavBar from "./HeaderNavBar";
import AllMenuModal from "./AllMenuModal";
import { Category } from "@/lib/types/menu";
import { useCategories } from "@/lib/hooks/useCategories";

import { USER_KEY, fetcher } from "@/lib/api/user";
import { useCart } from "@/lib/hooks/useCart";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

interface UserData {
  firstName: string;
  lastName: string;
  avatar: string | null;
  email: string;
  phone: string;
  dob: string;
  country: string;
}

export default function Header({
  setMenuHeight,
}: {
  setMenuHeight: (h: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { categories, recommended } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: userData } = useSWR<UserData>(USER_KEY, fetcher);

  const isLoggedIn = !!userData;
  const userAvatar = userData?.avatar || "";
  const userName = userData?.firstName || "";

  const { cartCount } = useCart();

  useEffect(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  return (
    <header className="w-full relative z-50">
      <HeaderTopBar
        onAllClick={() => setIsMenuOpen((v) => !v)}
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        userAvatar={userAvatar}
        userName={userName}
      />
      <HeaderNavBar onAllClick={() => setIsMenuOpen((v) => !v)} />

      {isMenuOpen && (
        <AllMenuModal
          categories={categories}
          recommended={recommended}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onClose={() => setIsMenuOpen(false)}
          onHeightChange={setMenuHeight}
        />
      )}
    </header>
  );
}
