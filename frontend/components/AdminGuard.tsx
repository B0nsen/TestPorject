"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/isadmin`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) {
          setIsAdmin(false);
          return;
        }
        const data = await res.json();
        const result = typeof data === "boolean" ? data : data?.isAdmin;
        setIsAdmin(!!result);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      router.replace("/login");
    }
  }, [isAdmin, router]);

  if (isAdmin === null) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
