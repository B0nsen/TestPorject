// "use client";
//
// import { useState } from "react";
// import { useRouter } from "next/navigation";
//
// const PRODUCT_API = "http://localhost:5012/api/product";
// const IMAGE_UPLOAD_API = "http://localhost:5012/api/productimage/upload";
//
// export default function CreateProductPage() {
//     const router = useRouter();
//
//     const [form, setForm] = useState({
//         name: "",
//         price: "",
//         sale: "",
//         description: "",
//         available: true,
//         warranty: "",
//         maxQuantity: "",
//         metadata: "{}",
//     });
//
//     const [files, setFiles] = useState<File[]>([]);
//
//     const handleChange = (e: any) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const uploadImages = async (productId: number) => {
//         if (files.length === 0) return;
//
//         const formData = new FormData();
//
//         files.forEach((file) => {
//             formData.append("files", file);
//         });
//
//         const res = await fetch(`${IMAGE_UPLOAD_API}/${productId}`, {
//             method: "POST",
//             body: formData,
//         });
//
//         if (!res.ok) {
//             console.error("Failed to upload product images:", res.status);
//         }
//     };
//
//     const handleCreate = async () => {
//         let metadata = {};
//
//         try {
//             metadata = JSON.parse(form.metadata || "{}");
//         } catch {
//             console.error("Metadata must be valid JSON");
//             return;
//         }
//
//         const res = await fetch(PRODUCT_API, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name: form.name,
//                 price: Number(form.price),
//                 sale: form.sale ? Number(form.sale) : null,
//                 description: form.description,
//                 available: form.available,
//                 warranty: form.warranty,
//                 maxQuantity: Number(form.maxQuantity),
//                 metadata,
//             }),
//         });
//
//         if (!res.ok) {
//             console.error("Failed to create product:", res.status);
//             return;
//         }
//
//         const product = await res.json();
//
//         await uploadImages(product.id);
//
//         router.push("/admin/products");
//     };
//
//     return (
//         <div style={styles.page}>
//             <div style={styles.card}>
//                 <h1 style={styles.title}>Добавить продукт</h1>
//
//                 <div style={styles.form}>
//                     <input name="name" value={form.name} onChange={handleChange} placeholder="Название" style={styles.input} />
//                     <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" style={styles.input} />
//                     <input name="sale" value={form.sale} onChange={handleChange} placeholder="Скидка" style={styles.input} />
//
//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         placeholder="Описание"
//                         style={styles.textarea}
//                     />
//
//                     <input name="warranty" value={form.warranty} onChange={handleChange} placeholder="Гарантия" style={styles.input} />
//                     <input name="maxQuantity" value={form.maxQuantity} onChange={handleChange} placeholder="Максимальное количество" style={styles.input} />
//
//                     <label style={styles.checkbox}>
//                         <input
//                             type="checkbox"
//                             checked={form.available}
//                             onChange={(e) =>
//                                 setForm({ ...form, available: e.target.checked })
//                             }
//                         />
//                         Доступен
//                     </label>
//
//                     <textarea
//                         name="metadata"
//                         value={form.metadata}
//                         onChange={handleChange}
//                         placeholder="Metadata JSON"
//                         style={styles.textarea}
//                     />
//
//                     <input
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={(e) => setFiles(Array.from(e.target.files || []))}
//                         style={styles.input}
//                     />
//
//                     {files.length > 0 && (
//                         <div style={styles.previewList}>
//                             {files.map((file, index) => (
//                                 <div key={index} style={styles.previewItem}>
//                                     <img
//                                         src={URL.createObjectURL(file)}
//                                         alt={file.name}
//                                         style={styles.previewImage}
//                                     />
//                                     <span>{file.name}</span>
//                                     {index === 0 && <span style={styles.badge}>Main</span>}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//
//                     <div style={styles.actions}>
//                         <button style={styles.saveBtn} onClick={handleCreate}>
//                             Добавить
//                         </button>
//
//                         <button
//                             style={styles.cancelBtn}
//                             onClick={() => router.push("/admin/products")}
//                         >
//                             Отмена
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PRODUCT_API = "http://localhost:5012/api/product/admin-add";
const CATEGORY_API = "http://localhost:5012/api/category";
const PRODUCT_IMAGE_API = "http://localhost:5012/api/productimage";

type Category = {
    id: number;
    name: string;
};

type Attribute = {
    key: string;
    value: string;
};

export default function CreateProductPage() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [mainFile, setMainFile] = useState<File | null>(null);     // ← Одна главная картинка
    const [additionalFiles, setAdditionalFiles] = useState<File[]>([]); // ← Дополнительные (по желанию)
    const [attributes, setAttributes] = useState<Attribute[]>([
    ]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        sale: "",
        description: "",
        available: true,
        warranty: "",
        maxQuantity: "",
        brand: "",
        quality: "New",
        aboutItems: "",
        catalogId: "",
    });

    useEffect(() => {
        const loadCategories = async () => {
            const res = await fetch(CATEGORY_API);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addAttribute = () => {
        setAttributes([...attributes, { key: "", value: "" }]);
    };

    const removeAttribute = (index: number) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const handleAttributeChange = (index: number, field: "key" | "value", value: string) => {
        const updated = [...attributes];
        updated[index][field] = value;
        setAttributes(updated);
    };


    const handleCreate = async () => {
        const attributeObject = attributes.reduce((acc, attr) => {
            if (attr.key.trim()) {
                acc[attr.key.trim()] = attr.value.trim();
            }
            return acc;
        }, {} as Record<string, string>);

        const metadata = {
            attribute: attributeObject,
            aboutItems: form.aboutItems
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
        };

        const productData = {
            name: form.name,
            price: Number(form.price),
            sale: form.sale ? Number(form.sale) : null,
            description: form.description,
            available: form.available,
            Brand: form.brand,
            Condition: form.quality,
            warranty: form.warranty,
            maxQuantity: Number(form.maxQuantity),
            metadata,
            catalogId: Number(form.catalogId),   // ← Отправляем категории вместе с продуктом
        };

        // Если есть главная картинка — добавляем её как file
        const formData = new FormData();
        formData.append("product", JSON.stringify(productData));

        if (mainFile) {
            formData.append("file", mainFile);   // ← Именно имя "file", как ты просил
        }
        console.log(productData);
        const res = await fetch(PRODUCT_API, {
            method: "POST",
            body: formData,   // Отправляем FormData (чтобы файл + JSON)
        });


        if (!res.ok) {
            console.error("Failed to create product:", res.status);
            return;
        }

        
        const product = await res.json();
        const productId = product.id ?? product.Id;

        if (!productId) {
            console.error("Product ID not returned");
            return;
        }

        // Загружаем дополнительные изображения (если есть)
        if (additionalFiles.length > 0) {
            for (let i = 0; i < additionalFiles.length; i++) {
                const imgFormData = new FormData();
                imgFormData.append("productId", String(productId));
                imgFormData.append("file", additionalFiles[i]);
                imgFormData.append("isMain", String(i === 0));
                imgFormData.append("sortOrder", String(i + 1));

                await fetch(PRODUCT_IMAGE_API, {
                    method: "POST",
                    body: imgFormData,
                });
            }
        }

        router.push("/admin/products");
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Добавить продукт</h1>

                <div style={styles.form}>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Название" style={styles.input} />

                    <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" style={styles.input} />
                    <input name="sale" value={form.sale} onChange={handleChange} placeholder="Скидка" style={styles.input} />

                    {/* Отдельные поля Brand и Condition */}
                    <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" style={styles.input} />

                    <select name="quality" value={form.quality} onChange={handleChange} style={styles.input}>
                        <option value="New">New</option>
                        <option value="Renewed">Renewed</option>
                        <option value="Used">Used</option>
                    </select>

                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" style={styles.textarea} />
                    <textarea name="aboutItems" value={form.aboutItems} onChange={handleChange} placeholder="About items (каждый пункт с новой строки)" style={styles.textarea} />
                    <div style={styles.section}>
                        <h3>Атрибуты (Key-Value)</h3>
                        {attributes.map((attr, index) => (
                            <div key={index} style={styles.attributeRow}>
                                <input
                                    value={attr.key}
                                    placeholder="Ключ (например: Color)"
                                    onChange={(e) => handleAttributeChange(index, "key", e.target.value)}
                                    style={styles.input}
                                />
                                <input
                                    value={attr.value}
                                    placeholder="Значение"
                                    onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                                    style={styles.input}
                                />
                                <button onClick={() => removeAttribute(index)} style={styles.removeBtn}>
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button onClick={addAttribute} style={styles.addBtn}>
                            + Добавить атрибут
                        </button>
                    </div>
                    <input name="warranty" value={form.warranty} onChange={handleChange} placeholder="Гарантия" style={styles.input} />
                    <input name="maxQuantity" value={form.maxQuantity} onChange={handleChange} placeholder="Максимальное количество" style={styles.input} />

                    {/* Баннер */}
                    <div>
                        <label style={{ color: "black", fontWeight: 500 }}>Баннер (file)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setMainFile(e.target.files?.[0] || null)}
                            style={styles.input}
                        />
                        {mainFile && (
                            <div style={styles.previewItem}>
                                <img src={URL.createObjectURL(mainFile)} alt="main" style={styles.previewImage} />
                                <span>{mainFile.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Картинки продукта */}
                    <div>
                        <label style={{ color: "black", fontWeight: 500 }}>Картинки продукта(первая будет главной)(file)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setAdditionalFiles(Array.from(e.target.files || []))}
                            style={styles.input}
                        />
                        {additionalFiles.length > 0 && (
                            <div style={styles.previewList}>
                                {additionalFiles.map((file, i) => (
                                    <div key={i} style={styles.previewItem}>
                                        <img src={URL.createObjectURL(file)} alt={file.name} style={styles.previewImage} />
                                        <span>{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Категории */}
                    <select
                        name="catalogId"
                        value={form.catalogId}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        />
                        Доступен
                    </label>

                    <div style={styles.actions}>
                        <button style={styles.saveBtn} onClick={handleCreate}>
                            Добавить
                        </button>
                        <button style={styles.cancelBtn} onClick={() => router.push("/admin/products")}>
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
        maxWidth: "700px",
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
        background: "#fff",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "90px",
        resize: "vertical",
        background: "#fff",
    },
    selectMultiple: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
        color: "black",
        minHeight: "110px",
        background: "#fff",
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

    section: {
        margin: "15px 0"
    },
    attributeRow: {
        display: "flex", gap: "8px", marginBottom: "8px"
    },
    addBtn: {
        background: "#0070f3",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
    },
    removeBtn: {
        background: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
    },
};