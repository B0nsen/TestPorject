import Image, { StaticImageData } from "next/image";

type RoundIconProps = {
  src: StaticImageData;
  alt: string;
};

export default function RoundIcon({ src, alt }: RoundIconProps) {
  return (
    <div className="relative w-[24px] h-[24px] rounded-full overflow-hidden bg-icon-surface-light flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
      />
    </div>
  );
}