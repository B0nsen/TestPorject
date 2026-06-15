"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";
import logo2 from "@/assets/img/logo.png";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="w-[98px] h-[34px] flex-shrink-0 mr-3 layout-sm:mr-0 relative block"
    >
      <Image
        src={logo2}
        // src="/logo.png"
        alt="Logo"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );
}