import FormButton from "@/components/FormButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
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

async function getOrder(orderId: string): Promise<Order | null> {
  const res = await fetch(`${API}/${orderId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrder(orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  const total = (order.items || []).reduce(
    (sum, item) => sum + (item.productPrice || 0) * item.quantity,
    0,
  );
  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-section-title">Order details</h3>

      <div className="flex flex-col gap-[10px]">
        <InfoRow
          label="Order date"
          value={new Date(order.orderDate).toLocaleDateString()}
        />
        <InfoRow label="Order number" value={`#${order.id}`} />
        <InfoRow label="Order total" value={`$${total.toFixed(2)}`} />
      </div>

      <h3 className="text-section-title">Shipment</h3>

      <div className="flex flex-col gap-[10px]">
        {(order.items || []).map((item) => (
          <div
            key={item.id}
            className="bg-non-active rounded-[10px] flex p-[10px] gap-[8px] max-w-[615px] "
          >
            <div className="size-[105px] rounded-[10px] shrink-0 bg-white relative overflow-hidden">
              {item.productImageUrl ? (
                <img
                  src={getImageSrc(item.productImageUrl)}
                  alt={item.productName || "Order item"}
                  className="w-full h-full object-contain object-center p-1"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-between flex-1 gap-[20px]">
              <span className="font-normal text-[16px] leading-[28px]">
                {item.productName || `Product #${item.productId}`} x
                {item.quantity}
              </span>

              <span className="flex items-center gap-[2px] self-end">
                <span className="font-normal text-[27.9px] leading-[100%]">
                  {((item.productPrice || 0) * item.quantity).toFixed(2)}
                </span>
                <span className="font-normal text-[16px]">$</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <FormButton type="button" className="!px-[10px]">
        Contact Seller
      </FormButton>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-[10px]">
      <span className="min-w-[125px] text-text-main-muted">{label}</span>
      <span className="text-text-main">{value}</span>
    </div>
  );
}
