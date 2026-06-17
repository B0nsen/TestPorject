import { useEffect, useMemo } from "react";
import Image from "next/image";
import Close from "@/assets/icons/close_small_alt.svg?react";


type ImageFileItemProps = {
  file?: File;
  src?: string;
  onRemove: () => void;
};
export default function ImageFileItem({
  file,
  src,
  onRemove,
}: ImageFileItemProps) {
  const previewUrl = useMemo(() => {
    if (src) return src;
    if (file) return URL.createObjectURL(file);
    return "";
  }, [file, src]);

  useEffect(() => {
    if (!file) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, file]);

  return (
    <div
      className="relative size-[77px] group cursor-pointer"
      onClick={onRemove}
    >
      <Image
        src={previewUrl}
        alt={file?.name ?? "image"}
        fill
        unoptimized
        className="object-cover rounded-[8px] transition duration-200 group-hover:scale-105 group-hover:brightness-75"
      />

      <button
        type="button"
        className="cursor-pointer absolute bottom-[-6px] right-[-6px] size-[19px] rounded-full bg-surface-accent flex items-center justify-center shadow-md z-10
                 transition duration-200
                 group-hover:scale-125 active:scale-95"
      >
        <Close className="size-[7px] text-white" />
      </button>
    </div>
  );
}