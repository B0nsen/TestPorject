"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API = "http://localhost:5012/api/role";

export default function EditRolePage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${API}/${id}`);

            if (!res.ok) {
                console.error("Failed to load role:", res.status);
                return;
            }

            const data = await res.json();
            setForm(data);
        };

        load();
    }, [id]);

    if (!form) {
        return <div style={styles.page}>Loading...</div>;
    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const res = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            console.error("Failed to update role:", res.status);
            return;
        }

        router.push("/admin/roles");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Редактировать роль</h1>

                <div style={styles.form}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Название"
                        style={styles.input}
                    />

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleSave}>
                            Сохранить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/roles")}
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
