import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },

  question: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 16,
    marginTop: 16,
  },

  select: {
    width: "100%",

    paddingVertical: 14,
    paddingHorizontal: 16,

    borderWidth: 1,
    borderRadius: 14,

    fontSize: 15,
  },
});
