"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5012/api/review";

export default function CreateReviewPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        rating: "",
        title: "",
        comment: "",
        helpful: "0",
        createdAt: new Date().toISOString().slice(0, 10),
        userId: "",
        productId: "",
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
                rating: Number(form.rating),
                title: form.title,
                comment: form.comment,
                helpful: Number(form.helpful),
                createdAt: form.createdAt,
                userId: Number(form.userId),
                productId: Number(form.productId),
            }),
        });

        if (!res.ok) {
            console.error("Failed to create review:", res.status);
            return;
        }

        router.push("/admin/reviews");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить отзыв</h1>

                <div style={styles.form}>
                    <input
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        style={styles.input}
                    />

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title"
                        style={styles.input}
                    />

                    <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Comment"
                        style={styles.textarea}
                    />

                    <input
                        name="helpful"
                        value={form.helpful}
                        onChange={handleChange}
                        placeholder="Helpful"
                        style={styles.input}
                    />

                    <input
                        name="createdAt"
                        type="date"
                        value={form.createdAt}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="User ID"
                        style={styles.input}
                    />

                    <input
                        name="productId"
                        value={form.productId}
                        onChange={handleChange}
                        placeholder="Product ID"
                        style={styles.input}
                    />

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/reviews")}
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
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "90px",
        resize: "vertical",
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
