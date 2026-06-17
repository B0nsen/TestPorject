"use client";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { USER_KEY, fetcher } from "@/lib/api/user";

import personIcon from "@/assets/icons/person.svg";
import ordersIcon from "@/assets/icons/orders.svg";
import returnsIcon from "@/assets/icons/sync_alt.svg";
import messagesIcon from "@/assets/icons/mail.svg";
import addressIcon from "@/assets/icons/location_on.svg";
import paymentIcon from "@/assets/icons/credit_card.svg";
import wishlistIcon from "@/assets/icons/favorite.svg";
import supportIcon from "@/assets/icons/help.svg";
import Avatar from "./Avatar";
import FormButton from "./FormButton";
import { useEffect, useState } from "react";
import { loadUserWishlists } from "@/lib/api/wishlist";
import ConfirmModal from "./ConfirmModal";

type UserData = {
  avatar?: string;
  firstName: string;
  email: string;
  lastName: string;
};

export const accountNavigationLinks = [
  { label: "Account Details", href: "/account/details", icon: personIcon },
  { label: "Your Orders", href: "/account/orders", icon: ordersIcon },
  { label: "Returns & Refunds", href: "/account/returns", icon: returnsIcon },
  { label: "Your messages", href: "/account/messages", icon: messagesIcon },
  { label: "Addresses", href: "/account/addresses", icon: addressIcon },
  { label: "Payment Methods", href: "/account/payments", icon: paymentIcon },
  { label: "Your Wishlist", href: "/account/wishlist", icon: wishlistIcon },
  { label: "Customer Support", href: "/account/support", icon: supportIcon },
  { label: "Account Details", href: "/account", icon: personIcon },
];
export default function AccountNavigation() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wishlistHref, setWishlistHref] = useState("/account/wishlist");

  const { data: userData } = useSWR<UserData>(USER_KEY, fetcher);
  useEffect(() => {
    const loadWishlistLink = async () => {
      try {
        const wishlists = await loadUserWishlists();
        if (wishlists?.length > 0) {
          setWishlistHref(`/account/wishlist/${wishlists[0].id}`);
        }
      } catch (e) {
        console.error("Failed to load wishlist link", e);
      }
    };
    loadWishlistLink();
  }, []);
  
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/account`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      console.log("Account deleted");
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  const handleLogOut = () => {
    console.log("Log Out account clicked");
  };
  return (
    <div className="flex flex-col layout-account-sm:gap-[30px] gap-[20px]">
      <div className="flex card-default items-center gap-[12px] px-[16px] py-[12px] ">
        <Avatar src={userData?.avatar} />

        <div className="flex flex-col">
          <span className="text-[20px] leading-[32px] align-middle">
            {userData?.firstName}
          </span>
          <span className="text-[13px] leading-[20px] align-middle">
            {userData?.email}
          </span>
        </div>
      </div>

      <div className="flex flex-col py-[30px] layout-account-sm:gap-[80px] gap-[30px] card-default">
        <div>
          {accountNavigationLinks
            .filter((item) => item.href !== "/account")
            .map((item) => {
              const href =
                item.href === "/account/wishlist" ? wishlistHref : item.href;

              return (
                <Link
                  key={item.href}
                  href={href}
                  className="flex items-center gap-[8px] py-[8px] px-[20px]"
                >
                  <div className="relative w-[13px] h-[13px]">
                    <Image
                      src={item.icon}
                      alt="icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span className="text-[20px] leading-[100%] align-middle">
                    {item.label}
                  </span>
                </Link>
              );
            })}
        </div>
        <div className="flex flex-col gap-3">
          <FormButton className="self-center" onClick={handleLogOut}>
            Log Out
          </FormButton>
          <FormButton
            className="self-center"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </FormButton>
        </div>
      </div>

      <ConfirmModal
        open={isDeleteModalOpen}
        title="Delete account?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
