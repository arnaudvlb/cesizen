import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  message: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: "center",
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
  },

  success: {
    backgroundColor: "#dcfce7",
    borderColor: "#bbf7d0",
  },

  error: {
    backgroundColor: "#fee2e2",
    borderColor: "#fecaca",
  },
});
