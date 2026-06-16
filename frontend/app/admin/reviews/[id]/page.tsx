"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api/review`;

export default function EditReviewPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${API}/${id}`);

            if (!res.ok) {
                console.error("Failed to load review:", res.status);
                return;
            }

            const data = await res.json();

            setForm({
                ...data,
                rating: String(data.rating ?? ""),
                productId: String(data.productId ?? ""),
                createdAt: data.createdAt ? data.createdAt.slice(0, 10) : "",
            });
        };

        load();
    }, [id]);

    if (!form) {
        return <div style={styles.page}>Loading...</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const res = await fetch(`${API}/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: String(form.title),
                review: String(form.comment),
                rating: Number(form.rating),
                helpful: Number(form.helpful),
                productId: Number(form.productId),
            }),
        });

        if (!res.ok) {
            console.error("Failed to update review:", res.status);
            return;
        }

        router.push("/admin/reviews");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Edit Review</h1>

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
                        name="createdAt"
                        type="date"
                        value={form.createdAt}
                        onChange={handleChange}
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
                        <button style={styles.saveBtn} onClick={handleSave}>
                            Save
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/reviews")}
                        >
                            Cancel
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
