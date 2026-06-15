import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountLayoutClient from "@/components/AccountLayoutClient";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/islogin`, {
        headers: {
            Cookie: cookieHeader,
        },
        cache: "no-store",
    });

  const isLoggedIn = await res.json();
  if (isLoggedIn) {
    redirect("/login");
  }

  return <AccountLayoutClient>{children}</AccountLayoutClient>;
}
