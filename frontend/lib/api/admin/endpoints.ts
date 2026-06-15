import { API_BASE_URL } from "../api";

export const ADMIN_ENDPOINTS = {
    // Addresses
    ADDRESSES: `${API_BASE_URL}/admin/addresses`,
    ADDRESS_BY_ID: (id: number) =>
        `${API_BASE_URL}/admin/addresses/${id}`,

    // Users
    USERS: `${API_BASE_URL}/admin/users`,
    USER_BY_ID: (id: number) =>
        `${API_BASE_URL}/admin/users/${id}`,

    // Products
    PRODUCTS: `${API_BASE_URL}/admin/products`,
    PRODUCT_BY_ID: (id: number) =>
        `${API_BASE_URL}/admin/products/${id}`,
};