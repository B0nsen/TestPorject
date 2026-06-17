export const USER_KEY = `${process.env.NEXT_PUBLIC_API_URL}/api/user/account/`;

export const fetcher = async (url: string) => {
    const res = await fetch(url, { credentials: 'include' });

    if (!res.ok || res.status === 204) return null;

    const data = await res.json();
    return data.result ?? data;
}

export const userApi = {
  deleteAccount: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/account`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }

    return response.json().catch(() => null);
  },

  logout: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    return response.json().catch(() => null);
  },
};