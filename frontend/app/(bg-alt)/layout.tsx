export default function AltLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute inset-0 bg-[url('/images/homepage/bg.jpg')] bg-repeat-y bg-[length:100%_auto]" />
      <div className="relative z-10">{children}</div>
    </>
  );
}
