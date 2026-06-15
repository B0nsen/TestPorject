"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API = `${API_BASE}/api/product`;

type ProductImage = {
    id: number;
    productId: number;
    imageUrl: string;
    isMain: boolean;
    fileName: string;
    sortOrder: number;
};

type Product = {
    id: number;
    name: string;
    price: number;
    sale?: number | null;
    description: string;
    available: boolean;
    warranty: string;
    maxQuantity: number;
    metadata: any;
    images: ProductImage[];
};

const getImageSrc = (imageUrl: string) => {
    if (!imageUrl) return "";

    if (imageUrl.startsWith("http")) {
        return imageUrl;
    }

    return `${API_BASE}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

const getMainImage = (images: ProductImage[] = []) => {
    const mainImage = images.find((image) => image.isMain);

    if (mainImage) {
        return mainImage;
    }

    return [...images].sort((a, b) => a.sortOrder - b.sortOrder)[0];
};

const formatMetadata = (metadata: any) => {
    const normalized = {
        attribute: metadata?.attribute ?? { "": "" },
        aboutItems: metadata?.aboutItems ?? [""],
    };

    return JSON.stringify(normalized, null, 2);
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadProducts = async () => {
            const res = await fetch(API);

            if (!res.ok) {
                console.error("Failed to load products:", res.status);
                return;
            }

            const data = await res.json();
            setProducts(data);
        };

        loadProducts();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if (!confirmed) return;

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete product:", res.status);
            return;
        }

        setProducts(products.filter((p) => p.id !== id));
    };

    const normalizedSearch = search.trim().toLowerCase();

    const filteredProducts = products.filter((p) =>
        [
            p.id,
            p.name,
            p.description,
            p.price,
            p.sale,
            p.warranty,
            p.maxQuantity,
            formatMetadata(p.metadata),
        ]
            .map((v) => String(v ?? "").toLowerCase())
            .some((v) => v.includes(normalizedSearch))
    );

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Products</h1>

                <button
                    style={styles.addBtn}
                    onClick={() => router.push("/admin/products/create")}
                >
                    + Add
                </button>
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, description, price, sale, warranty, quantity"
                style={styles.searchInput}
            />

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Photo</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Sale</th>
                            <th style={styles.th}>Available</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Metadata</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map((p) => {
                            const mainImage = getMainImage(p.images);
                            const imageSrc = mainImage ? getImageSrc(mainImage.imageUrl) : "";

                            return (
                                <tr key={p.id} style={styles.tr}>
                                    <td style={styles.td}>{p.id}</td>

                                    <td style={styles.td}>
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={mainImage.fileName || p.name}
                                                style={styles.image}
                                            />
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    <td style={styles.td}>{p.name}</td>
                                    <td style={styles.td}>{p.price}</td>
                                    <td style={styles.td}>{p.sale ?? "-"}</td>

                                    <td style={styles.td}>
                                        {p.available ? (
                                            <span style={styles.badge}>Yes</span>
                                        ) : (
                                            <span style={styles.badge1}>No</span>
                                        )}
                                    </td>

                                    <td style={styles.td}>{p.maxQuantity}</td>

                                    <td style={styles.td}>
                                        <pre style={styles.jsonPreview}>
                                            {formatMetadata(p.metadata)}
                                        </pre>
                                    </td>

                                    <td style={styles.td}>
                                        <button
                                            style={styles.editBtn}
                                            onClick={() => router.push(`/admin/products/${p.id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            style={styles.deleteBtn}
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
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
        minWidth: "1200px",
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
    image: {
        width: "52px",
        height: "52px",
        objectFit: "cover",
        borderRadius: "6px",
        border: "1px solid #eee",
    },
    badge: {
        background: "#d1fae5",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
    },
    badge1: {
        background: "#fa7575",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
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
    jsonPreview: {
        margin: 0,
        padding: "8px",
        background: "#f7f7f7",
        borderRadius: "6px",
        fontSize: "12px",
        whiteSpace: "pre-wrap",
        color: "black",
        maxHeight: "140px",
        overflow: "auto",
    },
};