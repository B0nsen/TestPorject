"use client";

import Icon from "@/assets/icons/404.svg?react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className=" w-full items-center flex flex-col gap-[50px] layout-px pt-[clamp(80px,15vw,200px)] pb-[80px] before:absolute before:inset-0 before:bg-[url('/images/homepage/bg.jpg')] before:bg-repeat-y before:bg-[length:100%_auto] *:relative *:z-10">
      <Icon className="w-full max-w-[500px] h-auto px-4" />
      <div className="flex flex-col max-w-[430px] gap-[12px]">
        <h2 className="text-main font-semibold text-[40px] leading-[28px] text-center text-white">
          Lost in space
        </h2>
        <p className="font-normal text-[16px] leading-[18px] text-center text-main/60 ">
          The page you&apos;re looking for has drifted into another orbit.
          Let&apos;s get you back to the marketplace.
        </p>
      </div>

      <div className="flex gap-[20px] ">
        <Button
          variant="primary"
          hoverVariant="accent_muted"
          py={10}
          onClick={() => router.push("/")}
        >
          Return to Orbis
        </Button>

        <Button
          variant="ternary"
          hoverVariant="accent_muted"
          py={10}
          onClick={() => router.push("/catalog")}
        >
          Go to Catalog
        </Button>
      </div>
    </div>
  );
}