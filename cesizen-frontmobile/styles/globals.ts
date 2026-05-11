import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  /* =====================
     LAYOUT UTILS
  ===================== */

  pageCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },

  resourcesPage: {
    width: "100%",
    maxWidth: 1200,
    paddingVertical: 48,
    paddingHorizontal: 16,
    alignSelf: "center",
  },

  /* =====================
     FORM ELEMENTS
  ===================== */

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 15,
  },

  /* =====================
     LINKS
  ===================== */

  link: {
    fontWeight: "500",
  },
});
