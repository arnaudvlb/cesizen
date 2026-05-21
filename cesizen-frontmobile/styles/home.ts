import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    zIndex: 1,
  },

  buttons: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  buttonText: {
    fontWeight: "600",
  },
});
