"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:5012";
const API = `${API_BASE}/api/order`;

type OrderItem = {
  id: number;
  productId: number;
  quantity: number;
  productName?: string;
  productPrice?: number;
  productImageUrl?: string;
};

type Order = {
  id: number;
  orderDate: string;
  items: OrderItem[];
};

const getImageSrc = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function AccountOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    if (!normalizedSearch) return true;

    const itemsText = (order.items || [])
      .map((item) =>
        [
          item.productId,
          item.quantity,
          item.productName,
          item.productPrice,
        ].join(" "),
      )
      .join(" ");

    return [order.id, order.orderDate, itemsText]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(normalizedSearch));
  });

  const visibleCards = filteredOrders.slice(0, visibleCount);

  if (!orders.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-[26px]">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your orders"
        className="h-[44px] rounded-[10px] bg-white px-[14px] text-default outline-none"
      />

      <div className="grid gap-[26px] grid-cols-[repeat(auto-fill,minmax(180px,1fr))] xl:grid-cols-4">
        {visibleCards.map((order) => {
          const firstItem = order.items?.[0];
          const total = (order.items || []).reduce(
            (sum, item) => sum + (item.productPrice || 0) * item.quantity,
            0,
          );

          return (
            <div
              key={order.id}
              onClick={() => router.push(`/account/orders/${order.id}`)}
              className="cursor-pointer w-full bg-white rounded-[10px] overflow-hidden flex flex-col"
            >
              <div className="aspect-[241/204] w-full relative bg-gray-300 overflow-hidden">
                {firstItem?.productImageUrl ? (
                  <img
                    src={getImageSrc(firstItem.productImageUrl)}
                    alt={firstItem.productName || "Order item"}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <div className="p-[10px] flex flex-col gap-[6px] text-default">
                <p className="text-[14px] leading-[20px] line-clamp-2">
                  Order #{order.id}
                </p>
                <p className="text-[13px] text-text-main-muted">
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-[13px] text-text-main-muted">
                  {order.items?.length || 0} items
                </p>
                <p className="flex items-start font-sans">
                  <span className="text-[28px] leading-[100%] font-normal">
                    ${total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredOrders.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 4)}
          className="self-center cursor-pointer font-medium text-[14px] leading-[20px] w-[106px] h-[28px] rounded-[25px] border flex items-center justify-center"
        >
          See more
        </button>
      )}
    </div>
  );
}
