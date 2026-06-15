import { ADMIN_ENDPOINTS } from "./endpoints";

/* ================= GET ================= */

export const adminApi = {
    getAddresses: async () => {
        const res = await fetch(ADMIN_ENDPOINTS.ADDRESSES, {
            credentials: "include",
        });
        return res.json();
    },

    getAddressById: async (id: number) => {
        const res = await fetch(ADMIN_ENDPOINTS.ADDRESS_BY_ID(id), {
            credentials: "include",
        });
        return res.json();
    },

    /* ================= CREATE ================= */

    createAddress: async (data: any) => {
        const res = await fetch(ADMIN_ENDPOINTS.ADDRESSES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });

        return res.json();
    },

    /* ================= UPDATE ================= */

    updateAddress: async (id: number, data: any) => {
        const res = await fetch(ADMIN_ENDPOINTS.ADDRESS_BY_ID(id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });

        return res.json();
    },

    /* ================= DELETE ================= */

    deleteAddress: async (id: number) => {
        await fetch(ADMIN_ENDPOINTS.ADDRESS_BY_ID(id), {
            method: "DELETE",
            credentials: "include",
        });
    },
};