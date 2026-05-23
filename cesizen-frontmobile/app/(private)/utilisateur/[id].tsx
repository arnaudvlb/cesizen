"use client";

import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useThemeColors } from "@/hooks/useThemeColors";
import { usePatchUtilisateur } from "@/hooks/utilisateurs/usePatchUtilisateur";
import { useUtilisateur } from "@/hooks/utilisateurs/useUtilisateur";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function alterUtilisateur() {
  const [message, setMessage] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const { utilisateur } = useUtilisateur(id);
  const { patchUtilisateur, loading, error } = usePatchUtilisateur(id);
  const router = useRouter();
  const colors = useThemeColors();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await patchUtilisateur({
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password == "" ? null : formData.password,
    });

    if (res) {
      setTimeout(() => {
        setMessage("Modification réussie !");
        router.push("/");
      }, 1500);
    }
  };

  if (loading) {
    return (
      <View>
        <Text style={{ color: colors.text }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <>
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
          titreForm="Données utilisateur"
          champs={["Nom", "Prénom", "Adresse Email", "Nouveau mot de passe"]}
          names={["nom", "prenom", "email", "password"]}
          buttonText={loading ? "Mise à jour..." : "Mettre à jour les données"}
          placeHolders={["Nom", "Prénom", "nom.prenom@xyz.com", "••••••••"]}
          onSubmit={handleSubmit}
          defaultValues={{
            nom: utilisateur?.nom ?? "",
            prenom: utilisateur?.prenom ?? "",
            email: utilisateur?.email ?? "",
            password: "",
          }}
        />
      </ScrollView>
    </>
  );
}
