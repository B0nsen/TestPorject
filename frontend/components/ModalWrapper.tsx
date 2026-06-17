import React, { ReactNode } from "react";
import { CloseButton } from "./CloseButton";

type ModalWrapperProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalWrapper({
  title,
  onClose,
  children,
}: ModalWrapperProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 layout-px"
      onClick={onClose} 
    >
      <div
        className="w-full max-w-[370px] card-default rounded-[20px] p-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex mb-[12px] justify-between items-center">
          <h2 className="text-[20px] font-semibold leading-[32px] text-surface-accent-muted">
            {title}
          </h2>

          <CloseButton onClick={onClose} />
        </div>

        {children}
      </div>
    </div>
  );
}