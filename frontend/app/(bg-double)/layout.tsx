export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div
                className="absolute inset-0 bg-repeat-y bg-[length:100%_auto] bg-[url('/images/homepage/bg-dark1.jpg')] md:bg-[url('/images/homepage/bg.png')] lg:bg-[url('/images/homepage/bg-dark1.png')]"
            />
            <div className="relative z-10">{children}</div>
        </>
    );
}