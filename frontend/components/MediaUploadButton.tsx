import { useRef } from "react";
import AddIcon from "@/assets/icons/add_alt.svg?react";

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
    e.target.value = "";
  };

  const accept = type === "image" ? "image/*" : "video/*";

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
        className="size-[69px] shrink-0 bg-card-light rounded-[12px] flex items-center justify-center cursor-pointer rounded-full bg-surface-accent-muted"
      >
        <AddIcon className="size-[37px] text-accent" />
      </button>
    </>
  );
}