"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCard } from "@/components/AuthCard";

import {
  resetPasswordSchema,
  ResetPasswordValues,
} from "@/lib/validation/reset-password.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5012";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleValidSubmit = async (data: ResetPasswordValues) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Reset token is missing");
      return;
    }

    const res = await fetch(`${API_BASE}/api/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword: data.password,
      }),
    });

    if (!res.ok) {
      console.error("Failed to reset password:", res.status);
      setError("Reset link is invalid or expired");
      return;
    }

    setSuccess("Password has been reset");

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText="Reset password"
        onSubmit={handleSubmit(handleValidSubmit)}
        title="reset-password"
      >
        <div className="flex flex-col gap-4">
          <AuthInput
            placeholder="New password"
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <AuthInput
            placeholder="Confirm new password"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
      </AuthCard>
    </div>
  );
}
