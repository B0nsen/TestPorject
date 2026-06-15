"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = "http://localhost:5012/api/role";

type Role = {
    id: number;
    name: string;
};

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const router = useRouter();
    const [search, setSearch] = useState("");


    useEffect(() => {
        const loadRoles = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load roles:", res.status);
                return;
            }

            const data = await res.json();
            setRoles(data);
        };

        loadRoles();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Вы уверены, что хотите удалить роль?");

        if (!confirmed) return;

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete role:", res.status);
            return;
        }

        setRoles(roles.filter((r) => r.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();

    
    const filteredRoles = roles.filter((r) =>
        [r.id, r.name]
            .map((v) => String(v ?? "").toLowerCase())
            .some((v) => v.includes(normalizedSearch))
    );


   

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Роли</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/roles/create")}
                >
                    + Добавить
                </button>
            </div>


            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по названию роли"
                style={styles.searchInput}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Название</th>
                        <th style={styles.th}>Действия</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredRoles.map((r) => (
                        <tr key={r.id} style={styles.tr}>
                            <td style={styles.td}>{r.id}</td>
                            <td style={styles.td}>{r.name}</td>

                            <td style={styles.td}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => router.push(`/admin/roles/${r.id}`)}
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
