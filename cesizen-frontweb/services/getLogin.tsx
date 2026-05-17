import { Token } from "@/types/database/tokens";

type LoginData = {
  token: Token;
};

export default async function getLogin(
  email: string,
  password: string
): Promise<LoginData> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Email ou mot de passe incorrect");
    }
    throw new Error(`Erreur API: ${res.status}`);
  }

  const data: LoginData = await res.json();

  return data;
}
