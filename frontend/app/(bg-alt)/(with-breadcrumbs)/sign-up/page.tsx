"use client";

import { AuthInput } from "@/components/AuthInput";
import { Checkbox } from "@/components/Checkbox";
import { AuthCard } from "@/components/AuthCard";

import { useRouter } from "next/navigation";
import { signupSchema, SignupValues } from "@/lib/validation/signup.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
export default function SignUpPage() {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      terms: false,
    },
  });
  const handleValidSubmit = async (data: SignupValues) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:5012/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const err = await response.text();

        setError("email", {
          message: err || "Unable to create account. Try again",
        });

        setIsLoading(false);
        return;
      }

      let result = null;

      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : null;
      } catch {
        result = null;
      }

      if (!result || result.success === false) {
        setError("email", {
          message: "This email is already in use",
        });

        setIsLoading(false);
        return;
      }

      setSentEmail(data.email);

      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (err) {
      console.error("Request failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText={isLoading ? "Signing up..." : "Sign up"}
        isLoading={isLoading}
        onSubmit={handleSubmit(handleValidSubmit)}
        title="signup"
      >
        <AuthInput
          placeholder="First Name"
          autoComplete="given-name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <AuthInput
          placeholder="Last Name"
          autoComplete="family-name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <AuthInput
          placeholder="Email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthInput
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Checkbox
          label="I agree with Terms and Service and Privacy Policy"
          labelClassName="text-[11px] leading-none"
          error={errors.terms?.message}
          checked={watch("terms")}
          {...register("terms")}
        />

        {sentEmail && (
          <span className="text-sm text-surface-accent-muted">
            Confirmation email has been sent to {sentEmail} ✓
          </span>
        )}
      </AuthCard>
    </div>
  );
}
