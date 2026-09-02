import { Token } from "@/types/database/tokens";
import { apiFetch } from "../apiFetch";

type LoginData = {
  token: Token;
};

export default async function getLogin(
  email: string,
  password: string
): Promise<LoginData> {
  const res = await apiFetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginData = await res.json();

  return data;
}
