export default function CheckoutLayout({
  title,
  header,
  children,
  sidebar,
  // className = "bg-page-default ", 
  className = "bg-transparent",
}: {
  title: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string; 
}) {
  return (

    <main className={`w-full flex justify-center flex-col items-center py-[100px] ${className}`}>
      <div className="w-full max-w-[1528px] flex flex-col gap-[28px] px-[21px] layout-account-sm:px-[54px]">
        
        <h1 className="text-[24px] font-semibold">{title}</h1>
        {header && <div>{header}</div>}

        <div className="w-full flex flex-col layout-account-sm:flex-row gap-[40px] justify-between">
          <div className="layout-account-sm:w-[970px] w-full flex flex-col gap-[22px]">
            {children}
          </div>

          <aside className="w-full layout-account-sm:w-[373px]">
            {sidebar}
          </aside>
        </div>
      </div>
    </main>
  );
}