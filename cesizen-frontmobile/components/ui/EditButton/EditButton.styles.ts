import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  editButton: {
    position: "relative",
    overflow: "hidden",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    paddingVertical: 10,
    paddingHorizontal: 14,

    borderRadius: 12,
    borderWidth: 1,

    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 3,
    marginTop: 3,
  },

  editText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
