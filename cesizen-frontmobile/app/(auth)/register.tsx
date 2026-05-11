import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import AuthForm from "@/components/AuthForm/AuthForm";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const { registerUser, loading, error, data } = useRegister();
  const router = useRouter();

  const [message, setMessage] = useState("");

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await registerUser({
      email: formData.email,
      password: formData.password,
      nom: formData.nom,
      prenom: formData.prenom,
    });

    if (res) {
      setMessage("Compte créé avec succès !");

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}

      <AuthForm
        titreForm="Créer un compte"
        champs={["Prénom", "Nom", "Email", "Mot de passe"]}
        names={["prenom", "nom", "email", "password"]}
        buttonText={loading ? "Inscription..." : "S'inscrire"}
        placeholders={["Prénom", "Nom", "exemple@email.com", "••••••••"]}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
