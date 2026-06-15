"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:5012/api/creditcard";

type CreditCard = {
    id: number;
    cardNumber: string;
    holderName: string;
    expiry: string;
    cvv: number;
    userId: number;
};

export default function CreditCardsPage() {
    const [cards, setCards] = useState<CreditCard[]>([]);
    const router = useRouter();
    const [search, setSearch] = useState("");


    useEffect(() => {
        const loadCards = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load credit cards:", res.status);
                return;
            }

            const data = await res.json();
            setCards(data);
        };

        loadCards();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить карту?");

        if (!confirmed) return;

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete credit card:", res.status);
            return;
        }

        setCards(cards.filter((c) => c.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();

    const filteredCards = cards.filter((c) => {
        return [
            c.id,
            c.cardNumber,
            c.holderName,
            c.expiry,
            c.cvv,
            c.userId,
        ]
            .map((value) => String(value ?? "").toLowerCase())
            .some((value) => value.includes(normalizedSearch));
    });

   


    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Карты</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/cards/create")}
                >
                    + Добавить
                </button>
            </div>


            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по номеру карты, владельцу или User ID"
                style={styles.searchInput}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Номер карты</th>
                        <th style={styles.th}>Владелец</th>
                        <th style={styles.th}>Срок</th>
                        <th style={styles.th}>CVV</th>
                        <th style={styles.th}>User ID</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredCards.map((c) => (

                        <tr key={c.id} style={styles.tr}>
                            <td style={styles.td}>{c.id}</td>
                            <td style={styles.td}>{c.cardNumber}</td>
                            <td style={styles.td}>{c.holderName}</td>
                            <td style={styles.td}>
                                {c.expiry ? c.expiry.slice(0, 10) : "-"}
                            </td>
                            <td style={styles.td}>{c.cvv}</td>
                            <td style={styles.td}>{c.userId}</td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => router.push(`/admin/cards/${c.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(c.id)}
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
