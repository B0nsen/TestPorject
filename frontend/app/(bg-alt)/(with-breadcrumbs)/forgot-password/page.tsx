"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCard } from "@/components/AuthCard";

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/validation/forgot-password.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const email = useAuthStore((s: any) => s.email);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  const handleValidSubmit = async (data: ForgotPasswordValues) => {
    setError("");
    setSentEmail(null);

    const res = await fetch(`${API_BASE}/api/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (!res.ok) {
      console.error("Failed to send reset email:", res.status);
      setError("Failed to send email. Try again later.");
      return;
    }

    setSentEmail(data.email);
  };

  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText="Send reset link"
        onSubmit={handleSubmit(handleValidSubmit)}
        title="forgot-password"
      >
        <AuthInput
          placeholder="Email address"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {sentEmail && (
          <span className="text-[14px] font-normal leading-[16px] tracking-normal align-middle text-surface-accent-muted">
            If this email exists, reset link was sent to {sentEmail} ✓
          </span>
        )}

        {error && <span className="text-sm text-red-500">{error}</span>}
      </AuthCard>
    </div>
  );
}
