"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const PRODUCT_API = "http://localhost:5012/api/product";
const IMAGE_UPLOAD_API = "http://localhost:5012/api/productimage/upload";

type ProductImage = {
    id: number;
    productId: number;
    imageUrl: string;
    isMain: boolean;
    fileName: string;
    sortOrder: number;
};

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState<any>(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`${PRODUCT_API}/${id}`);

            if (!res.ok) {
                console.error("Failed to load product:", res.status);
                return;
            }

            const data = await res.json();

            setForm({
                ...data,
                price: String(data.price ?? ""),
                sale: data.sale === null || data.sale === undefined ? "" : String(data.sale),
                maxQuantity: String(data.maxQuantity ?? ""),
                metadata: JSON.stringify(data.metadata || {}, null, 2),
                images: data.images || [],
            });
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

    const uploadImages = async () => {
        if (files.length === 0) return;

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        const res = await fetch(`${IMAGE_UPLOAD_API}/${id}`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            console.error("Failed to upload product images:", res.status);
        }
    };

    const handleSave = async () => {
        let metadata = {};

        try {
            metadata = JSON.parse(form.metadata || "{}");
        } catch {
            console.error("Metadata must be valid JSON");
            return;
        }

        const res = await fetch(`${PRODUCT_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...form,
                price: Number(form.price),
                sale: form.sale ? Number(form.sale) : null,
                maxQuantity: Number(form.maxQuantity),
                metadata,
            }),
        });

        if (!res.ok) {
            console.error("Failed to update product:", res.status);
            return;
        }

        await uploadImages();

        router.push("/admin/products");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Редактировать продукт</h1>

                <div style={styles.form}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Название" style={styles.input} />
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" style={styles.input} />
                    <input name="sale" value={form.sale} onChange={handleChange} placeholder="Скидка" style={styles.input} />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Описание"
                        style={styles.textarea}
                    />

                    <input name="warranty" value={form.warranty} onChange={handleChange} placeholder="Гарантия" style={styles.input} />
                    <input name="maxQuantity" value={form.maxQuantity} onChange={handleChange} placeholder="Максимальное количество" style={styles.input} />

                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) =>
                                setForm({ ...form, available: e.target.checked })
                            }
                        />
                        Доступен
                    </label>

                    <textarea
                        name="metadata"
                        value={form.metadata}
                        onChange={handleChange}
                        placeholder="Metadata JSON"
                        style={styles.textarea}
                    />

                    {form.images?.length > 0 && (
                        <div style={styles.previewList}>
                            {form.images.map((image: ProductImage) => (
                                <div key={image.id} style={styles.previewItem}>
                                    <img
                                        src={image.imageUrl}
                                        alt={image.fileName}
                                        style={styles.previewImage}
                                    />
                                    <span>{image.fileName}</span>
                                    {image.isMain && <span style={styles.badge}>Main</span>}
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                        style={styles.input}
                    />

                    {files.length > 0 && (
                        <div style={styles.previewList}>
                            {files.map((file, index) => (
                                <div key={index} style={styles.previewItem}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        style={styles.previewImage}
                                    />
                                    <span>{file.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleSave}>
                            Сохранить
                        </button>

                        <button
                            style={styles.cancelBtn}
                            onClick={() => router.push("/admin/products")}
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
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "90px",
        resize: "vertical",
    },
    checkbox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "10px",
        color: "black",
    },
    previewList: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        color: "black",
    },
    previewItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "13px",
    },
    previewImage: {
        width: "52px",
        height: "52px",
        objectFit: "cover",
        borderRadius: "6px",
    },
    badge: {
        background: "#d1fae5",
        color: "#065f46",
        padding: "3px 8px",
        borderRadius: "6px",
        fontSize: "12px",
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
