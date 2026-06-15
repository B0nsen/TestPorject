type UploadedFilesListProps = {
  images: File[];
  videos: File[];
  onRemoveImage: (index: number) => void;
  onRemoveVideo: (index: number) => void;
};
function FileItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <span
      onClick={onRemove}
      className="cursor-pointer hover:opacity-70 inline-flex items-center gap-[6px]"
    >
      {file.name}
      <span className="text-[20px] leading-none flex items-center">×</span>
    </span>
  );
}
export default function UploadedFilesList({
  images,
  videos,
  onRemoveImage,
  onRemoveVideo,
}: UploadedFilesListProps) {
  const hasFiles = images.length > 0 || videos.length > 0;
  if (!hasFiles) return null;
  return (
    <div className="flex flex-col text-accent gap-[4px]">
      {images.map((file, index) => (
        <FileItem
          key={`img-${index}`}
          file={file}
          onRemove={() => onRemoveImage(index)}
        />
      ))}

      {videos.map((file, index) => (
        <FileItem
          key={`vid-${index}`}
          file={file}
          onRemove={() => onRemoveVideo(index)}
        />
      ))}
    </div>
  );
}
