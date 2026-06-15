"use client";
import { useEffect, useState } from "react";

export function useIsAbove(width: number) {
  const [isAbove, setIsAbove] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsAbove(window.innerWidth >= width);

    check(); 
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [width]);

  return isAbove;
}