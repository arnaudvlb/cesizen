import { apiFetch } from "../apiFetch";

export async function getLogout(): Promise<boolean> {
  try {
    const res = await apiFetch("/api/logout", {
      method: "POST",
    });

    return res.ok;
  } catch {
    return false;
  }
}
