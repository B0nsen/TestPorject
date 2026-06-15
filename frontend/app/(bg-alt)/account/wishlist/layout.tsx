"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import WishlistSlider from "@/components/WishlistSlider";
import React from "react";
import WishlistModal from "@/components/WishlistModal";
import WishlistHeader from "@/components/WishlistHeader";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`;
import { createDefaultWishlist, loadUserWishlists } from "@/lib/api/wishlist";
import ModalWrapper from "@/components/ModalWrapper";

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const wishlistId = Number(params.categoryId);
  const [ready, setReady] = useState(false);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [modalMode, setModalMode] = useState<
    "edit" | "create" | "delete" | null
  >(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await loadUserWishlists();

      if (!data || data.length === 0) {
        const created = await createDefaultWishlist();

        if (created) {
          setWishlists([created]);
          router.replace(`/account/wishlist/${created.id}`);
        }
      } else {
        setWishlists(data);
      }

      setInitialized(true);
    };

    init();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (!wishlists.length) return;

    const exists = wishlists.some((w) => w.id === wishlistId);

    if (!exists) {
      router.replace(`/account/wishlist/${wishlists[0].id}`);
      return;
    }

    setReady(true);
  }, [initialized, wishlists, wishlistId, router]);

  const categories = wishlists.map((wishlist) => ({
    id: wishlist.id,
    label: wishlist.name,
  }));

  const title =
    categories.find((c) => c.id === wishlistId)?.label ?? "Wishlist";

  const activeWishlist = wishlists.find((w) => w.id === wishlistId);

  const handleSelect = (id: number) => {
    router.push(`/account/wishlist/${id}`);
  };

  const handleEditList = () => {
    console.log("Wishlist Edit clicked:", {
      id: wishlistId,
      name: activeWishlist?.name ?? "unknown",
    });
    setModalMode("edit");
  };
  const handleDeleteList = () => {
    console.log("Wishlist Delete clicked:", {
      id: wishlistId,
      name: activeWishlist?.name ?? "unknown",
    });
    setModalMode("delete");
  };
  const handleAddWishlist = () => {
    setModalMode("create");
  };

  const confirmDeleteWishlist = async () => {
    try {
      const res = await fetch(`${API}/${wishlistId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Failed to delete wishlist:", res.status);
        return;
      }

      const nextWishlists = wishlists.filter((w) => w.id !== wishlistId);

      setWishlists(nextWishlists);
      setModalMode(null);

      if (nextWishlists.length > 0) {
        router.push(`/account/wishlist/${nextWishlists[0].id}`);
      } else {
        const created = await createDefaultWishlist();

        if (created) {
          setWishlists([created]);
          router.push(`/account/wishlist/${created.id}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateWishlist = async (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const res = await fetch(`${API}/${wishlistId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: trimmedName,
      }),
    });

    if (!res.ok) {
      console.error("Failed to update wishlist:", res.status);
      return;
    }

    setWishlists((prev) =>
      prev.map((w) => (w.id === wishlistId ? { ...w, name: trimmedName } : w)),
    );

    setModalMode(null);
  };

  const handleCreateWishlist = async (name: string) => {
    const res = await fetch(API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
      }),
    });

    if (!res.ok) {
      console.error("Failed to create wishlist:", res.status);
      return;
    }

    const created = await res.json();
    setWishlists((prev) => [...prev, created]);
    setModalMode(null);
    router.push(`/account/wishlist/${created.id}`);
  };

  return (
    <div className="w-full flex flex-col">
      <WishlistSlider
        categories={categories}
        onSelect={handleSelect}
        onAdd={handleAddWishlist}
        activeId={wishlistId}
      />
      {ready && (
        <>
          <WishlistHeader
            title={title}
            onEdit={handleEditList}
            onDelete={handleDeleteList}
          />
          <div className="flex flex-col gap-3">{children}</div>
        </>
      )}
      {modalMode === "delete" ? (
        <ModalWrapper
          title={`Delete ${activeWishlist?.name ?? ""} list?`}
          onClose={() => setModalMode(null)}
        >
          <div className="flex flex-col gap-5">
            <p className="text-sm text-surface-accent-muted">
              Are you sure you want to delete wishlist?
            </p>

            <button
              onClick={confirmDeleteWishlist}
              className="bg-error text-card-default px-[24px] py-[6px] rounded-[20px] w-fit text-center align-middle text-[14px] leading-[20px] font-semibold
              hover:bg-button-hover transition-colors duration-200 cursor-pointer"
            >
              Delete list
            </button>
          </div>
        </ModalWrapper>
      ) : (
        <WishlistModal
          open={modalMode !== null}
          title={
            modalMode === "edit"
              ? `Edit ${activeWishlist?.name ?? ""} list?`
              : "Add a new list"
          }
          initialName={modalMode === "edit" ? activeWishlist?.name : ""}
          confirmLabel={modalMode === "edit" ? "Save changes" : "Save list"}
          onClose={() => setModalMode(null)}
          onSubmit={
            modalMode === "edit" ? handleUpdateWishlist : handleCreateWishlist
          }
        />
      )}
    </div>
  );
}
