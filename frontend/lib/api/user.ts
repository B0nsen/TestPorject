export const USER_KEY = `${process.env.NEXT_PUBLIC_API_URL}/api/user/account/`;

export const fetcher = async (url: string) => {
    const res = await fetch(url, { credentials: 'include' });

    if (!res.ok || res.status === 204) return null;

    const data = await res.json();
    return data.result ?? data;
}