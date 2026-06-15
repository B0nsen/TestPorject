import DeleteIcon from "@/assets/icons/delete.svg?react";

type DeleteButtonProps = {
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: string;
};

export default function DeleteButton({
  onClick,
  width = 15,
  height = 17,
  className = "",
}: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center text-black w-fit h-fit
        ${className}
      `}
    >
      <DeleteIcon style={{ width, height }} />
    </button>
  );
}