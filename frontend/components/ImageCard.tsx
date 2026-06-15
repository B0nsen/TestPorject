import Image from "next/image";

type ImageCardProps = {
  label: string;
  image?: string;
  onClick?: () => void;
};
export default function ImageCard({ label, image, onClick }: ImageCardProps) {
  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
      <div className="relative w-full aspect-[146/120] rounded-[10px] overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 146px"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <span className="text-category-card mt-[8px]">{label}</span>
    </div>
  );
}