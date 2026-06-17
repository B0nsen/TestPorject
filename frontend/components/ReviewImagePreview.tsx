import { useEffect, useMemo } from "react";
import Image from "next/image";
import Close from "@/assets/icons/close_small_alt.svg?react";

export default function ImageFileItem({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div
      className="relative size-[77px] group cursor-pointer"
      onClick={onRemove}
    >
      <Image
        src={previewUrl}
        alt={file.name}
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
