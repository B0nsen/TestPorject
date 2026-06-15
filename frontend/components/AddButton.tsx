import AddIcon from "@/assets/icons/add.svg?react";

type AddButtonProps = {
  onClick?: () => void;
};

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-surface-accent w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center"
    >
      <AddIcon className="w-4 h-4" />
    </button>
  );
}