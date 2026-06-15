import { useRef } from "react";
import Image from "next/image";
import video from "@/assets/img/video-icon.png";
import photo from "@/assets/img/photo-icon.png";

type MediaUploadButtonProps = {
  type: "image" | "video";
  onFilesSelect?: (files: File[]) => void;
};
export default function MediaUploadButton({
  type,
  onFilesSelect,
}: MediaUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !onFilesSelect) return;

    onFilesSelect(Array.from(files));
  };

  const accept = type === "image" ? "image/*" : "video/*";
  const icon = type === "image" ? photo : video;
  const alt = type === "image" ? "Add photos" : "Add videos";

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handleClick}
        className="size-[72px] bg-card-light rounded-[12px] flex items-center justify-center cursor-pointer"
      >
        <Image src={icon} alt={alt} width={34} height={34} />
      </button>
    </>
  );
}
