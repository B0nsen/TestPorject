type UserReviewFieldProps = {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
};

export default function UserReviewField({
  label,
  optional = false,
  children,
}: UserReviewFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[20px] leading-[100%] text-accent-muted">
        {label}:{optional && <span className="text-non-active"> (optional)</span>}
      </label>

      {children}
    </div>
  );
}
