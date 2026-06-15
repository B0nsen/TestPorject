"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import WishlistActionButton from "./WishlistActionButton";

type Props = {
  open: boolean;
  initialName?: string;
  title: string;
  confirmLabel?: string;
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export default function WishlistModal({
  open,
  initialName = "",
  title,
  confirmLabel = "Save",
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  if (!open) return null;

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    onClose();
  };

  return (
    <ModalWrapper title={title} onClose={onClose}>
      <div className="flex flex-col gap-[8px] mb-[20px] font-['Inter',_sans-serif]">
        <label className="text-[16px] leading-[18px] text-accent-muted align-middle select-none">
          List name:
        </label>
        <input
          className="bg-main py-[7px] px-[14px] rounded-[10px] text-input focus:outline-none border border-transparent focus:border-accent-muted/30 transition-colors"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Wishlist name"
          autoFocus
        />
      </div>

      <WishlistActionButton
        onClick={handleSubmit}
        variant="primary"
        type="button"
        className="font-semibold"
      >
        {confirmLabel}
      </WishlistActionButton>
    </ModalWrapper>
  );
}