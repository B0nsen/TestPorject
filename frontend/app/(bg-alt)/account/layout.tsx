import { cookies } from "next/headers";
import AccountLayoutClient from "@/components/AccountLayoutClient";

import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/islogin`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  );
  const loggedIn = await res.json();
  if (!loggedIn) {
    redirect("/login");
  }

  return <AccountLayoutClient>{children}</AccountLayoutClient>;
}