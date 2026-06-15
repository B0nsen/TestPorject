function CheckCircle({
  checked,
  onClick,
  disabled,
  size = 28,
}: {
  checked?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
}) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{ width: size, height: size }}
      className={`
        rounded-full flex items-center justify-center shrink-0 transition p-[4px]
        ${
          disabled
            ? "bg-non-active cursor-not-allowed opacity-50"
            : "bg-main cursor-pointer"
        }
      `}
    >
      {checked && (
        <div className="size-full rounded-full bg-surface-accent" />
      )}
    </div>
  );
}

export default CheckCircle;