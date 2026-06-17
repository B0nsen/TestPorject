import ModalWrapper from "./ModalWrapper";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;
  return (
    <ModalWrapper title={title} onClose={onCancel}>
      <div className="flex flex-col gap-5">
        <p className="text-sm text-surface-accent-muted">{description}</p>
        <button
          onClick={onConfirm}
          className="bg-error text-card-default px-[24px] py-[6px] rounded-[20px] w-fit text-center align-middle text-[14px] leading-[20px] font-semibold
              hover:bg-button-hover transition-colors duration-200 cursor-pointer"
        >
          {confirmText}
        </button>
      </div>
    </ModalWrapper>
  );
}
