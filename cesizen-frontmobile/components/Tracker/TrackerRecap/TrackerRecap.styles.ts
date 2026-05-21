import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    gap: 10,
    marginTop: 16,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,

    borderWidth: 1,

    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
  },

  right: {
    fontSize: 13,
    fontWeight: "600",
  },
});
