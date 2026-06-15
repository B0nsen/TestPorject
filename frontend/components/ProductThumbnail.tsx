"use client";
import Image from "next/image";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ProductThumbnail({
  src,
  alt,
  selected = false,
  onClick,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? "true" : undefined}
      className="
        w-[50px] h-[50px] rounded-[10px] shrink-0 cursor-pointer
        overflow-hidden relative
      "
    >
      <Image
        src={src || ""}
        alt={alt || ""}
        fill
        sizes="50px"
        decoding="async"
        className="object-cover object-center"
        loading="lazy"
      />

      {selected && (
        <div className="absolute inset-0 border-2 border-accent pointer-events-none rounded-[10px]" />
      )}
    </button>
  );
}
