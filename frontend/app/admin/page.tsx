"use client";

import { useRouter } from "next/navigation";

const adminSections = [
    { name: "Адреса", path: "/admin/addresses" },
    { name: "Пользователи", path: "/admin/users" },
    { name: "Товары", path: "/admin/products" },
    { name: "Категории", path: "/admin/categories" },
    { name: "Роли", path: "/admin/roles" },
    { name: "Отзывы", path: "/admin/reviews" },
    { name: "Кредитные карты", path: "/admin/cards" },
    { name: "Заказы", path: "/admin/orders" },
];



export default function AdminPage() {
    const router = useRouter();

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h1 style={styles.title}>Админ панель</h1>
                <p style={styles.subtitle}>Выберите категорию:</p>

                <div style={styles.grid}>
                    {adminSections.map((section) => (
                        <div
                            key={section.path}
                            style={styles.card}
                            onClick={() => router.push(section.path)}
                        >
                            {section.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f3f3f3",
    },
    container: {
        textAlign: "center",
        maxWidth: "900px",
        width: "100%",
        color: "black",
    },
    title: {
        fontSize: "36px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "black",
    },
    subtitle: {
        fontSize: "18px",
        marginBottom: "30px",
        color: "black",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
    },
    card: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        transition: "0.2s",
    },

  


};

