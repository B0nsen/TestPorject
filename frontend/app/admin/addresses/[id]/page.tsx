"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API = "http://localhost:5012/api/address";

export default function EditAddressPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${API}/${id}`);
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
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        router.push("/admin/addresses");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Редактировать адрес</h1>

                <div style={styles.form}>
                    <input
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Страна"
                        style={styles.input}
                    />

                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Город"
                        style={styles.input}
                    />

                    <input
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        placeholder="Улица"
                        style={styles.input}
                    />

                    <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="Индекс"
                        style={styles.input}
                    />

                    <input
                        name="houseNumber"
                        value={form.houseNumber}
                        onChange={handleChange}
                        placeholder="Дом"
                        style={styles.input}
                    />

                    <input
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        placeholder="User ID"
                        style={styles.input}
                    />

                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={form.isDefault}
                            onChange={(e) =>
                                setForm({ ...form, isDefault: e.target.checked })
                            }
                        />
                        По умолчанию
                    </label>

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleSave}>
                            Сохранить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/addresses")}
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
    },

    checkbox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
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
    },
};