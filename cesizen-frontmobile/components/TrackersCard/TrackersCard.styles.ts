import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },

  grid: {
    width: "100%",
    paddingHorizontal: 12,
    gap: 12,
  },

  card: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
    position: "relative",
  },

  accent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },

  content: {
    gap: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  metaText: {
    fontSize: 12,
    opacity: 0.8,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
  },

  desc: {
    fontSize: 13,
    lineHeight: 18,
  },

  trackerActions: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },
});
