"use client";

import { TrackersCard } from "@/components/TrackersCard/TrackersCard";
import CreateButton from "@/components/ui/CreateButton/CreateButton";
import { useTrackers } from "@/hooks/trackers/useTrackers";
import { useThemeColors } from "@/hooks/useThemeColors";
import { globalStyles } from "@/styles/globals";
import { ScrollView, Text } from "react-native";

export default function TrackersPage() {
  const { trackers, loading, error } = useTrackers();
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
        Mes trackers
      </Text>
      <TrackersCard trackers={trackers} onDelete={"/trackers"} />
      <CreateButton url={"/tracker/new"} />
    </ScrollView>
  );
}
