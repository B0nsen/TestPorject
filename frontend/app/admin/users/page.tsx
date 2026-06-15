"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:5012/api/user";

type User = {
    id: number;
    name: string;
    email: string;
    hashPassword: string;
    salt: string;
    country?: string;
    phone?: string;
    avatarUrl?: string;
    fileName?: string;
    dateOfBirth: string;
    roleId: number;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const [search, setSearch] = useState("");


    useEffect(() => {
        const loadUsers = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load users:", res.status);
                return;
            }

            const data = await res.json();
            setUsers(data);
        };

        loadUsers();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить пользователя?");

        if (!confirmed) return;

        await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        setUsers(users.filter((u) => u.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();
    const filteredUsers = users.filter((u) =>
        [u.id, u.name, u.email, u.phone, u.country, u.roleId]
            .map((v) => String(v ?? "").toLowerCase())
            .some((v) => v.includes(normalizedSearch))
    );
  

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Пользователи</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/users/create")}
                >
                    + Добавить
                </button>
            </div>


            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по имени, почте, телефону, стране, userId"
                style={styles.searchInput}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Имя</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Страна</th>
                        <th style={styles.th}>Телефон</th>
                        <th style={styles.th}>Дата рождения</th>
                        <th style={styles.th}>Role ID</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id} style={styles.tr}>
                            <td style={styles.td}>{u.id}</td>
                            <td style={styles.td}>{u.name}</td>
                            <td style={styles.td}>{u.email}</td>
                            <td style={styles.td}>{u.country || "-"}</td>
                            <td style={styles.td}>{u.phone || "-"}</td>
                            <td style={styles.td}>
                                {u.dateOfBirth ? u.dateOfBirth.slice(0, 10) : "-"}
                            </td>
                            <td style={styles.td}>{u.roleId}</td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => router.push(`/admin/users/${u.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => handleDelete(u.id)}
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
};
