"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type SocialIconLinkProps = {
  href: string;
  src: StaticImageData;
  alt: string;
  shouldInvert?: boolean;
};

const sizeModifiers: Record<string, string> = {
  Facebook: "scale-[100%]",  
  Instagram: "scale-[100%]", 
  X: "scale-[85%]",       
  TikTok: "scale-[88%]",  
};

export default function SocialIconLink({ href, src, alt, shouldInvert = false }: SocialIconLinkProps) {
  const currentScale = sizeModifiers[alt] || "scale-100";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-4 h-4 min-w-[16px] min-h-[16px] flex items-center justify-center transition-all duration-200 opacity-90 hover:opacity-100"
    >
      <Image
        src={src}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain max-w-full max-h-full ${currentScale} ${
          shouldInvert ? "brightness-0 invert" : ""
        }`}
        priority
      />
    </Link>
  );
}