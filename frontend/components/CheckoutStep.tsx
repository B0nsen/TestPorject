"use client";

import StepHeader from "@/components/StepHeader";
import { StepMode } from "@/app/checkout/page"; 

interface CheckoutStepProps {
  step: number;
  title: string;
  mode: StepMode;
  onOpen: () => void;
  changeLabel?: string;
  disabled?: boolean;
  children: React.ReactNode;
}
export default function CheckoutStep({
  step,
  title,
  mode,
  disabled,
  changeLabel,
  onOpen,
  children,
}: CheckoutStepProps) {
  return (
    <div className="flex flex-col gap-[15px]">
      <StepHeader
        step={step}
        title={title}
        disabled={disabled}
        onChange={onOpen}
        changeLabel={changeLabel}
      />
      {children}
    </div>
  );
}
