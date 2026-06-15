"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ORDER_API = "http://localhost:5012/api/order";
const ORDER_ITEM_API = "http://localhost:5012/api/orderitem";

type OrderItemForm = {
    productId: string;
    quantity: string;
};

export default function CreateOrderPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        orderDate: new Date().toISOString().slice(0, 10),
    });

    const [items, setItems] = useState<OrderItemForm[]>([
        { productId: "", quantity: "1" },
    ]);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleItemChange = (index: number, field: keyof OrderItemForm, value: string) => {
        setItems(
            items.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const addItem = () => {
        setItems([...items, { productId: "", quantity: "1" }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleCreate = async () => {
        const orderRes = await fetch(ORDER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderDate: form.orderDate,
            }),
        });

        if (!orderRes.ok) {
            console.error("Failed to create order:", orderRes.status);
            return;
        }

        const order = await orderRes.json();

        const itemsToCreate = items.filter(
            (item) => item.productId.trim() && item.quantity.trim()
        );

        for (const item of itemsToCreate) {
            const itemRes = await fetch(ORDER_ITEM_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: order.id,
                    productId: Number(item.productId),
                    quantity: Number(item.quantity),
                }),
            });

            if (!itemRes.ok) {
                console.error("Failed to create order item:", itemRes.status);
                return;
            }
        }

        router.push("/admin/orders");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить заказ</h1>

                <div style={styles.form}>
                    <input
                        name="orderDate"
                        type="date"
                        value={form.orderDate}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <h2 style={styles.subtitle}>Товары заказа</h2>

                    {items.map((item, index) => (
                        <div key={index} style={styles.itemRow}>
                            <input
                                value={item.productId}
                                onChange={(e) =>
                                    handleItemChange(index, "productId", e.target.value)
                                }
                                placeholder="Product ID"
                                style={styles.input}
                            />

                            <input
                                value={item.quantity}
                                onChange={(e) =>
                                    handleItemChange(index, "quantity", e.target.value)
                                }
                                placeholder="Количество"
                                style={styles.input}
                            />

                            <button
                                style={styles.removeBtn}
                                onClick={() => removeItem(index)}
                                type="button"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}

                    <button style={styles.addItemBtn} onClick={addItem} type="button">
                        + Добавить товар
                    </button>

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/orders")}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
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
    card: {
        maxWidth: "700px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
    title: {
        fontSize: "22px",
        fontWeight: 600,
        marginBottom: "20px",
        color: "black",
    },
    subtitle: {
        fontSize: "18px",
        fontWeight: 600,
        marginTop: "10px",
        marginBottom: "4px",
        color: "black",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        width: "100%",
    },
    itemRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: "10px",
        alignItems: "center",
    },
    addItemBtn: {
        background: "#fff",
        border: "1px solid #ff9900",
        color: "black",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        alignSelf: "flex-start",
    },
    removeBtn: {
        background: "#fff",
        border: "1px solid #ff4d4f",
        color: "#ff4d4f",
        padding: "10px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    actions: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
    },
    saveBtn: {
        background: "#ff9900",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    cancelBtn: {
        background: "#eee",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        color: "black",
    },
};
