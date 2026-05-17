import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  rapportsGrid: {
    gap: 18,
  },

  rapportCard: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 1,
    shadowRadius: 18,

    elevation: 4,
  },

  cardLink: {
    display: "flex",
  },

  rapportImageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  rapportImage: {
    width: 100,
    aspectRatio: 1,
  },

  rapportContent: {
    padding: 16,
  },

  rapportTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  rapportDate: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.6,
  },

  rapportActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
