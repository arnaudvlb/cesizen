import { styles } from "@/components/TrackersCard/TrackersCard.styles";
import { useDeleteTracker } from "@/hooks/trackers/useDeleteRapport";
import { useThemeColors } from "@/hooks/useThemeColors";
import { TrackersCardProps } from "@/types/components/TrackersCardProps";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import DeleteButton from "../ui/DeleteButton/DeleteButton";
import EditButton from "../ui/EditButton/EditButton";

function truncate(text: string, max: number) {
  return text?.length > max ? text.slice(0, max) + "..." : text;
}

export function TrackersCard({ trackers, onDelete }: TrackersCardProps) {
  const { deleteTracker } = useDeleteTracker(0);
  const colors = useThemeColors();

  return (
    <View style={styles.grid}>
      {trackers.map((tracker) => (
        <View
          key={tracker.id}
          style={[
            styles.card,
            { borderColor: colors.border, backgroundColor: colors.bg },
          ]}
        >
          <View style={[styles.accent, { backgroundColor: colors.primary }]} />

          <Link
            href={{
              pathname: "/tracker/[id]",
              params: { id: tracker.id },
            }}
          >
            <View style={styles.content}>
              <Text style={[styles.title, { color: colors.text }]}>
                {tracker.libelle}
              </Text>

              <View style={styles.meta}>
                <Text style={[styles.metaText, { color: colors.text }]}>
                  {new Date(tracker.dateDebut).toLocaleDateString("fr-FR")}
                </Text>

                <View style={[styles.dot, { backgroundColor: colors.text }]} />

                <Text style={[styles.metaText, { color: colors.text }]}>
                  {new Date(tracker.dateFin).toLocaleDateString("fr-FR")}
                </Text>
              </View>

              <Text style={[styles.desc, { color: colors.text }]}>
                {truncate(tracker.description, 50)}
              </Text>
            </View>
          </Link>

          <View style={styles.trackerActions}>
            <EditButton
              url={{
                pathname: "/tracker/edit/[id]",
                params: { id: tracker.id },
              }}
            />

            <DeleteButton
              onConfirm={async () => {
                await deleteTracker(tracker.id);
              }}
              onDelete={onDelete}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
