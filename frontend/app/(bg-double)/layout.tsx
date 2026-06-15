export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div 
        className="absolute inset-0 bg-repeat-y bg-[length:100%_auto] bg-[url('/images/homepage/bg-stars-dark.jpg')] md:bg-[url('/images/homepage/bg.jpg')] lg:bg-[url('/images/homepage/bg-stars-dark.jpg')]" 
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}