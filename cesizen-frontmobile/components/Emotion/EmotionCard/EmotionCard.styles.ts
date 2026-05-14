import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  emotionRelated: {
    marginTop: 40,
  },

  titleSection: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "700",
  },

  emotionCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },

  emotionCard: {
    width: 280,
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    transitionDuration: "200ms",
  },

  emotionTitle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "600",
  },

  emotionDescription: {
    margin: 0,
    lineHeight: 22,
    opacity: 0.85,
  },
});
