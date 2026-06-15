"use client";

import { Button } from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5012";

export default function EmailConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      const res = await fetch(`${API_BASE}/api/user/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      if (!res.ok) {
        console.error("Failed to confirm email:", res.status);
        setStatus("error");
        return;
      }

      setStatus("success");
    };

    confirmEmail();
  }, [token]);

  const title =
    status === "loading"
      ? "Email confirmation"
      : status === "success"
        ? "Your email has been confirmed"
        : "Confirmation failed";

  const text =
    status === "loading"
      ? "We are confirming your email. Please wait."
      : status === "success"
        ? "Thank you! Your email address has been successfully verified. You can now log in to your account."
        : "Confirmation link is invalid or expired.";

  return (
   <div className="w-full h-[60vh] items-center flex flex-col gap-[24px] layout-px sm:pt-[70px] pt-[140px] pb-[80px]">
      <div className="max-w-[414px] flex flex-col  gap-[12px]">
        <h2 className="font-inter font-normal text-[24px] leading-[28px] tracking-[0px]">
          {title}
        </h2>
        <p className="font-inter font-normal text-[14px] leading-[16px] tracking-[0px]">
          {text}
        </p>
      </div>

      <Button
        variant="ternary"
        size="lg"
        hoverVariant="accent_muted"
        py={10}
        px={40}
        onClick={() => router.push("/login")}
      >
        Go to login
      </Button>
    </div>
  );
}
