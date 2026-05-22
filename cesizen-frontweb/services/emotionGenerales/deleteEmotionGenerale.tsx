export default async function deleteEmotionGenerale(id: number | null): Promise<void> {
  const res = await fetch(`/api/emotion_generales/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}