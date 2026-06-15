type FormErrorProps = {
  message?: string;
  className?: string;
};

export function FormError({ message, className = "" }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className={`mt-[10px] text-right text-error text-[13px] leading-[13px] ${className}`}>
      {message}
    </p>
  );
}