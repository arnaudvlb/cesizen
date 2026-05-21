"use client";

import Form from "@/components/ui/Form/Form";
import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useCreateTracker } from "@/hooks/trackers/useCreateTracker";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function newTrackerPage() {
  const { createTracker, loading, error } = useCreateTracker();
  const router = useRouter();
  const colors = useThemeColors();

  const handleSubmit = async (formData: Record<string, string>) => {
    const res = await createTracker({
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      libelle: formData.libelle,
      description: formData.Description,
    });

    if (res) {
      setTimeout(() => {
        router.push("/trackers");
      });
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
        {error && <FormMessage message={error} />}
        <Form
          titreForm="Nouveau tracker"
          champs={["Date de début", "Date de fin", "Libellé"]}
          names={["dateDebut", "dateFin", "libelle"]}
          buttonText={loading ? "Création..." : "Créer le tracker"}
          placeHolders={["JJ/MM/YYYY", "JJ/MM/YYYY", "Libellé"]}
          textAreas={["Description"]}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </>
  );
}
