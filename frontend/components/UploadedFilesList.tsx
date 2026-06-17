import ReviewImagePreview from "./ReviewImagePreview";

type UploadedFilesListProps = {
  images: File[];
  videos: File[];
  onRemoveImage: (index: number) => void;
  onRemoveVideo: (index: number) => void;
};

export default function UploadedFilesList({
  images,
  videos,
  onRemoveImage,
  onRemoveVideo,
}: UploadedFilesListProps) {
  const hasFiles = images.length > 0 || videos.length > 0;
  if (!hasFiles) return null;

  return (
    <div className="flex flex-wrap gap-[8px] text-accent">
      {images.map((file, index) => (
        <ReviewImagePreview
          key={`img-${index}`}
          file={file}
          onRemove={() => onRemoveImage(index)}
        />
      ))}
    </div>
  );
}
