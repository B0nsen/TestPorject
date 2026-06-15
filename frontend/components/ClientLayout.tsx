"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopBtn from "./BackToTopBtn";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuHeight, setMenuHeight] = useState(0);
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <Header setMenuHeight={setMenuHeight} />

      <main
        className="flex-1 w-full"
        style={{ minHeight: menuHeight ? `${menuHeight}px` : undefined }}
      >
        {children}
      </main>

      <div className="w-full header-padding flex justify-end pb-4">
        <BackToTopBtn />
      </div>

      <Footer />
    </div>
  );
}
