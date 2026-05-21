import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },

  header: {
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 12,
  },

  chartWrapper: {
    alignItems: "center",
  },

  chartCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 140,
    borderRadius: 999,
  },

  legend: {
    marginTop: 12,
    gap: 8,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  legendText: {
    fontSize: 13,
  },

  legendValue: {
    fontSize: 13,
  },
});
