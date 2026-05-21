import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useRegister } from "@/hooks/auth/useRegister";
import { globalStyles } from "@/styles/globals";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";

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
    <ScrollView
      style={[globalStyles.page, { flex: 1 }]}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >
      {(message || error) && (
        <FormMessage message={message || error || ""} error={!!error} />
      )}

      <Form
        titreForm="Créer un compte"
        champs={["Prénom", "Nom", "Email", "Mot de passe"]}
        names={["prenom", "nom", "email", "password"]}
        buttonText={loading ? "Inscription..." : "S'inscrire"}
        placeHolders={["Prénom", "Nom", "exemple@email.com", "••••••••"]}
        onSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
