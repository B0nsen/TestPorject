import Image, { StaticImageData } from "next/image";
import AvatarPlaceholder from "@/assets/icons/avatar_placeholder.svg?react";

interface AvatarProps {
  src?: string | StaticImageData;
  alt?: string;
  size?: number;
}
export default function Avatar({
  src,
  alt = "Avatar",
  size = 70,
}: AvatarProps) {
  const hasImage = Boolean(src);
  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center shrink-0 ${
        hasImage ? "" : "bg-main"
      }`}
      style={{
        width: size,
        height: size,
      }}
    >
      {hasImage ? (
        <Image
          src={src as string | StaticImageData}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <AvatarPlaceholder
          width={size * 0.6}
          height={size * 0.6}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
