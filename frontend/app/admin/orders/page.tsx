"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:5012/api/order";

type OrderItem = {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    product?: {
        id: number;
        name: string;
        price: number;
    };
};

type Order = {
    id: number;
    orderDate: string;
    items: OrderItem[];
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadOrders = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load orders:", res.status);
                return;
            }

            const data = await res.json();
            setOrders(data);
        };

        loadOrders();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить заказ?");

        if (!confirmed) return;

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete order:", res.status);
            return;
        }

        setOrders(orders.filter((o) => o.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();

    const filteredOrders = orders.filter((o) => {
        const itemsText = (o.items || [])
            .map((item) =>
                [
                    item.id,
                    item.productId,
                    item.quantity,
                    item.product?.name,
                ].join(" ")
            )
            .join(" ");

        return [o.id, o.orderDate, itemsText]
            .map((v) => String(v ?? "").toLowerCase())
            .some((v) => v.includes(normalizedSearch));
    });

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Заказы</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/orders/create")}
                >
                    + Добавить
                </button>
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по ID заказа, дате, Product ID или товару"
                style={styles.searchInput}
            />

            <div style={styles.resultInfo}>
                Найдено: {filteredOrders.length} из {orders.length}
            </div>


            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Дата заказа</th>
                        <th style={styles.th}>Товары</th>
                        <th style={styles.th}>Кол-во позиций</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredOrders.map((o) => (
                        <tr key={o.id} style={styles.tr}>
                            <td style={styles.td}>{o.id}</td>

                            <td style={styles.td}>
                                {o.orderDate ? new Date(o.orderDate).toLocaleDateString() : "-"}
                            </td>

                            <td style={styles.td}>
                                {o.items?.length ? (
                                    <div style={styles.itemsList}>
                                        {o.items.map((item) => (
                                            <div key={item.id} style={styles.itemLine}>
                                                <span>
                                                    {item.product?.name || `Product ID: ${item.productId}`}
                                                </span>
                                                <span style={styles.badge}>x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td style={styles.td}>{o.items?.length || 0}</td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => router.push(`/admin/orders/${o.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(o.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles: any = {
    page: {
        padding: "40px",
        background: "#f5f6fa",
        minHeight: "100vh",
        fontFamily: "Arial",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    },
    title: {
        fontSize: "26px",
        fontWeight: 600,
        color: "black",
    },
    addBtn: {
        background: "#ff9900",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    searchInput: {
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        background: "#fff",
    },
    tableContainer: {
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        color: "black",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
    },
    th: {
        textAlign: "left",
        padding: "12px",
        background: "#fafafa",
        borderBottom: "1px solid #eee",
        fontWeight: 600,
        fontSize: "14px",
        color: "black",
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #f0f0f0",
        fontSize: "14px",
        verticalAlign: "middle",
        wordBreak: "break-word",
    },
    tr: {
        transition: "0.2s",
    },
    itemsList: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    itemLine: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    badge: {
        background: "#d1fae5",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
    },
    editBtn: {
        marginRight: "8px",
        padding: "6px 10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        cursor: "pointer",
        background: "#fff",
        color: "black",
    },
    deleteBtn: {
        padding: "6px 10px",
        borderRadius: "5px",
        border: "1px solid #ff4d4f",
        color: "#ff4d4f",
        cursor: "pointer",
        background: "#fff",
    },

    resultInfo: {
        marginBottom: "12px",
        color: "black",
        fontSize: "14px",
    },

};
