import { useThemeColors } from "@/hooks/useThemeColors";
import { TrackerChartProps } from "@/types/components/Tracker/TrackerChartProps";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { styles } from "./TrackerChart.styles";

export default function TrackerChart({ data }: TrackerChartProps) {
  const colors = useThemeColors();

  const chartData = data.map((item) => ({
    value: item.value,
    color: item.color,
    text: item.name,
  }));

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Répartition des émotions
        </Text>

        <Text style={[styles.subtitle, { color: colors.text + "80" }]}>
          Analyse des rapports sur la période du tracker
        </Text>
      </View>
      <View style={styles.chartWrapper}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PieChart data={chartData} radius={120} showText={false} />
          <View
            style={[styles.chartCenter, { backgroundColor: colors.surface }]}
          ></View>
        </View>
      </View>
      <View style={styles.legend}>
        {data.map((entry, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={styles.legendLeft}>
              <View style={[styles.dot, { backgroundColor: entry.color }]} />

              <Text style={[styles.legendText, { color: colors.text }]}>
                {entry.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
