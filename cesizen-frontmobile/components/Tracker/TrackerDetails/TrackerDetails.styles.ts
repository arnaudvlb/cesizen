import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,

    borderRadius: 20,
    borderWidth: 1,

    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  header: {
    gap: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  dates: {
    fontSize: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.9,
  },

  chartSection: {
    padding: 12,
    borderRadius: 16,

    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  recapSection: {
    gap: 10,
  },

  summary: {
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 8,
  },
});
