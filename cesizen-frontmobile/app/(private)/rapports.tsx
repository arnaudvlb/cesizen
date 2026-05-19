"use client";

import RapportCard from "@/components/RapportsCard/RapportCard";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useRapports } from "@/hooks/rapports/useRapports";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { ScrollView, Text } from "react-native";

export default function RapportsPage() {
  const { rapports, loading, error } = useRapports();
  const colors = useThemeColors();

  if (loading) {
    return <Text style={{ color: colors.text }}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={{ color: colors.text }}>{error}</Text>;
  }
  return (
    <ScrollView
      style={[globalStyles.page, { flex: 1 }]}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >
      <Text style={[globalStyles.pageTitle, { color: colors.text }]}>
        Mes rapports
      </Text>
      <RapportCard rapports={rapports} onDelete={"/rapports"} />
      <CreateButton url={"/rapport/new"} />
    </ScrollView>
  );
}
