import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emotionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    marginTop: 32,
  },

  emotionCard: {
    width: 180,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,

    alignItems: "center",
    justifyContent: "center",

    gap: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 4,
  },

  image: {
    width: 72,
    height: 72,
    resizeMode: "contain",
  },

  label: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
