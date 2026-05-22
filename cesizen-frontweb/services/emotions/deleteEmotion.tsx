export default async function deleteEmotion(id: number | null): Promise<void> {
  const res = await fetch(`/api/emotions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}