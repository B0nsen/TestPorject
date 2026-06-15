"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5012/api/creditcard";

export default function CreateCreditCardPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        cardNumber: "",
        holderName: "",
        expiry: "",
        cvv: "",
        userId: "",
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreate = async () => {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cardNumber: form.cardNumber,
                holderName: form.holderName,
                expiry: form.expiry,
                cvv: Number(form.cvv),
                userId: Number(form.userId),
            }),
        });

        if (!res.ok) {
            console.error("Failed to create credit card:", res.status);
            return;
        }

        router.push("/admin/cards");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить карту</h1>

                <div style={styles.form}>
                    <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="Номер карты"
                        style={styles.input}
                    />

                    <input
                        name="holderName"
                        value={form.holderName}
                        onChange={handleChange}
                        placeholder="Имя владельца"
                        style={styles.input}
                    />

                    <input
                        name="expiry"
                        type="date"
                        value={form.expiry}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="cvv"
                        value={form.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        style={styles.input}
                    />

                    <input
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="User ID"
                        style={styles.input}
                    />

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/cards")}
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
        maxWidth: "600px",
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
