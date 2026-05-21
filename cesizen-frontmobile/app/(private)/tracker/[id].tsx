"use client";

import TrackerDetails from "@/components/Tracker/TrackerDetails/TrackerDetails";
import { useRapports } from "@/hooks/rapports/useRapports";
import { useTracker } from "@/hooks/trackers/useTracker";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function TrackerPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    tracker,
    loading: loadingTracker,
    error: errorTracker,
  } = useTracker(id);
  const {
    rapports,
    loading: loadingRapport,
    error: errorRapport,
  } = useRapports();

  if (loadingTracker || loadingRapport) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (errorTracker || errorRapport) {
    return (
      <View>
        <Text>Erreur : {errorTracker || errorRapport}</Text>
      </View>
    );
  }

  if (!tracker) {
    return (
      <View>
        <Text>Tracker introuvable</Text>
      </View>
    );
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
      <TrackerDetails tracker={tracker} rapports={rapports} />
    </ScrollView>
  );
}
