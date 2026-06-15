type InputButtonProps = {
  label: string;
  value?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export function InputButton({
  label,
  value,
  onClick,
  icon,
  className = "",
}: InputButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full h-[40px]
        bg-input-surface-default px-[15px]
        flex items-center justify-between
        rounded-[10px]
        ${className}
      `}
    >
      <span className="text-[14px] text-default">
        {value || label}
      </span>

      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
}