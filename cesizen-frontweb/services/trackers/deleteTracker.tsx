export default async function deleteTracker(id: number | null): Promise<void> {
  const res = await fetch(`/api/trackers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }
}