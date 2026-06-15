const BASE_URL = "http://localhost:5012/api/cartitem";

export const cartApi = {
  getCart: async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        return null;
    }
    return res.json();
  },
  addToCart: async (id: number, quantity: number) => {
    const res = await fetch(`${BASE_URL}/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: id,
        Quantity: quantity,
      }),
    });

    return res.json();
  },

  increase: async (id: number) => {
    return fetch(`${BASE_URL}/add/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  decrease: async (id: number) => {
    return fetch(`${BASE_URL}/sub/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  remove: async (id: number) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
