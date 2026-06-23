"use client";

import useSWR from "swr";
import { USER_KEY, fetcher } from "@/lib/api/user";
import AddressForm from "@/components/AddressForm";

export default function AccountAddresses() {
  const { data: userData } = useSWR(USER_KEY, fetcher);

  if (!userData) return <div>Loading...</div>;
  console.log(userData);
  
  const handleSubmit = async (data: any) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/address/info`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Saved data:", data);
  };

  return <AddressForm defaultValues={userData} onSubmit={handleSubmit} />;
}
