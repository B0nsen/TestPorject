"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:5012/api/review";

type Review = {
    id: number;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    createdAt: string;
    userId: number;
    productId: number;
};

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const router = useRouter();
    const [search, setSearch] = useState("");


    useEffect(() => {
        const loadReviews = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load reviews:", res.status);
                return;
            }

            const data = await res.json();
            setReviews(data);
        };

        loadReviews();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить отзыв?");

        if (!confirmed) return;

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete review:", res.status);
            return;
        }

        setReviews(reviews.filter((r) => r.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();
    const filteredReviews = reviews.filter((r) =>
        [r.id, r.title, r.comment, r.rating, r.helpful, r.userId, r.productId]
            .map((v) => String(v ?? "").toLowerCase())
            .some((v) => v.includes(normalizedSearch))
    );

    

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Отзывы</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/reviews/create")}
                >
                    + Добавить
                </button>
            </div>


            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию, комментарию, рейтингу, пользователю"
                style={styles.searchInput}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Rating</th>
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Comment</th>
                        <th style={styles.th}>Helpful</th>
                        <th style={styles.th}>User ID</th>
                        <th style={styles.th}>Product ID</th>
                        <th style={styles.th}>Дата</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredReviews.map((r) => (
                        <tr key={r.id} style={styles.tr}>
                            <td style={styles.td}>{r.id}</td>
                            <td style={styles.td}>{r.rating}</td>
                            <td style={styles.td}>{r.title}</td>
                            <td style={styles.td}>{r.comment}</td>
                            <td style={styles.td}>{r.helpful}</td>
                            <td style={styles.td}>{r.userId}</td>
                            <td style={styles.td}>{r.productId}</td>
                            <td style={styles.td}>
                                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-"}
                            </td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => router.push(`/admin/reviews/${r.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(r.id)}
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
    tableContainer: {
        background: "#fff",
        borderRadius: "10px",
        overflow: "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        color: "black",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
        minWidth: "1100px",
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

};
