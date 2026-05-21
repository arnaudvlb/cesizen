import { useThemeColors } from "@/hooks/useThemeColors";
import { TrackerRecapProps } from "@/types/components/Tracker/TrackerRecapProps";
import { Text, View } from "react-native";
import { styles } from "./TrackerRecap.styles";

export default function TrackerRecap({ recap }: TrackerRecapProps) {
  const colors = useThemeColors();

  return (
    <View style={styles.wrapper}>
      {recap.map((e) => (
        <View
          key={e.libelle}
          style={[
            styles.item,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.left}>
            <View style={[styles.dot, { backgroundColor: e.couleur }]} />
            <Text style={[styles.label, { color: colors.text }]}>
              {e.libelle}
            </Text>
          </View>

          <Text style={[styles.right, { color: colors.text + "B3" }]}>
            {e.count} ({e.percentage}%)
          </Text>
        </View>
      ))}
    </View>
  );
}
