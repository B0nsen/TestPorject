export async function createReview(data: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/create`,
    {
      method: "POST",
      credentials: "include",
      body: data,
    },
  );

  if (!response.ok) throw new Error("Failed to create review");

  return response.json();
}

export async function editReview(id: number, data: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/edit/${id}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    },
  );

  if (!response.ok) throw new Error("Failed to update review");

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function deleteReview(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Review/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) throw new Error("Failed to delete review");

  return true;
}
