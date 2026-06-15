"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5012/api/category";

export default function CreateCategoryPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
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
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            console.error("Failed to create category:", res.status);
            return;
        }

        router.push("/admin/categories");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить категорию</h1>

                <div style={styles.form}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Название"
                        style={styles.input}
                    />

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/categories")}
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
