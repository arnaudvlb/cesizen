import { useThemeColors } from "@/hooks/useThemeColors";
import { useTrackerChart } from "@/hooks/useTrackerChart";
import { TrackerDetailsProps } from "@/types/components/Tracker/TrackerDetailsProps";
import { Text, View } from "react-native";
import TrackerChart from "../TrackerChart/TrackerChart";
import TrackerRecap from "../TrackerRecap/TrackerRecap";
import { styles } from "./TrackerDetails.styles";

export default function TrackerDetails({
  tracker,
  rapports,
}: TrackerDetailsProps) {
  const chart = useTrackerChart(tracker, rapports);
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          {tracker.libelle}
        </Text>

        <Text style={[styles.dates, { color: colors.text + "80" }]}>
          {new Date(tracker.dateDebut).toLocaleDateString("fr-FR")} →{" "}
          {new Date(tracker.dateFin).toLocaleDateString("fr-FR")}
        </Text>

        {tracker.description && (
          <Text style={[styles.description, { color: colors.text }]}>
            {tracker.description}
          </Text>
        )}
      </View>

      <View style={styles.chartSection}>
        <TrackerChart data={chart.chartData} />
      </View>

      <View style={styles.recapSection}>
        <TrackerRecap recap={chart.recap} />
      </View>

      <Text style={[styles.summary, { color: colors.text }]}>
        {chart.summary}
      </Text>
    </View>
  );
}
