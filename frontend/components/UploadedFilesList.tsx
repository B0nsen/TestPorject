import ReviewImagePreview from "./ReviewImagePreview";
type UploadedFilesListProps = {
  images: File[];
  existingImages?: string[];
  videos: File[];
  onRemoveImage: (index: number) => void;
  onRemoveExistingImage?: (index: number) => void;
  onRemoveVideo: (index: number) => void;
};

export default function UploadedFilesList({
  images,
  existingImages = [],
  videos,
  onRemoveImage,
  onRemoveExistingImage,
  onRemoveVideo,
}: UploadedFilesListProps) {
  const hasFiles = images.length > 0 || videos.length > 0 || existingImages.length > 0;

  if (!hasFiles) return null;

  return (
    <div className="flex flex-wrap gap-[20px] text-accent">
      {existingImages.map((url, index) => (
        <ReviewImagePreview
          key={`existing-${index}`}
          src={url}
          onRemove={() => onRemoveExistingImage?.(index)}
        />
      ))}

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